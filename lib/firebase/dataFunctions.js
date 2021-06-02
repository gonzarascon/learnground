import firebase, { analytics, auth, db, storage } from '@/lib/firebase/client';
import {
  ContentBaseModel,
  CourseBaseModel,
  UserBaseModel,
} from '@/lib/constants';
import { slugify } from '../helpers';

/**
 * useRealtime
 * @description subscribes to realtime changes on given collection.
 * @param {String} collection
 * @param {(snapshot: firebase.default.firestore.QuerySnapshot;)} func
 */
export const useRealtime = (collection, func) =>
  db.collection(collection).onSnapshot((snapshot) => func(snapshot));

/**
 * useChatRoom
 * @description subscribes to realtime changes on given collection.
 * @param {String} collection
 * @param {(snapshot: firebase.default.firestore.QuerySnapshot;)} func
 */
export const useChatRoom = (collection, func) =>
  db
    .collection(collection)
    .orderBy('createdAt', 'asc')
    .onSnapshot((snapshot) => func(snapshot));

/**
 * uploadFile
 * @description Uploads file to firebase bucket
 * @param {File} file
 */
export const uploadFile = (file) => {
  const storageRef = storage.ref();

  const fileRef = storageRef.child(`images/${file.name}`);

  return fileRef.put(file);
};

/**
 * createForCollection
 * @param {String} collection
 * @param {any} data
 * @param {String} doc
 */
export const createForCollection = (collection, data, doc) =>
  db.collection(collection).doc(doc).set(data);

/**
 * addToCollection
 * @param {String} collection
 * @param {any} data
 */
export const addToCollection = (collection, data) =>
  db.collection(collection).add(data);

/**
 * updateCollection
 * @param {String} collection
 * @param {String} docId
 * @param {any} data
 */

export const updateCollection = (collection, docId, data) =>
  db.collection(collection).doc(docId).update(data);

/**
 * getById
 * @param {String} collection
 * @param {String} document
 */

export const getById = (collection, document) =>
  db.collection(collection).doc(document).get();

/**
 * getSubCollection
 * @param {String} path
 */
export const getSubCollection = (path) => db.collection(path).get();
/**
 * signUp
 *
 * @param {{
 * username: String
 * email: String
 * password: String
 * userType: "instructor" | "alumn"
 * }}
 */
export const signUp = ({ username, email, password, userType }) =>
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((response) =>
      createForCollection(
        'users',
        {
          ...UserBaseModel,
          username,
          email,
          type: userType,
        },
        response.user.uid
      )
    )
    .catch((error) => {
      return {
        error,
      };
    });

/**
 * login
 * @param {{email: String; password:String;}}
 */
export const login = ({ email, password }) =>
  auth.signInWithEmailAndPassword(email, password);

/**
 * logout
 *
 */
export const logout = () => auth.signOut();

export const createCourse = async ({
  title,
  category,
  uid: creatorId,
  origin,
}) => {
  const {
    fields: { id: categoryId },
  } = category;
  return await addToCollection('courses', {
    ...CourseBaseModel,
    title,
    slug: slugify(title),
    categoryId,
    creatorId,
    origin,
  }).then((docRef) => docRef.id);
};

/**
 *
 * @param {string} courseUid
 */
export const getCourseContentsPreview = async (courseUid) => {
  const contentsArray = [];

  const contents = await getSubCollection(`/courses/${courseUid}/content`);

  for (let i in contents.docs) {
    const doc = contents.docs[i];
    const docData = doc.data();

    if (docData.active) {
      contentsArray.push({
        order: docData.order,
        title: docData.title,
        slug: docData.slug,
        uid: doc.id,
      });
    }
  }

  return contentsArray;
};

/**
 *
 * @param {{courseUid: String; title: String; order: Number;}}
 */

export const addContentToCourse = async ({ courseUid, title, order }) => {
  const chat = await db.collection('chats').add({ enabled: true });
  return await db
    .collection('courses')
    .doc(courseUid)
    .collection('content')
    .add({
      ...ContentBaseModel,
      title,
      slug: slugify(title),
      order,
      chatId: chat.id,
    });
};

export const deleteContent = async ({ courseUid, contentUid, order }) => {
  await db
    .collection(`courses/${courseUid}/content`)
    .doc(contentUid)
    .update({ active: false, order: 0 });

  const nextContents = await db
    .collection(`courses/${courseUid}/content`)
    .where('order', '>', order)
    .orderBy('order')
    .get();

  return nextContents.forEach(async (doc) => {
    if (doc.exists) {
      const docData = doc.data();

      await doc.ref.update({ order: docData.order - 1 });
    }
  });
};

/**
 * updateContent
 * @param {{
 * courseUid: string;
 * contentUid: string;
 * data: Object<string, unkown>;
 * }}
 */
export const updateContent = async ({ courseUid, contentUid, data }) =>
  await db
    .collection(`courses/${courseUid}/content`)
    .doc(contentUid)
    .update(data);

/**
 * subscribeUserToCourse
 * @param {{courseUid: string; userUid: string;}}
 */
export const subscribeUserToCourse = async ({ courseUid, userUid }) => {
  const courseRef = db.collection('courses').doc(courseUid);
  const userRef = db.collection('users').doc(userUid);

  return await Promise.all([
    courseRef.update({
      subscribers: firebase.firestore.FieldValue.arrayUnion({
        lastClass: 1,
        progress: 0,
        uid: userUid,
      }),
    }),
    userRef.update({
      courses: firebase.firestore.FieldValue.arrayUnion(courseUid),
    }),
  ]);
};

/**
 *
 * @param {{courseUid: string; userUid: string; data: object;}} param0
 */
export const updateSubscriber = async ({ courseUid, userUid, data }) => {
  const ref = (await db.collection('courses').doc(courseUid).get()).data();

  const allSubscribers = ref.subscribers;

  const subscriber = allSubscribers.findIndex((o) => o.uid === userUid);

  allSubscribers[subscriber] = { ...allSubscribers[subscriber], ...data };

  return await updateCollection('courses', courseUid, {
    subscribers: allSubscribers,
  });
};
/**
 *
 * @param {{
 *  chatUid: string;
 * message: Record<string, unknown>;
 * }}
 */
export const sendMessageToChat = ({ chatUid, message }) => {
  const chat = db.collection(`chats/${chatUid}/messages`).doc();

  chat.set({
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    ...message,
  });
};

/**
 *
 * @param {string} uid
 * @param {number} badgeData
 * @param {number} xp
 */

export const updateBadgeAndXP = async (uid, badgeData, xp) =>
  await updateCollection('users', uid, {
    xp: firebase.firestore.FieldValue.increment(xp),
    badges: firebase.firestore.FieldValue.arrayUnion(badgeData),
  });

/**
 * @description Registers analytics events using firebase SDK.
 * @param {string} event_name
 * @param {firebase.analytics.EventParams} event_params
 * @returns {void}
 */
export const registerEvent = (event_name, event_params) => {
  if (typeof window !== undefined)
    analytics().logEvent(event_name, event_params);
};
