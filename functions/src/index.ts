import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

export const firstAdmin = functions.auth.user().onCreate((user) => {
  if(user.email == 'lucasghegobbi@gmail.com') {
    admin.auth().setCustomUserClaims(user.uid, {admin: true});
  }
});

export const addUser = functions.https.onCall(async (data, context) => {
  if (context.auth && context.auth?.uid) {
    const user = await db.collection('/users').doc(context.auth.uid).get();
    const userData = user.data();

    if (userData && userData['role'] == 'admin') {
      return admin.auth().createUser({
        email: data.email,
        emailVerified: true,
        password: data.password
      }).then(async userRecord => {
        await admin.auth().setCustomUserClaims(userRecord.uid, { [data.role]: true });

        const user = {
          email: data.email,
          role: data.role,
          name: data.name
        };

        return db.collection('/users').doc(userRecord.uid).set(user);
      })
    } else {
      throw new functions.https.HttpsError('failed-precondition', 'Only Admins allowed');
    }
  } else {
    throw new functions.https.HttpsError('failed-precondition', 'Authorized users only');
  }
});
