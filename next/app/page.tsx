import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import SearchForm from "@/components/SearchForm";
import WordTabs from "@/components/WordTabs";

export default async function Home() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  let wordList: string[] = [];
  let totalPages = 1;

  if (!token) {
    redirect("/signin");
  }

  try {
    const res = await fetch(`http://localhost:3333/entries/en?page=1`, {
      headers: { Authorization: `${token}` },
      cache: "no-store",
    });

    const data = await res.json();
    wordList = data.results;
    totalPages = data.totalPages;
  } catch (err) {
    console.error("Erro ao buscar dados no SSR:", err);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Buscar Palavra</h1>
      <SearchForm />
      <WordTabs
        initialTab="list"
        initialWords={wordList}
        initialTotalPages={totalPages}
      />
    </div>
  );
}
