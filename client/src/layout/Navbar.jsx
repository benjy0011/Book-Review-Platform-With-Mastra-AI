import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate, useSearchParams } from "react-router";
import { useEffect } from "react";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const sparam = searchParams.get('q');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`books?q=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate("books");
    }
  };

  useEffect(() => {
    setSearchQuery(sparam ?? "")
  },[sparam])

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto max-w-6xl px-4 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3 min-w-fit hover:cursor-pointer" onClick={() => navigate("/")}>
            <div className="text-primary text-2xl font-bold">📚</div>
            <div>
              <h1 className="text-2xl font-bold text-foreground font-serif">
                BookReview
              </h1>
              <p className="text-xs text-muted-foreground">
                Discover & Review Books
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search books and reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-10"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}
