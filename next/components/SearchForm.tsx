"use client";

import React from "react";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search, Star, StarOff } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { useWordContext } from "@/app/context/WordContext";
import { useRouter, useSearchParams } from "next/navigation";

interface WordData {
  word: string;
  definition?: string;
}

const SearchForm = () => {
  const { favorites, refreshHistory, toggleFavorite } = useWordContext()
  const { token } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<WordData[]>([])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const term = searchParams.get("term");
    if (term) {
      setQuery(term);
      handleSearch(undefined, term)
    }
  }, [])

  async function handleSearch(e?: React.FormEvent, customQuery?: string) {
    if (e) e.preventDefault()
    const q = customQuery ?? query.trim()
    if (!q) return;

    setLoading(true)

    try {
      const res = await fetch(`http://localhost:3333/entries/en/${query}`, {
        headers: {
          Authorization: `${token}`
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
      await refreshHistory();

      router.push(`/?term=${encodeURIComponent(q)}`)
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
        {results.map((item, index) => {
          const isFavorited = favorites.includes(item.word);

          return (
            <div
              key={index}
              className="border p-4 rounded-lg shadow-sm bg-white dark:bg-zinc-900"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">{item.word}</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleFavorite(item.word, !isFavorited)}
                >
                  {isFavorited ? (
                    <>
                      <Star className="mr-1 h-4 w-4 fill-yellow-500 text-yellow-500" />
                      Desfavoritar
                    </>
                  ) : (
                    <>
                      <StarOff className="mr-1 h-4 w-4" />
                      Favoritar
                    </>
                  )}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {item.definition}
              </p>
            </div>
          );
        })}

      </div>
    </div>
  )
}

export default SearchForm;