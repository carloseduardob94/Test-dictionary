import React from "react";
import { render, screen, fireEvent } from "@testing-library/react"
import { vi, describe, it, expect } from "vitest";

import { FavoriteButton } from "@/components/FavoriteButton";

describe("FavoriteButton", () => {
  const mockToggle = vi.fn()

  it("mostra botão de favoritar quando não favorito", () => {
    render(<FavoriteButton word="teste" isFavorite={false} onToggle={mockToggle} />);
    expect(screen.getByRole("button")).toHaveTextContent(/favoritar/i);
  });

  it("mostra botão de desfavoritar quando é favorito", () => {
    render(<FavoriteButton word="teste" isFavorite={true} onToggle={mockToggle} />)
    expect(screen.getByRole("button")).toHaveTextContent(/favoritado/i)
  });

  it("chama onToggle com o valor correto ao clicar", () => {
    render(<FavoriteButton word="banana" isFavorite={false} onToggle={mockToggle} />)
    fireEvent.click(screen.getByRole("button"));
    expect(mockToggle).toHaveBeenCalledWith("banana", true);
  });
});