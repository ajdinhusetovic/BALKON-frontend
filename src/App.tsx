import AuthorDetails from "./components/author/AuthorDetails";
import CreateAuthor from "./components/author/CreateAuthor";
import EditAuthor from "./components/author/EditAuthor";
import BookDetails from "./components/book/BookDetails";
import CreateBook from "./components/book/CreateBook";
import EditBook from "./components/book/EditBook";
import MainPage from "./components/MainPage";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/books/:isbn" element={<BookDetails />} />
        <Route path="/books/create" element={<CreateBook />} />
        <Route path="/books/edit/:isbn" element={<EditBook />} />
        <Route path="/authors/:id" element={<AuthorDetails />} />
        <Route path="/authors/create" element={<CreateAuthor />} />
        <Route path="/authors/edit/:id" element={<EditAuthor />} />
      </Routes>
    </Router>
  );
}

export default App;
