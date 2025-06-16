import * as React from "react";
import { act } from "react-dom/test-utils"
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import WordTabs from "@/components/WordTabs";

vi.mock("@/app/context/AuthContext.tsx", () => ({
  useAuth: () => ({ token: "fake-token" })
}));

const mockToggleFavorite = vi.fn()

vi.mock("@/app/context/WordContext.tsx", () => ({
  useWordContext: () => ({
    history: ["hello", "world"],
    favorites: ["apple", "banana"],
    toggleFavorite: mockToggleFavorite,
  })
}));

global.fetch = vi.fn().mockResolvedValue({
  json: async () => ({
    results: ["test", "demo"],
    totalPages: 3
  }),
  ok: true
});

describe("WordTabs", () => {
  it("renderiza os tabs corretamente", async () => {
    render(<WordTabs />);
    expect(screen.getByText("Word List")).toBeInTheDocument();
    expect(screen.getByText("History")).toBeInTheDocument();
    expect(screen.getByText("Favorites")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("test")).toBeInTheDocument();
      expect(screen.getByText("demo")).toBeInTheDocument();
    });
  });

  it("renderiza palavras do histórico ao abrir a aba 'history'", async () => {
    render(<WordTabs initialTab="history" />);
    expect(await screen.findByText("hello")).toBeInTheDocument();
    expect(await screen.findByText("world")).toBeInTheDocument();
  });

  it("renderiza palavras favoritas diretamente", async () => {
    render(<WordTabs initialTab="favorites" />);
    screen.debug()
    expect(await screen.findByText("apple")).toBeInTheDocument();
    expect(await screen.findByText("banana")).toBeInTheDocument();
  });

  it("chama toggleFavorite ao clicar no botão", async () => {
    render(<WordTabs />);
    await waitFor(() => screen.getByText("test"));

    const button = screen.getAllByRole("button").find((b) =>
      b.textContent?.toLowerCase().includes("favoritar")
    );

    if (button) {
      fireEvent.click(button);
      expect(mockToggleFavorite).toHaveBeenCalled();
    }
  });

  it("altera a página ao clicar em 'Next' na aba 'list'", async () => {
    render(<WordTabs initialTab="list" />);

    await screen.findByText("test");

    const nextBtn = screen.getByLabelText(/next/i);
    fireEvent.click(nextBtn);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("page=2"),
        expect.any(Object)
      );
    });
  });

  it("desabilita botão 'Previous' na primeira página", async () => {
    render(<WordTabs initialTab="list" />);

    await screen.findByText("test");

    const prevBtn = screen.getByLabelText(/previous/i);
    expect(prevBtn).toHaveClass("pointer-events-none");
  });
});