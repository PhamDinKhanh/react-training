import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "fs";

// Đọc JSON file bằng tay
const serviceAccount = JSON.parse(readFileSync("./serviceAccountKey.json", "utf8"));
const products = JSON.parse(readFileSync("../../public/data/products.json", "utf8"));

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

async function importUsers() {
  for (const product of products) {
    const docId = String(product.id); // hoặc dùng .email, hoặc auto id
    await db.collection("products").doc(docId).set(product);
    console.log(`✅ Imported user ${product.name}`);
  }
}

importUsers().then(() => {
  console.log("🎉 All users imported!");
  process.exit(0);
});