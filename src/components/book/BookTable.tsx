import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import { useNavigate } from "react-router-dom";

const BookTable = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  async function fetchBooks() {
    try {
      const response = await axios.get("https://balkon-backend.onrender.com/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleRowClick = (bookId) => {
    navigate(`/books/${bookId}`); // Navigate to the book details page
  };

  return (
    <div className="overflow-y-auto bg-[#ffbf69] font-semibold text-white rounded-md h-[400px] w-full">
      <table className="table">
        <thead className="text-center">
          <tr className="border-none ">
            <th>ISBN</th>
            <th>Title</th>
            <th>Pages</th>
            <th>Published</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {books.map((book) => (
            <tr
              onClick={() => handleRowClick(book.isbn)}
              className="border-none cursor-pointer hover:bg-light-blue"
              key={book.isbn}
            >
              <td className="border-none">{book.isbn}</td>
              <td>{book.title}</td>
              <td>{book.pages}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;
