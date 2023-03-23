import admin from "../firebase/index.js";
import { getAuth } from "firebase-admin/auth";
// import { getFirestore, collection, addDoc } from "firebase/firestore";

import express from "express";
const firebaseRouter = express.Router();

firebaseRouter.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    // const userCredentials = await createUserWithEmailAndPassword(getAuth(), email, password);
    // const db = getFirestore();
    // const usersColRef = collection(db, "users");


    // await addDoc(usersColRef, {
    //     uid: userCredentials.user.uid,
    //     email: userCredentials.user.email,
    //     name: userCredentials.user.displayName,
    //     provider: userCredentials.user.providerData[0].providerId,
    //     photoUrl: userCredentials.user.photoURL
    // });

    admin.auth().createUser({
        email: email,
        password: password,
    }).then((userRecord) => {
        // User created successfully.
        console.log("Successfully created new user:", userRecord.uid);
    })
        .catch((error) => {
            console.log("Error creating new user:", error);
        });
    // res.send({ currentEmail: userCredentials.user.email });
});

export default firebaseRouter;