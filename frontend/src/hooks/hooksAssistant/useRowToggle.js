import { useState } from "react";

//controlar interacción por fila
export function useRowToggle() {
  const [openRowId, setOpenRowId] = useState(null);

  const openRow = (id) => setOpenRowId(id);

  const closeRow = () => setOpenRowId(null);

  const toggleRow = (id) => {
    setOpenRowId((prev) => (prev === id ? null : id));
  };

  return {
    openRowId,
    openRow,
    closeRow,
    toggleRow,
  };
}