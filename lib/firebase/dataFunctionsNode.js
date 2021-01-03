import admin from '@/lib/firebase/node';

const db = admin.firestore();
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
