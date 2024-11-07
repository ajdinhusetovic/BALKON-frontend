import Author from "./Author";

interface Book {
  isbn: string;
  title: string;
  pages: number;
  published: string;
  authors: Author[];
}

export default Book;
