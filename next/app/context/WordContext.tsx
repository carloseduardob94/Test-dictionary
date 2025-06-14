"use client";

import { createContext, useContext, useEffect, useState } from "react";

type WordContextType = {
  history: string[];
  refreshHistory: () => Promise<void>;
};

const WordContext = createContext<WordContextType | undefined>(undefined);

export const WordProvider = ({ children }: { children: React.ReactNode }) => {
  const [history, setHistory] = useState<string[]>([]);

  const refreshHistory = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
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

  useEffect(() => {
    refreshHistory();
  }, [])

  return (
    <WordContext.Provider value={{ history, refreshHistory }}>
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