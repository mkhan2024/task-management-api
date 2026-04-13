import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";
import serviceAccount from "./serviceAccountKey.json";

initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});

const db: Firestore = getFirestore();
const auth: Auth = getAuth();

export { db, auth };