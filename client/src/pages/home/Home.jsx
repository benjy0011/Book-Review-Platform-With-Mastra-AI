import { Loader2 } from "lucide-react";
import BookCard from "@/components/BookCard";
import { useBooks } from "@/hooks/useBooks";
import { useSearchParams } from "react-router";

export default function Home() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  const { data: books, reviewCounts, averageRatings, loading, error } = useBooks(query);  

  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="bg-linear-to-r from-orange-400 to-blue-400 py-12 text-white">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="font-serif text-4xl font-bold mb-3">Welcome Readers</h2>
          <p className="text-lg text-white text-opacity-90 max-w-2xl">
            Discover amazing books, read authentic reviews, and share your own
            thoughts. Powered by AI-enriched insights on every review.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto max-w-6xl px-4 py-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-3" />
            <p className="text-muted-foreground">Loading books...</p>
          </div>
        ) : error ? (
          <div className="bg-destructive bg-opacity-10 border border-destructive rounded-lg p-6 text-center">
            <p className="text-destructive font-medium">Error loading books</p>
            <p className="text-sm text-muted-foreground mt-2">{error}</p>
          </div>
        ) : 
        (
          <div>
            <div className="flex gap-6 mb-8 items-center">
              <h3 className="font-serif text-2xl font-bold">
                {query ? `Books (${books?.length ?? 0})` : "Featured Books"}
              </h3>
              
              {query &&
                <h6 className="text-accent-foreground">
                  {`Search Result${books?.length > 1 ? 's' : ''} for "${query}"`} 
                </h6>
              }
            </div>
            {
              books.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No books available</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {books.map((book) => (
                    <BookCard
                      key={book.id}
                      book={book}
                      reviewCount={reviewCounts[book.id] || 0}
                      averageRating={averageRatings[book.id] || 0}
                    />
                  ))}
                </div>
              )
            }
          </div>
        )}
      </main>
    </div>
  );
}
