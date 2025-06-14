"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

interface WordData {
  word: string;
  definition?: string;
}

const SearchForm = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<WordData[]>([])
  const [loading, setLoading] = useState(false);

  async function handleSearch(e: React.FormEvent) {

    e.preventDefault()
    if (!query.trim()) return;

    setLoading(true)

    try {
      const { token } = useAuth()
      const res = await fetch(`http://localhost:3333/entries/en/${query}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json()
      console.log(data)

      const parsed = Array.isArray(data)
        ? data.map((d: any) => ({
          word: d.word,
          definition: d.meanings?.[0]?.definitions?.[0]?.definition || "Sem definição",
        }))
        : [];

      setResults(parsed);

    } catch (error) {
      console.error("Erro na busca:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Digite uma palavra..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="submit" disabled={loading}>
          {loading ?
            "Buscando..."
            : <>
              <Search className="mr-2" />Buscar
            </>}
        </Button>
      </form>

      <div className="space-y-4">
        {results.map((item, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-sm bg-white dark:bg-zinc-900" >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">{item.word}</h2>
              <Button variant="outline" size="sm">Favoritar</Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">{item.definition}</p>
          </div>
        ))}

      </div>
    </div>
  )
}

export default SearchForm;