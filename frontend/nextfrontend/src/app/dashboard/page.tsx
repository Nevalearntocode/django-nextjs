"use client";

import useSWR from "swr";
import { fetcher } from "@/app/fetcher";
import { AuthActions } from "@/app/auth/utils";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const { data: user } = useSWR("/auth/users/me", fetcher);

  const { logout, removeTokens } = AuthActions();

  const handleLogout = () => {
    logout()
      .res(() => {
        removeTokens();

        router.push("/");
      })
      .catch(() => {
        removeTokens();
        router.push("/");
      });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-1/3 rounded-lg bg-white p-6 text-center shadow-lg">
        <h1 className="mb-4 text-2xl font-bold">Hi, {user?.username}!</h1>
        <p className="mb-4">Your account details:</p>
        <ul className="mb-4">
          <li>Username: {user?.username}</li>
          <li>Email: {user?.email}</li>
        </ul>
        <button
          onClick={handleLogout}
          className="rounded bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-700"
        >
          Disconnect
        </button>
      </div>
    </div>
  );
}
