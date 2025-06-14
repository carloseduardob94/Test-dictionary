"use client";

import { useAuth } from "@/app/context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useEffect, useState } from "react";
import { FavoriteButton } from "./FavoriteButton";
import { useWordContext } from "@/app/context/WordContext";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";

const ITEMS_PER_PAGE = 12;

const WordTabs = () => {
  const { token } = useAuth();
  const { history, favorites, toggleFavorite } = useWordContext();

  const [wordList, setWordList] = useState<string[]>([]);
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("list");
  const [currentPage, setCurrentPage] = useState(1);

  const currentWords =
    activeTab === "list" ? wordList : activeTab === "history" ? history : favorites;

  const totalLocalPages = Math.ceil(currentWords.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const visibleWords = activeTab === "list" ? currentWords : currentWords.slice(start, end);

  const goToPage = (page: number) => {
    const maxPages = activeTab === "list" ? totalPages : totalLocalPages;
    if (page >= 1 && page <= maxPages) {
      setCurrentPage(page);
    }
  };

  // Zera a página ao trocar de aba
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  useEffect(() => {
    if (activeTab !== "list") return; // Evita chamada para outras abas

    const fetchWordList = async () => {
      try {
        const res = await fetch(`http://localhost:3333/entries/en?page=${currentPage}`, {
          headers: { Authorization: `${token}` },
        });
        const wordData = await res.json();
        setWordList(wordData.results);
        setTotalPages(wordData.totalPages);
      } catch (err) {
        console.error("Erro ao carregar lista de palavras", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchWordList();
  }, [token, activeTab, currentPage]);

  const renderPagination = () => {
    const maxPages = activeTab === "list" ? totalPages : totalLocalPages;

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => goToPage(currentPage - 1)}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {Array.from({ length: activeTab === "list" ? 5 : 3 }, (_, i) => {
            const page = currentPage <= 3
              ? i + 1
              : currentPage >= totalPages - 2
                ? totalPages - 4 + i
                : currentPage - 2 + i;

            if (page < 1 || page > totalPages) return null;

            return (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={page === currentPage}
                  onClick={() => goToPage(page)}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {maxPages > 4 && (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  isActive={currentPage === maxPages}
                  onClick={() => goToPage(maxPages)}
                  className="cursor-pointer"
                >
                  {maxPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() => goToPage(currentPage + 1)}
              className={currentPage === maxPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 my-4">
              {visibleWords.map((word) => (
                <div
                  key={word}
                  className="flex items-center justify-between gap-2 w-full px-4 py-2 border rounded-md text-sm capitalize cursor-pointer hover:bg-muted transition-colors"
                >
                  <span>{word}</span>
                  <FavoriteButton
                    word={word}
                    isFavorite={favorites.includes(word)}
                    onToggle={toggleFavorite}
                  />
                </div>
              ))}
            </div>

            {renderPagination()}
          </>
        )}
      </TabsContent>
    </Tabs>
  );
}

export default WordTabs;