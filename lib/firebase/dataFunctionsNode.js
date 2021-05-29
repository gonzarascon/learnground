import admin from '@/lib/firebase/node';
import { uuid } from 'uuidv4';

const db = admin.firestore();
const storage = admin.storage();
const auth = admin.auth();

export const getProfileData = async (username) => {
  const userCollection = db.collection('users');
  const profileDoc = await userCollection
    .where('username', '==', username)
    .get()
    .then((snapshot) => {
      for (let i in snapshot.docs) {
        const doc = snapshot.docs[i];

        if (!doc.exists) {
          return null;
        }

        return { data: doc.data(), uid: doc.ref.id };
      }
    });

  return profileDoc;
};
/**
 * getCourseBySlug
 * @param {String} slug
 */
export const getCourseBySlug = async (slug) => {
  const courseCollection = db.collection('courses');
  const courseData = await courseCollection
    .where('slug', '==', slug)
    .get()
    .then((snapshot) => {
      for (let i in snapshot.docs) {
        const doc = snapshot.docs[i];
        if (!doc.exists) {
          return null;
        }

        return { data: doc.data(), uid: doc.ref.id };
      }
    });
  return courseData;
};

/**
 * getContentBySlug
 * @param {{
 * courseSlug: string;
 * contentSlug: string;
 * }} param0
 */
export const getContentBySlug = async ({ courseSlug, contentSlug }) => {
  const courseId = await getCourseBySlug(courseSlug).then((data) => data.uid);

  return await db
    .collection(`courses/${courseId}/content`)
    .where('slug', '==', contentSlug)
    .get()
    .then((snapshot) => {
      for (let i in snapshot.docs) {
        const doc = snapshot.docs[i];

        if (!doc.exists) {
          return null;
        }

        return { data: doc.data(), uid: doc.id };
      }
    });
};

/**
 * getContentBySlug
 * @param {{
 * courseSlug: string;
 * contentNumber: string;
 * }} param0
 */
export const getContentByNumber = async ({ courseSlug, contentNumber }) => {
  let content = {};
  const courseId = await getCourseBySlug(courseSlug).then((data) => data.uid);

  const data = await db
    .collection(`courses/${courseId}/content`)
    .where('order', '==', parseInt(contentNumber))
    .get();

  for (let i in data.docs) {
    const doc = data.docs[i];

    if (!doc.exists) {
      content = {};
    }

    content = { ...doc.data(), uid: doc.id };
  }

  return content;
};

/**
 *
 * @param {File} asset
 */
export const UploadAsset = async (asset) => {
  const token = uuid();
  await storage
    .bucket(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET)
    .upload(asset.path, {
      destination: `images/classContents/${asset.name}_${token}`,
      metadata: {
        cacheControl: 'no-cache',
        metadata: {
          firebaseStorageDownloadTokens: token,
        },
      },
    });

  return `https://firebasestorage.googleapis.com/v0/b/${
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  }/o/${encodeURIComponent(
    `images/classContents/${asset.name}_${token}`
  )}?alt=media&token=${token}`;
};
