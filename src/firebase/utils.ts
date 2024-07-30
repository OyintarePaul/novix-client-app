import { v4 as uuid } from "uuid";
import { database, storage } from "./config";
import { ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

export const uploadFileToCloudStorage = async (file: File): Promise<string> => {
  const path = `apartments/${uuid()}`;
  const fileRef = ref(storage, path);
  await uploadBytes(fileRef, file);
  return path;
};

export const uploadMultipleToCloudStorage = async (files: FileList) => {
  const uploadPromises = [];
  for (let i = 0; i < files.length; i++) {
    uploadPromises.push(uploadFileToCloudStorage(files[i]));
  }
  const paths = await Promise.all(uploadPromises);
  return paths;
};

export const addApartmentToFirestore = async (data: any) => {
  const paths = await uploadMultipleToCloudStorage(data.media);
  const result = await addDoc(collection(database, "apartments"), {
    ...data,
    media: paths,
  });
  return result;
};
