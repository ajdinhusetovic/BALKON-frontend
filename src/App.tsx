import BookDetails from "./components/book/BookDetails";
import CreateBook from "./components/book/CreateBook";
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
      </Routes>
    </Router>
  );
}

export default App;
