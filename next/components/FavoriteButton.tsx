import React from "react"
import { useState } from "react";
import { Button } from "./ui/button";
import { Star, StarOff } from "lucide-react";

interface FavoriteButtonProps {
  word: string;
  isFavorite: boolean;
  onToggle: (word: string, favorited: boolean) => Promise<void>
}

export const FavoriteButton = ({ word, isFavorite, onToggle }: FavoriteButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await onToggle(word, !isFavorite);
    setLoading(false);
  };

  return (
    <Button variant="ghost" onClick={handleClick} disabled={loading}>
      {isFavorite ? (
        <Star data-testid="star-filled" className="w-5 h-5 text-yellow-500 fill-yellow-500 mr-1" />
      ) : (
        <StarOff data-testid="star-off" className="w-5 h-5 text-muted-foreground mr-1" />
      )}
      {isFavorite ? "Favoritado" : "Favoritar"}
    </Button>
  )
}