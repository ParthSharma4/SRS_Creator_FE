import Link from "next/link";
import { auth } from "../firebaseClient";
import { signOut } from "firebase/auth";

export default function Navbar({ user }) {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <h1 className="font-bold text-lg">SRS Creator</h1>
      <div className="flex gap-4 items-center">
        <span>{user?.displayName}</span>
        <button onClick={() => signOut(auth)} className="bg-red-600 px-2 py-1 rounded">
          Sign Out
        </button>
      </div>
    </nav>
  );
}
