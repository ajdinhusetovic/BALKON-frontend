import React, { useState, useEffect } from "react";
import axios from "axios";

interface Author {
  id: string;
  firstName: string;
  lastName: string;
}

interface BookFormData {
  isbn: string;
  title: string;
  pages: string;
  published: string;
  image: File | null;
  authors: string[];
}

const CreateBook = () => {
  const [formData, setFormData] = useState<BookFormData>({
    isbn: "",
    title: "",
    pages: "",
    published: "",
    image: null,
    authors: [],
  });

  const [authors, setAuthors] = useState<Author[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get("https://balkon-backend.onrender.com/authors");
      setAuthors(response.data);
    } catch (err) {
      console.error("Error fetching authors:", err);
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

      const bookData = new FormData();
      bookData.append("isbn", formData.isbn);
      bookData.append("title", formData.title);
      bookData.append("pages", formData.pages);
      bookData.append("published", formData.published);

      if (formData.image) {
        bookData.append("image", formData.image);
      }

      const response = await axios.post("https://balkon-backend.onrender.com/books", bookData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      for (const author of formData.authors) {
        const authorId = authors.find((a) => `${a.firstName} ${a.lastName}` === author)?.id;
        if (authorId) {
          await axios.post(`https://balkon-backend.onrender.com/books/${formData.isbn}/authors`, {
            authorId,
          });
        }
      }

      if (response.status === 201) {
        setSuccess(true);
        setFormData({
          isbn: "",
          title: "",
          pages: "",
          published: "",
          image: null,
          authors: [],
        });
      } else {
        setError("Failed to create book");
      }
    } catch (err) {
      console.error("Error creating book:", err);
      setError(err instanceof Error ? err.message : "An error occurred while creating the book");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "image" && files) {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const filteredAuthors = authors.filter(
    (author) =>
      author.firstName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !formData.authors.includes(`${author.firstName} ${author.lastName}`),
  );

  const addAuthor = (author: Author) => {
    const authorFullName = `${author.firstName} ${author.lastName}`;
    if (!formData.authors.includes(authorFullName)) {
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
    <div className="max-w-2xl mx-auto mt-16 p-4 lg:p-8 rounded-2xl">
      {error && <p className="text-red-500 mb-4 font-semibold">{error}</p>}
      {success && <p className="text-green-500 mb-4 font-semibold">Book created successfully!</p>}

      <form onSubmit={handleSubmit} className="space-y-4 bg-dark-brown-color p-8 rounded-2xl">
        <div>
          <label className="block mb-1 text-light-brown-color font-bold text-lg">ISBN *</label>
          <input
            type="text"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            className="w-full text-lg text-white-color font-semibold p-4 rounded-2xl outline-none bg-light-brown-color"
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
            className="w-full text-lg text-white-color font-semibold p-4 rounded-2xl outline-none bg-light-brown-color"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block mb-1 text-light-brown-color font-bold text-lg">Pages *</label>
          <input
            type="text"
            name="pages"
            value={formData.pages}
            onChange={handleChange}
            className="w-full text-lg text-white-color font-semibold p-4 rounded-2xl outline-none bg-light-brown-color"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block mb-1 text-light-brown-color font-bold text-lg">Published Year *</label>
          <input
            type="text"
            name="published"
            value={formData.published}
            onChange={handleChange}
            className="w-full text-lg text-white-color font-semibold p-4 rounded-2xl outline-none bg-light-brown-color"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block mb-1 text-light-brown-color font-bold text-lg">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full text-lg text-white-color font-semibold p-4 rounded-2xl outline-none bg-light-brown-color file:bg-light-brown-color file:border-none file:text-dark-brown-color file:font-semibold file:cursor-pointer"
            disabled={loading}
          />
        </div>

        <div className="relative">
          <label className="block mb-1 text-light-brown-color font-bold text-lg">Authors</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            className="w-full text-lg text-white-color font-semibold p-4 rounded-2xl outline-none bg-light-brown-color"
            disabled={loading}
          />

          {showDropdown && searchTerm && (
            <div className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto bg-light-brown-color rounded-2xl shadow-lg">
              {filteredAuthors.length > 0 ? (
                filteredAuthors.map((author) => (
                  <div
                    key={author.id}
                    className="hover:bg-white-color cursor-pointer"
                    onClick={() => addAuthor(author)}
                  >
                    <p className="font-semibold p-2 text-white-color hover:text-black">
                      {author.firstName} {author.lastName}
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-2 text-white-color font-bold text-lg">No authors found</div>
              )}
            </div>
          )}

          {formData.authors.length > 0 && (
            <div className="mt-2 space-y-2">
              {formData.authors.map((author, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-light-brown-color p-4 rounded-2xl text-white-color font-semibold"
                >
                  {author}
                  <button
                    type="button"
                    onClick={() => removeAuthor(author)}
                    className="text-red-500 hover:text-red-700"
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
            {loading ? "Creating..." : "Create Book"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBook;
