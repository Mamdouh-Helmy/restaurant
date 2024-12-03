// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBMkzlS3oy_mJHQSkyKfUnkjVWljwNJOJ4",
  authDomain: "restaurant-d5367.firebaseapp.com",
  projectId: "restaurant-d5367",
  storageBucket: "restaurant-d5367.appspot.com",
  messagingSenderId: "644030724674",
  appId: "1:644030724674:web:a33a7eb36042f6959ecbdb",
  measurementId: "G-N72TL5CMTD",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;