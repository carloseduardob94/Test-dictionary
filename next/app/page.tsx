"use client";

import SearchForm from "@/components/SearchForm";
import WordTabs from "@/components/WordTabs";
import { useAuth } from "./context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace("/signin")
    }
  }, [token, router]);

  if (!token) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Buscar Palavra</h1>
      <SearchForm />
      <WordTabs />
    </div>
  );
}
