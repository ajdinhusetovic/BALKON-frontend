import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface Book {
  isbn: string;
  title: string;
}

const EditAuthor = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    image: "",
    books: [] as Book[],
  });
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchBooks();
      fetchAuthorData();
    }
  }, [id]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("https://balkon-backend.onrender.com/books");
      setBooks(response.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  const fetchAuthorData = async () => {
    try {
      const response = await axios.get(`https://balkon-backend.onrender.com/authors/${id}`);
      setFormData(response.data);
    } catch (err) {
      console.error("Error fetching author data:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.dob) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess(false);

      const formattedData = {
        ...formData,
        dob: new Date(formData.dob).toISOString().split("T")[0],
      };

      await axios.put(`https://balkon-backend.onrender.com/authors/${id}`, formattedData);

      setSuccess(true);
      navigate(`/authors/${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while editing the author");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) && !formData.books.some((b) => b.isbn === book.isbn),
  );

  const addBook = (book: Book) => {
    if (!formData.books.some((b) => b.isbn === book.isbn)) {
      setFormData((prev) => ({
        ...prev,
        books: [...prev.books, book],
      }));
    }
    setSearchTerm("");
    setShowDropdown(false);
  };

  const removeBook = (bookToRemove: Book) => {
    setFormData((prev) => ({
      ...prev,
      books: prev.books.filter((b) => b.isbn !== bookToRemove.isbn),
    }));
  };

  return (
    <div className="max-w-2xl mx-auto mt-16 mb-16 p-8 rounded-2xl bg-dark-brown-color">
      {error && <p className="text-red-500 mb-4 font-semibold">{error}</p>}
      {success && <p className="text-green-500 mb-4 font-semibold">Author updated successfully!</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-light-brown-color font-bold text-lg">First Name *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full text-lg text-white font-semibold p-4 rounded-2xl outline-none bg-light-brown-color"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block mb-1 text-light-brown-color font-bold text-lg">Last Name *</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full text-lg text-white font-semibold p-4 rounded-2xl outline-none bg-light-brown-color"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block mb-1 text-light-brown-color font-bold text-lg">Date of Birth *</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full text-lg text-white font-semibold p-4 rounded-2xl outline-none bg-light-brown-color"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block mb-1 text-light-brown-color font-bold text-lg">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full text-lg text-white font-semibold p-4 rounded-2xl outline-none bg-light-brown-color"
            disabled={loading}
          />
        </div>

        <div className="relative">
          <label className="block mb-1 text-light-brown-color font-bold text-lg">Books</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            className="w-full text-lg text-white font-semibold p-4 rounded-2xl outline-none bg-light-brown-color"
            disabled={loading}
          />

          {showDropdown && searchTerm && (
            <div className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto bg-light-brown-color rounded-2xl shadow-lg">
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <div key={book.isbn} className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => addBook(book)}>
                    <p className="text-white font-semibold hover:text-black">{book.title}</p>
                  </div>
                ))
              ) : (
                <div className="p-2 text-white-color">No books found</div>
              )}
            </div>
          )}

          {formData.books.length > 0 && (
            <div className="mt-2 space-y-2">
              {formData.books.map((book) => (
                <div
                  key={book.isbn}
                  className="flex justify-between items-center text-white-color font-semibold bg-light-brown-color p-4 rounded-2xl text-lg"
                >
                  {book.title}
                  <button
                    type="button"
                    onClick={() => removeBook(book)}
                    className="text-red-500 hover:text-red-700 disabled:text-red-300"
                    disabled={loading}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-8/12 m-auto flex items-center justify-center">
          <button
            type="submit"
            className="w-full p-2 bg-light-brown-color text-white-color font-semibold rounded-2xl hover:bg-white-color hover:text-black disabled:bg-slate-500"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAuthor;
