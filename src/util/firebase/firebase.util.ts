import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  collection,
  query,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";

import { TodoItem } from "../../component/todo-list/todo/todo";

const firebaseConfig = {
  apiKey: "AIzaSyDqBMdopVcqgf4qxPqnxtEFTuxj2lfHmtI",
  authDomain: "react-with-firebase-d4ffe.firebaseapp.com",
  projectId: "react-with-firebase-d4ffe",
  storageBucket: "react-with-firebase-d4ffe.appspot.com",
  messagingSenderId: "542765047308",
  appId: "1:542765047308:web:09197b9e606bb41ee21829",
};

const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);

//AuthProvider
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

facebookProvider.setCustomParameters({
  display: "select_account",
});

//Auth Section
export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const signInWithFacebookPopup = () =>
  signInWithPopup(auth, facebookProvider);
export const signInWithFacebookRedirect = () =>
  signInWithRedirect(auth, facebookProvider);

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

// creating user with email and password for authentication
export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

//FireStore Section

export const db = getFirestore(firebaseApp);

export const createUserDocumentFromAuth = async (
  userAuth: any,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "user", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        ...additionalInformation,
      });
    } catch (error: any) {
      console.log("error while creating userDocument", error.message);
    }
  }
  return userDocRef;
};

/// Recaptcha

export function setupRecaptcha(number: any) {
  const recaptchaVerifier = new RecaptchaVerifier(
    auth,
    "recaptcha-container",
    {}
  );
  recaptchaVerifier.render();
  return signInWithPhoneNumber(auth, number, recaptchaVerifier);
}

//create todo item doc in firestore
export const createTodoDocument = async (todoSubject: string) => {
  if (todoSubject === "") return;
  const createdAt = new Date();
  return await addDoc(collection(db, "todos"), {
    todoSubject,
    isCompleted: false,
    createdAt,
  });
};

//Retrieve all Todo Documment from firestore
export const getAllTodoDocuments = (
  callback: (todoDocuments: TodoItem[]) => void
) => {
  const todoCollectionRef = collection(db, "todos");

  const unsubscribe = onSnapshot(todoCollectionRef, (querySnapshot) => {
    const todoDocuments: TodoItem[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      todoSubject: doc.data().todoSubject,
      isCompleted: doc.data().isCompleted,
      createdAt: doc.data().createdAt,
    }));

    callback(todoDocuments);
  });

  return unsubscribe;
};

//Updata a todo document
export const updatetodoDocument = async (
  todoId: string,
  updatedData: Partial<TodoItem>
): Promise<void> => {
  const todoRef = doc(db, "todos", todoId);
  try {
    await updateDoc(todoRef, updatedData);
    console.log("Todo document updated successfully");
  } catch (error) {
    console.error("Error updating todo document:", error);
  }
};

//delete a todo document from the firestore
export const deleteTodoDocumnet = async (id: string): Promise<void> => {
  const docRef = doc(db, "todos", id);
  try {
    await deleteDoc(docRef);
    console.log("successfully deleted the Todo document");
  } catch (error) {
    console.log("error deleting the Todo document", error);
  }
};
