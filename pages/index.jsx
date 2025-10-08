import { useState, useEffect } from "react";
import { auth, provider } from "../firebaseClient";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  const login = () => signInWithPopup(auth, provider);

  if (!user)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-3xl font-bold mb-4">SRS Creator</h1>
        <button className="bg-blue-600 text-white px-6 py-3 rounded" onClick={login}>
          Login with Google
        </button>
      </div>
    );

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl mb-4">Welcome, {user.displayName}</h1>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={() => router.push("/new")}
      >
        Create New SRS Project
      </button>
    </div>
  );
}
