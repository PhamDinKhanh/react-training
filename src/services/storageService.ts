import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

export async function uploadPicture(file: File, folder = "kyc"): Promise<string> {
  const fileName = `${folder}/${Date.now()}_${file.name}`;
  const storageRef = ref(storage, fileName);

  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);

  return downloadURL;
}

export async function deletePicture(fullUrl: string): Promise<void> {
  const baseUrl = "https://firebasestorage.googleapis.com/v0/b/";
  const bucketName = storage.app.options.storageBucket;
  const path = decodeURIComponent(fullUrl.replace(`${baseUrl}${bucketName}/o/`, "").split("?")[0]);
  const fileRef = ref(storage, path);

  await deleteObject(fileRef);
}