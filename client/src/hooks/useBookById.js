import { useState, useEffect } from "react";

export const useBookById = (id) => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refetch, setRefetch] = useState(0);

  const handleRefetch = () => {
    setRefetch(prev => prev + 1);
  }

  useEffect(() => {
    if (!id) return; // prevent running without an id

    const controller = new AbortController();

    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/books/${id}`, {
          signal: controller.signal,
        });

        if (!response.ok) throw new Error("Book not found");

        const data = await response.json();
        setBook(data);
        setError(null);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err instanceof Error ? err.message : "Failed to load book");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();

    return () => controller.abort(); // clean up on unmount or id change
  }, [id, refetch]);

  return { book, loading, error, handleRefetch };
};
