import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const useLoginUser = () => {
  const [loading, setLoading] = useState(false);
  const route = useRouter();
  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      route.push("/");
      toast.success("User logged in successfully");
      setLoading(false);
    } catch (error) {
      toast.error("Invalid credential");
    } finally {
      setLoading(false);
    }
  };
  return { handleLogin, loading };
};
export default useLoginUser;
