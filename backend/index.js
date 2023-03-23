import express from "express";
import "./firebase/index.js"
import firebaseRouter from "./routes/firebase.js" 
import googleRouter from "./routes/google.js"
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/firebase', firebaseRouter);
app.use('/google', googleRouter);


app.listen(process.env.PORT || 5000, () => {
    console.log(`Server Started`);
})