"use client";

import { useAuth } from "@/app/context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { usePagination } from "@/app/hooks/usePagination";
import { FavoriteButton } from "./FavoriteButton";
import { useWordContext } from "@/app/context/WordContext";


const WordTabs = () => {
  const { token } = useAuth();
  const { history } = useWordContext()
  const [favorites, setFavorites] = useState<string[]>([]);
  const [wordList, setWordList] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("list");


  const refreshFavorites = async () => {
    const res = await fetch("http://localhost:3333/user/me/favorites", {
      headers: { Authorization: `${token}` },
    });

    if (res.ok) {
      const data = await res.json();
      setFavorites(data.results.map((item: any) => item.word));
    }
  };

  const handleToggleFavorite = async (word: string, favoriting: boolean) => {
    const url = `http://localhost:3333/entries/en/${word}/${favoriting ? "favorite" : "unfavorite"}`;
    await fetch(url, {
      method: favoriting ? "POST" : "DELETE",
      headers: { Authorization: `${token}` },
    });

    refreshFavorites();
  }

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [favRes, wordRes] = await Promise.all([
          fetch("http://localhost:3333/user/me/favorites", {
            headers: { Authorization: `${token}` },
          }),
          fetch("http://localhost:3333/entries/en", {
            headers: { Authorization: `${token}` },
          }),
        ]);

        const favData = await favRes.json();
        const wordData = await wordRes.json();

        setFavorites(favData.results.map((item: any) => item.word));
        setWordList(wordData.results);

      } catch (err) {
        console.error("Erro ao carregar dados", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchAll();

  }, [token])

  const currentWords =
    activeTab === "list" ? wordList :
      activeTab === "history" ? history :
        favorites;

  const { page, start, end, next, prev, totalPages } = usePagination(currentWords.length);
  const visibleWords = currentWords.slice(start, end);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
      <TabsList className="grid grid-cols-3 w-full">
        <TabsTrigger value="list">Word List</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
        <TabsTrigger value="favorites">Favorites</TabsTrigger>
      </TabsList>

      <TabsContent value={activeTab}>
        {loading ? (
          <p className="text-muted-foreground">Carregando...</p>
        ) : visibleWords.length === 0 ? (
          <p className="text-muted-foreground">Nenhuma palavra encontrada.</p>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3  gap-2 my-4">
              {visibleWords.map((word) => (
                <div
                  key={word}
                  onClick={() => {/* se quiser ativar onWordClick(word) */ }}
                  className="flex items-center justify-between gap-2 w-full px-4 py-2 border rounded-md text-sm capitalize cursor-pointer hover:bg-muted transition-colors"
                >
                  <span>{word}</span>

                  <FavoriteButton
                    word={word}
                    isFavorite={favorites.includes(word)}
                    onToggle={handleToggleFavorite}
                  />
                </div>

              ))}
            </div>

            {/* Paginação */}
            <div className="flex justify-center items-center gap-4">
              <Button variant="ghost" onClick={prev} disabled={page === 1}>
                ← Anterior
              </Button>
              <span className="text-sm text-muted-foreground">
                Página {page} de {totalPages}
              </span>
              <Button variant="ghost" onClick={next} disabled={page === totalPages}>
                Próxima →
              </Button>
            </div>
          </>
        )}
      </TabsContent>
    </Tabs>
  )
}

export default WordTabs;