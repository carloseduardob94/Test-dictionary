"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

type WordContextType = {
  history: string[];
  refreshHistory: () => Promise<void>;
  favorites: string[];
  refreshFavorites: () => Promise<void>;
  toggleFavorite: (word: string, favoriting: boolean) => Promise<void>;
};

const WordContext = createContext<WordContextType | undefined>(undefined);

export const WordProvider = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth()
  const [history, setHistory] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const refreshHistory = async () => {
    try {
      const res = await fetch("http://localhost:3333/user/me/history", {
        headers: {
          Authorization: `${token}`,
        },
      });

      const data = await res.json();
      setHistory(data.results.map((item: any) => item.word) || []);
    } catch (error) {
      console.error("Erro ao atualizar histórico:", error);
    }
  }

  const refreshFavorites = async () => {
    try {
      const res = await fetch("http://localhost:3333/user/me/favorites", {
        headers: { Authorization: `${token}` },
      });
      const data = await res.json();
      setFavorites(data.results.map((item: any) => item.word));
    } catch (error) {
      console.error("Erro ao carregar favoritos", error);
    }
  };

  const toggleFavorite = async (word: string, favoriting: boolean) => {
    const url = `http://localhost:3333/entries/en/${word}/${favoriting ? "favorite" : "unfavorite"}`;
    await fetch(url, {
      method: favoriting ? "POST" : "DELETE",
      headers: { Authorization: `${token}` },
    });

    await refreshFavorites();
  };

  useEffect(() => {
    if (token) {
      refreshHistory();
      refreshFavorites();
    }
  }, [token])

  return (
    <WordContext.Provider value={{ history, refreshHistory, favorites, refreshFavorites, toggleFavorite }}>
      {children}
    </WordContext.Provider>
  )
}

export const useWordContext = () => {
  const context = useContext(WordContext);
  if (!context) {
    throw new Error("useWordContext deve ser usado dentro de WordProvider");
  }
  return context;
};