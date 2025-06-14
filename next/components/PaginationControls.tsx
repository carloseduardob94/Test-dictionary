import { Button } from "./ui/button";

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export const PaginationControls = ({ page, totalPages, onPrev, onNext }: PaginationControlsProps) => {
  return (
    <div className="flex justify-center gap-4 mt-6">
      <Button onClick={onPrev} disabled={page === 1}>Anterior</Button>
      <span className="text-sm text-muted-foreground">
        Página {page} de {totalPages}
      </span>
      <Button onClick={onNext} disabled={page === totalPages}>Próxima</Button>
    </div>
  )
}