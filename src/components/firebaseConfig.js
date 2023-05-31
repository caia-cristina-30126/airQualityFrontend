import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCxA_Xrr6JfC7YvGKcNJdBp2gN2SC-fwuo",
  authDomain: "air-quality-bc230.firebaseapp.com",
  projectId: "air-quality-bc230",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
