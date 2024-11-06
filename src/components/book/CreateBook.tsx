import React, { useState, useEffect } from "react";
import axios from "axios";
import Author from "../../types/Author";

interface BookFormData {
  isbn: string;
  title: string;
  pages: string;
  published: string;
  image: string;
  authors: string[];
}

const CreateBook = () => {
  const [formData, setFormData] = useState<BookFormData>({
    isbn: "",
    title: "",
    pages: "",
    published: "",
    image: "",
    authors: [],
  });

  const [authors, setAuthors] = useState<Author[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Fetch authors on component mount
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

      const bookData = {
        ...formData,
        pages: parseInt(formData.pages),
        published: parseInt(formData.published),
      };

      await axios.post("https://balkon-backend.onrender.com/books", bookData);

      // Add authors to the book after it is created
      for (const author of formData.authors) {
        const authorId = authors.find((a) => `${a.firstName} ${a.lastName}` === author)?.id;
        if (authorId) {
          await axios.post(`https://balkon-backend.onrender.com/books/${formData.isbn}/authors`, {
            authorId,
          });
        }
      }

      setSuccess(true);
      setFormData({
        isbn: "",
        title: "",
        pages: "",
        published: "",
        image: "",
        authors: [],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while creating the book");
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

  const filteredAuthors = authors.filter(
    (author) =>
      author.firstName.toLowerCase().includes(searchTerm.toLowerCase()) && !formData.authors.includes(author.firstName),
  );

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
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Create Book</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">Book created successfully!</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">ISBN *</label>
          <input
            type="text"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="ISBN"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block mb-1">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Title"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block mb-1">Pages *</label>
          <input
            type="number"
            name="pages"
            value={formData.pages}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Pages"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block mb-1">Publication Year *</label>
          <input
            type="number"
            name="published"
            value={formData.published}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Publication Year"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block mb-1">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Image URL"
            disabled={loading}
          />
        </div>

        <div className="relative">
          <label className="block mb-1">Authors</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            className="w-full p-2 border rounded"
            placeholder="Search authors..."
            disabled={loading}
          />

          {showDropdown && searchTerm && (
            <div className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto bg-white border rounded shadow-lg">
              {filteredAuthors.length > 0 ? (
                filteredAuthors.map((author) => (
                  <div
                    key={author.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => addAuthor(author.firstName, author.lastName)}
                  >
                    {author.firstName + " " + author.lastName}
                  </div>
                ))
              ) : (
                <div className="p-2 text-gray-500">No authors found</div>
              )}
            </div>
          )}

          {formData.authors.length > 0 && (
            <div className="mt-2 space-y-2">
              {formData.authors.map((author) => (
                <div key={author} className="flex justify-between items-center p-2 bg-gray-50 rounded">
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
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-green-300"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Book"}
        </button>
      </form>
    </div>
  );
};

export default CreateBook;
