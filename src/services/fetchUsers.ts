import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import type { User } from "../shared/types/index";

export async function fetchUsers(): Promise<User[]> {
    const querySnapshot = await getDocs(collection(db, "users"));
    const response: User[] = querySnapshot.docs.map(doc => {
      const data: any = doc.data();
      return {
        id: data.id,
        avatar: data.avatar, 
        name: data.name,
        email: data.email,
        position: data.position,
        biography: data.biography,
        city: data.city,
        country: data.country,
        phone: data.phone,
        company: data.company,
        status: data.status as "Active" | "Inactive",
      };
    });
  return response;
}