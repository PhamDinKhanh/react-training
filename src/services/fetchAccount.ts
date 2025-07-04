import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import type { Account } from "../shared/types/index";

export async function fetchAccount(id: string): Promise<Account | undefined> {
    const docRef = doc(db, "accounts", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const data = docSnap.data();
        return {
            id: docSnap.id,
            userName: data.userName,
            role: data.role
        };
    }

    return undefined;
}