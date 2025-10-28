import Layout from "@/layout/Layout";
import BookDetail from "@/pages/home/bookDetail/BookDetail";
import Home from "@/pages/home/Home";
import NotFound from "@/pages/notFound/NotFound";
import { Routes, Route, BrowserRouter, Navigate } from "react-router";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="books" replace />} />
          <Route path="books" element={<Home />} />
          <Route path="book/:id" element={<BookDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes;