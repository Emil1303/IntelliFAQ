// import { initializeApp } from 'firebase-admin/app';
// import dotenv from "dotenv";
// dotenv.config();
// import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MEASUREMENT_ID
// };

// const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);



import admin from "firebase-admin";

// Fetch the service account key JSON file contents
import serviceAccount from '../serviceAccount.js';
// Initialize the app with the service account key
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Verify Firebase Admin SDK is working


// Export the admin object for use in other files
export default admin;
