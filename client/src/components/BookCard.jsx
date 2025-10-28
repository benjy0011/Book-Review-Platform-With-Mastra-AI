import React from "react";
import { useNavigate } from "react-router";
import { Star } from "lucide-react";

export default function BookCard({ book, reviewCount = 0, averageRating = 0 }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/book/${book.id}`);
  };

  return (
    <div className="book-card" onClick={handleClick}>
      {/* Cover Image */}
      <div className="relative overflow-hidden bg-linear-to-br from-primary to-secondary">
        <img
          src={book.coverImageUrl}
          alt={book.title}
          className="book-cover"
          onError={(e) => {
            e.target.src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='150'%3E%3Crect fill='%23ccc' width='100' height='150'/%3E%3C/svg%3E";
          }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h3 className="font-serif font-bold text-lg text-foreground line-clamp-2">
            {book.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{book.author}</p>
          <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
            {book.description}
          </p>
        </div>

        {/* Rating and Review Count */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            {averageRating > 0 ? (
              <div className="flex items-center gap-1">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.round(averageRating)
                          ? "star-filled"
                          : "star-empty"
                      }`}
                      fill="currentColor"
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  {averageRating.toFixed(1)}
                </span>
              </div>
            ) : (
              <span className="text-xs text-muted-foreground">
                No reviews yet
              </span>
            )}
            <span className="text-xs text-muted-foreground">
              {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
