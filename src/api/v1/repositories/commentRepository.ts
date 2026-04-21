import { db } from "../../../config/firebaseConfig";
import { Comment } from "../models/commentModel";

const COLLECTION = "comments";

export const commentRepository = {
    async create(comment: Omit<Comment, "id">): Promise<Comment> {
        const docRef = await db.collection(COLLECTION).add({
            ...comment,
            createdAt: new Date(),
        });

        const doc = await docRef.get();
        return { id: doc.id, ...doc.data() } as Comment;
    },

    async findByTaskId(taskId: string): Promise<Comment[]> {
        const snapshot = await db.collection(COLLECTION)
            .where("taskId", "==", taskId)
            .get();

        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        } as Comment));
    },

    async findById(id: string): Promise<Comment | null> {
        const doc = await db.collection(COLLECTION).doc(id).get();

        if (!doc.exists) {
            return null;
        }

        return { id: doc.id, ...doc.data() } as Comment;
    },

    async delete(id: string): Promise<boolean> {
        await db.collection(COLLECTION).doc(id).delete();
        return true;
    }
};