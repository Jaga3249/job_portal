import { app, auth, db } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const useSignUpUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleCreateUser = async (
    email: string,
    password: string,
    name: string
  ) => {
    setLoading(true);
    if (!email || !password || !name) {
      toast.error("Required fields can't empty");
      setLoading(false);
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      router.push("/");
      toast.success("user loggedin sucessfully");
      const { user } = userCredential;
      if (user) {
        await addDoc(collection(db, "users"), {
          id: user.uid,
          name,
          email: user?.email,
        });
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong!");
    } finally {
      setLoading(false);
    }
  };
  return { loading, handleCreateUser };
};
export default useSignUpUser;
