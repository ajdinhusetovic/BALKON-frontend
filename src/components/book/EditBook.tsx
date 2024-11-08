import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Author from "../../types/Author";

interface BookFormData {
  isbn: string;
  title: string;
  pages: string;
  published: string;
  image: string;
  authors: string[];
}

const EditBook = () => {
  const { isbn } = useParams<{ isbn: string }>();
  const [formData, setFormData] = useState<BookFormData>({
    isbn: "",
    title: "",
    pages: "",
    published: "",
    image: "",
    authors: [],
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const [authors, setAuthors] = useState<Author[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isbn) {
      fetchAuthors();
      fetchBookDetails(isbn);
    }
  }, [isbn]);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get("https://balkon-backend.onrender.com/authors");
      setAuthors(response.data);
    } catch (err) {
      console.error("Error fetching authors:", err);
    }
  };

  const fetchBookDetails = async (isbn: string) => {
    try {
      const response = await axios.get(`https://balkon-backend.onrender.com/books/${isbn}`);
      const book = response.data;
      setFormData({
        isbn: book.isbn,
        title: book.title,
        pages: book.pages.toString(),
        published: book.published.toString(),
        image: book.image || "",
        authors: book.authors.map((author: Author) => `${author.firstName} ${author.lastName}`),
      });
    } catch (err) {
      console.error("Error fetching book details:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.isbn || !formData.title || !formData.pages || !formData.published) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess(false);

      const formDataToSubmit = new FormData();
      formDataToSubmit.append("isbn", formData.isbn);
      formDataToSubmit.append("title", formData.title);
      formDataToSubmit.append("pages", formData.pages);
      formDataToSubmit.append("published", formData.published);

      if (imageFile) {
        formDataToSubmit.append("image", imageFile);
      } else if (formData.image) {
        formDataToSubmit.append("image", formData.image);
      }

      await axios.put(`https://balkon-backend.onrender.com/books/${formData.isbn}`, formDataToSubmit, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Updating authors
      const currentAuthorsResponse = await axios.get(
        `https://balkon-backend.onrender.com/books/${formData.isbn}/authors`,
      );
      const currentAuthors = currentAuthorsResponse.data;

      const authorsToRemove = currentAuthors.filter(
        (currentAuthor: Author) => !formData.authors.includes(currentAuthor.firstName + " " + currentAuthor.lastName),
      );

      for (const author of authorsToRemove) {
        await axios.delete(`https://balkon-backend.onrender.com/books/${formData.isbn}/authors/${author.id}`);
      }

      for (const author of formData.authors) {
        const authorFullName = author.split(" ");
        const authorId = authors.find((a) => a.firstName === authorFullName[0] && a.lastName === authorFullName[1])?.id;

        if (authorId) {
          await axios.post(`https://balkon-backend.onrender.com/books/${formData.isbn}/authors`, { authorId });
        }
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while editing the book");
      console.error(err);
    } finally {
      setLoading(false);
      navigate(`/books/${isbn}`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const filteredAuthors = authors.filter(
    (author) =>
      author.firstName.toLowerCase().includes(searchTerm.toLowerCase()) && !formData.authors.includes(author.firstName),
  );

  console.log("Filtered Authors:", filteredAuthors);

  const addAuthor = (authorName: string, authorLastName: string) => {
    if (!formData.authors.includes(authorName)) {
      const authorFullName = authorName + " " + authorLastName;
      setFormData((prev) => ({
        ...prev,
        authors: [...prev.authors, authorFullName],
      }));
    }

    setSearchTerm("");
    setShowDropdown(false);
  };

  const removeAuthor = (authorToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      authors: prev.authors.filter((author) => author !== authorToRemove),
    }));
  };

  return (
    <div className="max-w-2xl mx-auto mt-16 p-4 lg:p-8 rounded-2xl bg-dark-brown-color">
      {error && <p className="text-red-500 mb-4 font-semibold">{error}</p>}
      {success && <p className="text-green-500 mb-4 font-semibold">Book updated successfully!</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-light-brown-color font-bold text-lg">ISBN *</label>
          <input
            type="text"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            className="w-full text-lg text-white font-semibold p-4 rounded-2xl outline-none bg-light-brown-color"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block mb-1 text-light-brown-color font-bold text-lg">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full text-lg text-white font-semibold p-4 rounded-2xl outline-none bg-light-brown-color"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block mb-1 text-light-brown-color font-bold text-lg">Pages *</label>
          <input
            type="number"
            name="pages"
            value={formData.pages}
            onChange={handleChange}
            className="w-full text-lg text-white font-semibold p-4 rounded-2xl outline-none bg-light-brown-color"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block mb-1 text-light-brown-color font-bold text-lg">Publication Year *</label>
          <input
            type="number"
            name="published"
            value={formData.published}
            onChange={handleChange}
            className="w-full text-lg text-white font-semibold p-4 rounded-2xl outline-none bg-light-brown-color"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block mb-1 text-light-brown-color font-bold text-lg">Upload Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full text-lg text-white font-semibold p-4 rounded-2xl outline-none bg-light-brown-color file:bg-light-brown-color file:border-none file:text-dark-brown-color file:font-semibold file:cursor-pointer"
            disabled={loading}
          />
        </div>

        <div>
          <h3 className="block mb-1 text-light-brown-color font-bold text-lg">Authors</h3>
          <div className="relative">
            <input
              type="text"
              className="w-full text-lg text-white font-semibold p-4 rounded-2xl outline-none bg-light-brown-color"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShowDropdown(true)}
              disabled={loading}
            />
            {showDropdown && searchTerm && (
              <div className="absolute bg-light-brown-color  w-full max-h-60 overflow-y-auto mt-2 border-2 border-dark-brown-color rounded-2xl z-10">
                {filteredAuthors.length > 0 ? (
                  filteredAuthors.map((author) => (
                    <div
                      key={author.id}
                      onClick={() => addAuthor(author.firstName, author.lastName)}
                      className="p-4 cursor-pointer hover:bg-white-color text-white-color hover:text-black font-semibold"
                    >
                      {author.firstName} {author.lastName}
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-white-color">No authors found</div>
                )}
              </div>
            )}
          </div>
          {formData.authors.length > 0 && (
            <div className="mt-2 space-y-2">
              {formData.authors.map((author) => (
                <div
                  key={author}
                  className="flex justify-between items-center text-white-color font-semibold bg-light-brown-color p-4 rounded-2xl text-lg"
                >
                  {author}
                  <button
                    type="button"
                    onClick={() => removeAuthor(author)}
                    className="text-red-500 hover:text-red-700 disabled:text-red-300"
                    disabled={loading}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="w-8/12 m-auto mt-8 flex items-center justify-center">
            <button
              type="submit"
              className="w-full p-2 bg-light-brown-color text-white-color font-semibold rounded-2xl hover:bg-white-color hover:text-black disabled:bg-slate-500"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditBook;
