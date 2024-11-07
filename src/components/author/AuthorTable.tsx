import axios from "axios";
import { useEffect, useState } from "react";
import Author from "../../types/Author";
import { useNavigate } from "react-router-dom";

const AuthorTable = () => {
  const [authors, setAuthors] = useState([]);
  const navigate = useNavigate();

  async function fetchAuthors() {
    try {
      const response = await axios.get("https://balkon-backend.onrender.com/authors");
      setAuthors(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }

  useEffect(() => {
    fetchAuthors();
  }, []);

  const handleRowClick = (id: string) => {
    navigate(`/authors/${id}`);
  };

  return (
    <div className="overflow-y-auto bg-light-brown-color rounded-md h-[400px] w-full font-semibold text-white">
      <table className="table">
        <thead className="text-center">
          <tr className="border-none">
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {authors.map((author: Author) => (
            <tr
              onClick={() => handleRowClick(author.id || "")}
              className="border-none cursor-pointer hover:bg-[#fefae0] hover:text-black"
              key={author.id}
            >
              <td>{author.firstName}</td>
              <td>{author.lastName}</td>
              <td>{new Date(author.dob).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuthorTable;
