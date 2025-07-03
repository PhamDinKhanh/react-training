import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "fs";

// Đọc JSON file bằng tay
const serviceAccount = JSON.parse(readFileSync("./serviceAccountKey.json", "utf8"));
const users = JSON.parse(readFileSync("../../public/data/users.json", "utf8"));

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

async function importUsers() {
  for (const user of users) {
    const docId = String(user.id); // hoặc dùng .email, hoặc auto id
    await db.collection("users").doc(docId).set(user);
    console.log(`✅ Imported user ${user.name}`);
  }
}

importUsers().then(() => {
  console.log("🎉 All users imported!");
  process.exit(0);
});