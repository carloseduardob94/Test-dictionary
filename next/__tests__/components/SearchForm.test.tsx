import React from "react";
import SearchForm from "@/components/SearchForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/app/context/AuthContext.tsx", () => ({
  useAuth: () => ({ token: "fake-token" })
}));

vi.mock("@/app/context/WordContext.tsx", () => ({
  useWordContext: () => ({
    favorites: [],
    toggleFavorite: vi.fn(),
    refreshHistory: vi.fn()
  })
}))

const push = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
  useSearchParams: () => new URLSearchParams(),
}));

describe("SearchForm", () => {
  it("renderiza o input e o botão", () => {
    render(<SearchForm />);
    expect(screen.getByPlaceholderText(/Digite uma palavra/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  })

  it("executa a busca e exibe resultados", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => [
        { word: "teste", meanings: [{ definitions: [{ definition: "definição teste" }] }] }
      ],
      ok: true
    })

    render(<SearchForm />);
    fireEvent.change(screen.getByPlaceholderText(/Digite uma palavra/i), {
      target: { value: "teste" }
    })
    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByText("teste")).toBeInTheDocument();
      expect(screen.getByText("definição teste")).toBeInTheDocument();
    });
  })
})