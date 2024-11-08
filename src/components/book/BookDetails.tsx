import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Book from "../../types/Book";

const BookDetails = () => {
  const { isbn } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`https://balkon-backend.onrender.com/books/${isbn}`);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    if (isbn) {
      fetchBookDetails();
    }
  }, [isbn]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://balkon-backend.onrender.com/books/${isbn}`);
      navigate("/");
    } catch (error) {
      console.error("Error deleting the book:", error);
    }
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div className="flex flex-col lg:flex-row w-11/12 m-auto mb-16">
      <div className="lg:w-[50%] m-auto mt-16 flex flex-col gap-4 text-white font-semibold">
        <h2 className="p-4 lg:p-8 lg:text-4xl bg-light-brown-color w-fit truncate">{book.title}</h2>
        <p className="p-4 lg:p-8 lg:text-4xl bg-light-brown-color w-fit">ISBN: {book.isbn}</p>
        <p className="p-4 lg:p-8 lg:text-4xl bg-light-brown-color w-fit">Pages: {book.pages}</p>
        <p className="p-4 lg:p-8 lg:text-4xl bg-light-brown-color w-fit">Published: {book.published}</p>
        <p className="p-4 lg:p-8 lg:text-4xl bg-light-brown-color w-fit">
          Authors:{" "}
          {book.authors.map((author) => (
            <Link key={author.id} className="block hover:text-dark-brown-color" to={`/authors/${author.id}`}>
              {author.firstName} {author.lastName}
            </Link>
          ))}
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => navigate(`/books/edit/${book.isbn}`)}
            className="p-4 w-[50%] lg:w-fit lg:text-4xl lg:p-8 bg-light-brown-color text-white rounded hover:bg-dark-brown-color"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="p-4 w-[50%] lg:w-fit lg:text-4xl lg:p-8 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="w-[50%] m-auto mt-16">
        <img src={book.image} alt="" width={500} className="rounded" />
      </div>
    </div>
  );
};

export default BookDetails;
