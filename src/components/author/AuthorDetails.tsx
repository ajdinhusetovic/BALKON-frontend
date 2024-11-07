import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Author from "../../types/Author";

const AuthorDetails = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState<Author | null>(null);
  const navigate = useNavigate();
  console.log(id);

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

  if (!author) return <div>Loading...</div>;

  return (
    <div className="w-[50%] m-auto mt-16 flex flex-col gap-4 text-white font-semibold">
      <h2 className="p-8 text-4xl bg-light-brown-color w-fit ">
        {author.firstName} {author.lastName}
      </h2>
      <p className="p-8 text-4xl bg-light-brown-color w-fit ">Date of Birth: {author.dob}</p>
      <p className="p-8 text-4xl bg-light-brown-color w-fit ">Image URL: {author.image}</p>
      <p className="p-8 text-4xl bg-light-brown-color w-fit ">
        Books:{" "}
        {author.books.map((book) => (
          <Link className="block hover:text-dark-brown-color" to={`/books/${book.isbn}`}>
            {book.title}
          </Link>
        ))}
      </p>
      <button
        onClick={() => navigate(`/authors/edit/${author.id}`)}
        className="p-8 text-4xl bg-light-brown-color w-fit text-white rounded hover:bg-dark-brown-color"
      >
        Edit
      </button>
    </div>
  );
};

export default AuthorDetails;
