import { auth, db } from '@/lib/firebase/client';
import {
  ContentBaseModel,
  CourseBaseModel,
  UserBaseModel,
} from '@/lib/constants';
import { slugify } from '../helpers';

/**
 * useRealtime
 * @param {String} collection
 * @param {(snapshot: firebase.default.firestore.QuerySnapshot;)} func
 */
export const useRealtime = (collection, func) =>
  db.collection(collection).onSnapshot((snapshot) => func(snapshot));

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

export const createCourse = ({ title, category, uid: creatorId }) => {
  const {
    fields: { id: categoryId },
  } = category;
  return addToCollection('courses', {
    ...CourseBaseModel,
    title,
    slug: slugify(title),
    categoryId,
    creatorId,
  }).then((docRef) => docRef.id);
};

/**
 *
 * @param {{courseUid: String; title: String; order: Number;}}
 */

export const addContentToCourse = async ({ courseUid, title, order }) => {
  return await db
    .collection('courses')
    .doc(courseUid)
    .collection('content')
    .add({ ...ContentBaseModel, title, slug: slugify(title), order });
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
