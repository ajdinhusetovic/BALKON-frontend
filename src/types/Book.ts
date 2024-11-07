import Author from "./Author";

interface Book {
  isbn: string;
  title: string;
  pages: number;
  published: string;
  authors: Author[];
  image: "";
}

export default Book;
