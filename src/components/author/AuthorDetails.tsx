import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Author from "../../types/Author";

const AuthorDetails = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState<Author | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthorDetails = async () => {
      try {
        const response = await axios.get(`https://balkon-backend.onrender.com/authors/${id}`);
        setAuthor(response.data);
      } catch (error) {
        console.error("Error fetching author details:", error);
      }
    };

    if (id) {
      fetchAuthorDetails();
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://balkon-backend.onrender.com/authors/${id}`);
      navigate("/");
    } catch (error) {
      console.error("Error deleting the author:", error);
    }
  };

  if (!author) return <div>Loading...</div>;

  return (
    <div className="flex w-11/12 m-auto">
      <div className="w-[50%] m-auto mt-16 flex flex-col gap-4 text-white font-semibold">
        <h2 className="p-8 text-4xl bg-light-brown-color w-fit ">
          {author.firstName} {author.lastName}
        </h2>
        <p className="p-8 text-4xl bg-light-brown-color w-fit ">Date of Birth: {author.dob}</p>
        <p className="p-8 text-4xl bg-light-brown-color w-fit ">
          Books:{" "}
          {author.books.map((book) => (
            <Link key={book.isbn} className="block hover:text-dark-brown-color" to={`/books/${book.isbn}`}>
              {book.title}
            </Link>
          ))}
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => navigate(`/authors/edit/${author.id}`)}
            className="w-fit text-4xl p-8 bg-light-brown-color text-white rounded hover:bg-dark-brown-color"
          >
            Edit
          </button>
          <button onClick={handleDelete} className="w-fit text-4xl p-8 bg-red-600 text-white rounded hover:bg-red-700">
            Delete
          </button>
        </div>
      </div>
      <div className="w-[50%] m-auto mt-16">
        <img src={author.image} alt="" width={500} className="rounded" />
      </div>
    </div>
  );
};

export default AuthorDetails;
