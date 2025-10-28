import { addReview, getAllBooks, getBookWithReviews, searchForBooks } from "../services/bookService.js";

export async function getBooks(req, res, next) {
  try {
    const books = await getAllBooks();
    res.json(books);
  } catch (err) {
    next(err);
  }
}

export async function getBookById(req, res, next) {
  try {
    const bookId = Number(req.params.id);
    const book = await getBookWithReviews(bookId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    next(err);
  }
}


export async function submitReviewToBook(req, res, next) {
  try {
    const bookId = Number(req.params.id);
    const { reviewerName, text, rating } = req.body;

    if (!reviewerName || !text || rating == null) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newReview = await addReview(bookId, reviewerName, text, +rating);

    return res.status(201).json(newReview);
  } catch (err) {
    next(err);
  }
}

export async function searchBooks(req, res, next) {
  try {
    const { query } = req.query;

    const books = await searchForBooks(query);
    res.json(books);
  } catch (err) {
    next(err);
  }
}