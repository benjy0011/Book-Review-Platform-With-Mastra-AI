import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ReviewCard } from "@/components/ReviewCard";
import { Loader2, ArrowLeft, Star } from "lucide-react";
import { toast } from "sonner";
import { useBookById } from "@/hooks/useBookById";

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { book, loading, error, handleRefetch } = useBookById(id);

  const [reviewForm, setReviewForm] = useState({
    reviewerName: "",
    text: "",
    rating: 5,
  });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewErrors, setReviewErrors] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [generatingAI, setGeneratingAI] = useState(false);

  const [hoverStar, setHoverStar] = useState(null);

  const validateReview = () => {
    const errors = {};

    if (!reviewForm.reviewerName.trim()) {
      errors.reviewerName = "Name is required";
    } else if (reviewForm.reviewerName.length < 2) {
      errors.reviewerName = "Name must be at least 2 characters";
    }

    if (!reviewForm.text.trim()) {
      errors.text = "Review text is required";
    } else if (reviewForm.text.length < 10) {
      errors.text = "Review must be at least 10 characters";
    } else if (reviewForm.text.length > 5000) {
      errors.text = "Review must be less than 5000 characters";
    }

    if (reviewForm.rating < 1 || reviewForm.rating > 5) {
      errors.rating = "Rating must be between 1 and 5";
    }

    setReviewErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!validateReview() || !id) return;

    try {
      setSubmittingReview(true);
      setGeneratingAI(true);

      const response = await fetch(`/api/books/${id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewForm),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit review");
      }

      handleRefetch();

      toast.success("Review submitted successfully!");
      setReviewForm({ reviewerName: "", text: "", rating: 5 });
      setReviewErrors({});
      setShowForm(false);
    } catch (err) {
      toast.error(err.message || "Failed to submit review");
      console.error("Error submitting review:", err);
    } finally {
      setSubmittingReview(false);
      setGeneratingAI(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex flex-col items-center justify-center py-32">
          <Loader2 className="w-8 h-8 animate-spin text-primary mb-3" />
          <p className="text-muted-foreground">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto max-w-6xl px-4 py-12">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-primary hover:text-secondary mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Books
          </button>
          <div className="bg-destructive bg-opacity-10 border border-destructive rounded-lg p-6 text-center">
            <p className="text-destructive font-medium">Error</p>
            <p className="text-sm text-muted-foreground mt-2">
              {error || "Book not found"}
            </p>
          </div>
        </main>
      </div>
    );
  }

  const averageRating =
    book.reviews.length > 0
      ? book.reviews.reduce((sum, r) => sum + r.rating, 0) / book.reviews.length
      : 0;

  return (
    <div className="min-h-screen bg-background">

      <main className="container mx-auto max-w-6xl px-4 py-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-primary hover:text-secondary mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Books
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-1">
            <div className="bg-linear-to-br from-primary to-secondary rounded-lg overflow-hidden shadow-lg">
              <img
                src={book.coverImageUrl}
                alt={book.title}
                className="w-full aspect-3/4 object-cover"
                onError={(e) => {
                  e.target.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='450'%3E%3Crect fill='%23ccc' width='300' height='450'/%3E%3C/svg%3E";
                }}
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <h1 className="font-serif text-4xl font-bold mb-2">{book.title}</h1>
            <p className="text-xl text-secondary font-semibold mb-4">
              by {book.author}
            </p>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(averageRating)
                          ? "star-filled"
                          : "star-empty"
                      }`}
                      fill="currentColor"
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold">
                  {averageRating > 0 ? averageRating.toFixed(1) : "0"}
                </span>
              </div>
              <p className="text-muted-foreground">
                {book.reviews.length}{" "}
                {book.reviews.length === 1 ? "review" : "reviews"}
              </p>
            </div>

            <p className="text-foreground leading-relaxed mb-6">
              {book.description}
            </p>

            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-opacity-90 transition-colors font-medium"
              >
                Write a Review
              </button>
            )}
          </div>
        </div>

        {showForm && (
          <div className="bg-card rounded-lg border border-border p-6 mb-12">
            <h2 className="font-serif text-2xl font-bold mb-6">
              Share Your Review
            </h2>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={reviewForm.reviewerName}
                  onChange={(e) =>
                    setReviewForm({
                      ...reviewForm,
                      reviewerName: e.target.value,
                    })
                  }
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                    reviewErrors.reviewerName
                      ? "border-destructive"
                      : "border-border"
                  } bg-background text-foreground`}
                  placeholder="Your name"
                  disabled={submittingReview}
                />
                {reviewErrors.reviewerName && (
                  <p className="text-sm text-destructive mt-1">
                    {reviewErrors.reviewerName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Rating
                </label>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => {
                        setHoverStar(star)
                      }}
                      onMouseLeave={() => {
                        setHoverStar(null)
                      }}
                      onClick={() =>
                        setReviewForm({ ...reviewForm, rating: star })
                      }
                      disabled={submittingReview}
                      className="focus:outline-none transition-colors px-1 py-2 hover:cursor-pointer"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= (hoverStar ? hoverStar : reviewForm.rating)
                            ? "star-filled"
                            : "star-empty"
                        }`}
                        fill="currentColor"
                      />
                    </button>
                  ))}
                </div>
                {reviewErrors.rating && (
                  <p className="text-sm text-destructive mt-1">
                    {reviewErrors.rating}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Your Review
                </label>
                <textarea
                  value={reviewForm.text}
                  onChange={(e) =>
                    setReviewForm({ ...reviewForm, text: e.target.value })
                  }
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none ${
                    reviewErrors.text ? "border-destructive" : "border-border"
                  } bg-background text-foreground`}
                  placeholder="Share your thoughts about this book..."
                  rows={5}
                  disabled={submittingReview}
                />
                <div className="flex justify-between mt-1">
                  {reviewErrors.text && (
                    <p className="text-sm text-destructive">
                      {reviewErrors.text}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground ml-auto">
                    {reviewForm.text.length} / 5000
                  </p>
                </div>
              </div>

              {submittingReview && (
                <div className="bg-secondary bg-opacity-10 border border-secondary rounded-lg p-3 flex items-center gap-3">
                  <Loader2 className="w-4 h-4 animate-spin text-secondary" />
                  <span className="text-sm text-foreground">
                    {generatingAI
                      ? "AI is analyzing your review..."
                      : "Submitting review..."}
                  </span>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={submittingReview}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-opacity-90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submittingReview ? "Submitting..." : "Submit Review"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  disabled={submittingReview}
                  className="px-6 py-2 bg-muted text-foreground rounded-lg hover:bg-opacity-80 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div>
          <h2 className="font-serif text-2xl font-bold mb-6">
            Reviews ({book.reviews.length})
          </h2>

          {book.reviews.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No reviews yet. Be the first to share your thoughts!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {book.reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
