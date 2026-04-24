import { db } from "../../../config/firebaseConfig";
import { Project } from "../models/projectModel";

const COLLECTION = "projects";

export const projectRepository = {
    async create(project: Omit<Project, "id" | "createdAt" | "updatedAt">): Promise<Project> {
        const docRef = await db.collection(COLLECTION).add({
            ...project,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const doc = await docRef.get();
        return { id: doc.id, ...doc.data() } as Project;
    },

    async findById(id: string): Promise<Project | null> {
        const doc = await db.collection(COLLECTION).doc(id).get();
        return doc.exists ? ({ id: doc.id, ...doc.data() } as Project) : null;
    },

    async findByUserId(userId: string): Promise<Project[]> {
        const snapshot = await db.collection(COLLECTION)
            .where("createdBy", "==", userId)
            .get();

        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Project));
    },

    async update(id: string, data: Partial<Project>): Promise<Project | null> {
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