import { createContext, useEffect, useState } from "react";

import { apiRequest } from "../api";
import defaultPerfumes from "../data/perfumes";

export const PerfumeContext = createContext();

function PerfumeProvider({ children }) {
  const [perfumes, setPerfumes] = useState(defaultPerfumes);
  const [loadingPerfumes, setLoadingPerfumes] = useState(true);

  const loadPerfumes = async () => {
    setLoadingPerfumes(true);

    try {
      const data = await apiRequest("/perfumes");
      setPerfumes(data);
    } catch {
      setPerfumes(defaultPerfumes);
    } finally {
      setLoadingPerfumes(false);
    }
  };

  useEffect(() => {
    loadPerfumes();
  }, []);

  const addPerfume = async (perfume) => {
    const createdPerfume = await apiRequest("/perfumes", {
      method: "POST",
      body: JSON.stringify(perfume),
    });
    setPerfumes((items) => [createdPerfume, ...items]);
    return createdPerfume;
  };

  const deletePerfume = async (id) => {
    await apiRequest(`/perfumes/${id}`, { method: "DELETE" });
    setPerfumes((items) => items.filter((perfume) => String(perfume.id) !== String(id)));
  };

  const editPerfume = async (updatedPerfume) => {
    const savedPerfume = await apiRequest(`/perfumes/${updatedPerfume.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedPerfume),
    });

    setPerfumes((items) =>
      items.map((perfume) =>
        String(perfume.id) === String(savedPerfume.id) ? savedPerfume : perfume
      )
    );
    return savedPerfume;
  };

  return (
    <PerfumeContext.Provider
      value={{
        perfumes,
        loadingPerfumes,
        loadPerfumes,
        addPerfume,
        deletePerfume,
        editPerfume,
      }}
    >
      {children}
    </PerfumeContext.Provider>
  );
}

export default PerfumeProvider;
