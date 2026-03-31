import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (projectId && clientEmail && privateKey) {
    // Production: full service account credentials
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey: privateKey.replace(/\\n/g, '\n'),
      }),
    });
  } else if (projectId) {
    // Local dev: use ADC with explicit project ID
    admin.initializeApp({ projectId });
  } else {
    // Fallback: use ADC with default project
    admin.initializeApp();
  }
}

export const db = admin.firestore();
