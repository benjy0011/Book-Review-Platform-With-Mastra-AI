import { Star } from "lucide-react";
// import { formatDistanceToNow } from "date-fns";

export function ReviewCard({ review }) {
  const sentimentBadgeClass = {
    positive: "sentiment-positive",
    neutral: "sentiment-neutral",
    negative: "sentiment-negative",
  }[review.sentimentScore.toLowerCase() || "neutral"];

  return (
    <div className="review-card">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="font-semibold text-foreground">{review.reviewerName}</p>
        </div>

        {/* Rating Stars */}
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < review.rating ? "star-filled" : "star-empty"}`}
              fill="currentColor"
            />
          ))}
        </div>
      </div>

      {/* Review Text */}
      <p className="text-foreground mb-4 leading-relaxed">{review.text}</p>

      {/* AI-Generated Summary */}
      {review.summary && (
        <div className="bg-muted bg-opacity-30 rounded-lg p-3 mb-4 border border-border">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
            AI Summary
          </p>
          <p className="text-sm text-foreground">{review.summary}</p>
        </div>
      )}

      {/* AI Sentiment & Tags */}
      <div className="flex flex-wrap gap-2 items-center">
        {review.sentimentScore && (
          <div className={`sentiment-badge ${sentimentBadgeClass}`}>
            {review.sentimentScore.charAt(0).toUpperCase() +
              review.sentimentScore.slice(1)}
          </div>
        )}

        {review.tags && review.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {review.tags.map((tag, i) => (
              <span key={i} className="tag-badge">
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
