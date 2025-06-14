"use client";

import SearchForm from "@/components/SearchForm";
import WordTabs from "@/components/WordTabs";

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Buscar Palavra</h1>
      <SearchForm />
      <WordTabs />
    </div>
  );
}
