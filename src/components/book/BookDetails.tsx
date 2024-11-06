import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const BookDetails = () => {
  const { isbn } = useParams(); // Get ISBN from URL params
  const [book, setBook] = useState(null);

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
  }, [isbn]); // Dependency array ensures the effect runs when the ISBN changes

  if (!book) return <div>Loading...</div>;

  return (
    <div className="w-10/12 m-auto mt-16 flex flex-col gap-4 text-white font-semibold">
      <h2 className="p-8 text-4xl bg-light-brown-color w-fit ">{book.title}</h2>
      <p className="p-8 text-4xl bg-light-brown-color w-fit ">ISBN: {book.isbn}</p>
      <p className="p-8 text-4xl bg-light-brown-color w-fit ">Pages: {book.pages}</p>
      <p className="p-8 text-4xl bg-light-brown-color w-fit ">Published: {book.published}</p>
      <p className="p-8 text-4xl bg-light-brown-color w-fit ">Authors: John Fitzgerald</p>
    </div>
  );
};

export default BookDetails;
