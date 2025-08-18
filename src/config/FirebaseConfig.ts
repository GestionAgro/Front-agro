import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA1y11cK_1PDKUQBgWLBjAp97qsMIxf-_I",
  authDomain: "gestionagro-b454b.firebaseapp.com",
  projectId: "gestionagro-b454b",
  storageBucket: "gestionagro-b454b.firebasestorage.app",
  messagingSenderId: "759250743544",
  appId: "1:759250743544:web:094931198dce3af4f88b0d",
  measurementId: "G-QPPCGM456F"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

export default app;
