import BookDetails from "./components/book/BookDetails";
import MainPage from "./components/MainPage";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />

      {/* Routes for navigating to book details */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/books/:isbn" element={<BookDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
