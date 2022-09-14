import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import apiService from './apiService/login.apiService';
import { User } from '../../types/types';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    let email: string = '';
    let displayName: string = '';
    let photoURL: string = '';
    const result = await signInWithPopup(auth, provider);
    const { uid, emailVerified } = result.user;
    if (result.user.email) email = result.user.email;
    if (result.user.displayName) email = result.user.displayName;
    if (result.user.photoURL) email = result.user.photoURL;
    const userData: User = {
      id: '',
      password: '',
      email,
      name: displayName,
      uid,
      photoUrl: photoURL,
      emailVerified,
    };
    const authRegisteredUser = await apiService.register(userData);
    if (authRegisteredUser.error === 409) {
      const authLoggedUser = await apiService.login(userData);
      return authLoggedUser;
    }
    return authRegisteredUser;
    // localStorage.setItem('userData', JSON.stringify(result.user));
  } catch (error) {
    console.log('error', error);
  }
};
