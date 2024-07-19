import { useMutation, useQuery } from "@tanstack/react-query";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getDocs,
  collection,
  QuerySnapshot,
  doc,
  getDoc,
  query,
  where,
  QueryFieldFilterConstraint,
} from "firebase/firestore";
import { auth, database } from "../../firebase/config";
import { useToast } from "../../components/ui/use-toast";
import { getQueriesFromSearchParams } from "../../lib/utils";

interface IUser {
  email: string;
  password: string;
}

export const useLogin = () => {
  const login = async (user: IUser) => {
    const credentials = await signInWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    const loggedInUser = credentials.user;
    return loggedInUser;
  };
  return useMutation({ mutationFn: login });
};
export const useCreateAccount = () => {
  const createAccount = async (user: IUser) => {
    const credentials = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    const loggedInUser = credentials.user;
    return loggedInUser;
  };
  return useMutation({ mutationFn: createAccount });
};

export const useSignOut = () => {
  const { toast } = useToast();
  const logOut = async () => {
    await signOut(auth);
  };
  return useMutation({
    mutationFn: logOut,
    onSuccess: () => toast({ title: "You have logged out successfully" }),
  });
};

export const useCollection = <T>(
  collectionName: string,
  filters?: URLSearchParams
) => {
  const queries = getQueriesFromSearchParams(filters);
  const getCollectionData = async () => {
    const q = query(collection(database, collectionName), ...queries);
    const snapshot = await getDocs(q);
    const result: T[] = [];
    snapshot.forEach((doc) => {
      result.push({ ...doc.data(), id: doc.id } as T);
    });
    return result;
  };
  return useQuery({
    queryFn: getCollectionData,
    queryKey: filters ? [collectionName, filters.toString()] : [collectionName],
  });
};

export const useDocumentData = <T>(
  collectionName: string,
  documentID: string
) => {
  const getDocData = async () => {
    const docRef = doc(database, collectionName, documentID);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) {
      throw new Error("Apartment does not exist...");
    }
    const result = { id: snapshot.id, ...snapshot.data() } as T;
    return result;
  };
  return useQuery({
    queryKey: [collectionName, documentID],
    queryFn: getDocData,
  });
};
