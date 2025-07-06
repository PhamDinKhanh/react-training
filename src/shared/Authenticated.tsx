import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useAppDispatch } from "../store/hooks"; // hoặc dùng trực tiếp `useDispatch`
import { setUser } from "../store/authSlice";

export default function AuthListener() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const tokenid = await user.getIdToken();
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            tokenid: tokenid,
          })
        );
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null;
}