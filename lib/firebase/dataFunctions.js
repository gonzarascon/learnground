import { auth, db } from '@/lib/firebase/client';
import { UserBaseModel } from '@/lib/constants';

/**
 * createForCollection
 * @param {String} collection
 * @param {any} data
 * @param {String} doc
 */
export const createForCollection = (collection, data, doc) =>
  db.collection(collection).doc(doc).set(data);

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
 *
 * @param {String} collection
 * @param {String} document
 */

export const getById = (collection, document) =>
  db.collection(collection).doc(document).get();
