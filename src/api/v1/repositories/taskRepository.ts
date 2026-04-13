import { db } from "../../../config/firebaseConfig";
import { DocumentData, QueryDocumentSnapshot } from "firebase-admin/firestore";
import { Task } from "../models/taskModel";

const COLLECTION = "tasks";

export const taskRepository = {
    async create(task: Omit<Task, "id" | "createdAt" | "updatedAt">): Promise<Task> {
        const docRef = await db.collection(COLLECTION).add({
            ...task,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        const doc = await docRef.get();
        return { id: doc.id, ...doc.data() } as Task;
    },

    async findByProjectId(projectId: string): Promise<Task[]> {
        const snapshot = await db.collection(COLLECTION)
            .where("projectId", "==", projectId)
            .get();
        return snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({ id: doc.id, ...doc.data() } as Task));
    },

    async findById(id: string): Promise<Task | null> {
        const doc = await db.collection(COLLECTION).doc(id).get();
        return doc.exists ? ({ id: doc.id, ...doc.data() } as Task) : null;
    },

    async update(id: string, data: Partial<Task>): Promise<Task | null> {
        await db.collection(COLLECTION).doc(id).update({
            ...data,
            updatedAt: new Date(),
        });
        return this.findById(id);
    },

    async delete(id: string): Promise<boolean> {
        await db.collection(COLLECTION).doc(id).delete();
        return true;
    }
};