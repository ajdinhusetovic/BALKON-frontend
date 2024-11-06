import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Book from "../../types/Book";

const BookDetails = () => {
  const { isbn } = useParams();
  const [book, setBook] = useState<Book | null>(null);

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

  if (!book) return <div>Loading...</div>;

  return (
    <div className="w-10/12 m-auto mt-16 flex flex-col gap-4 text-white font-semibold">
      <h2 className="p-8 text-4xl bg-light-brown-color w-fit ">{book.title}</h2>
      <p className="p-8 text-4xl bg-light-brown-color w-fit ">ISBN: {book.isbn}</p>
      <p className="p-8 text-4xl bg-light-brown-color w-fit ">Pages: {book.pages}</p>
      <p className="p-8 text-4xl bg-light-brown-color w-fit ">Published: {book.published}</p>
      <p className="p-8 text-4xl bg-light-brown-color w-fit ">Authors: aa</p>
    </div>
  );
};

export default BookDetails;
