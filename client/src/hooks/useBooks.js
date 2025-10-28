import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useBooks = (query = "") => {
  const [data, setData] = useState([]); // Books
  const [reviewCounts, setReviewCounts] = useState({});
  const [averageRatings, setAverageRatings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);

        // If there's a search query, use search API, else get all books
        const url = query
          ? `/api/search?query=${encodeURIComponent(query)}`
          : "/api/books";

        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const books = await res.json();
        setData(books);

        // Fetch review counts and average ratings
        const counts = {};
        const ratings = {};

        for (const book of books) {
          try {
            const bookRes = await fetch(`/api/books/${book.id}`, {
              signal: controller.signal,
            });

            if (bookRes.ok) {
              const bookData = await bookRes.json();
              const reviews = bookData.reviews || [];

              counts[book.id] = reviews.length;

              if (reviews.length > 0) {
                const avg =
                  reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
                ratings[book.id] = avg;
              }
            }
          } catch (err) {
            if (err.name !== "AbortError")
              console.error(`Failed to fetch book ${book.id}:`, err);
          }
        }

        setReviewCounts(counts);
        setAverageRatings(ratings);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Failed to fetch books:", err);
          toast.error("Failed to load books");
          setError(err.message || "Failed to load books");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();

    return () => controller.abort();
  }, [query]);

  return { data, reviewCounts, averageRatings, loading, error };
};
