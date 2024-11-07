import Book from "./Book";

interface Author {
  id?: string;
  firstName: string;
  lastName: string;
  dob: string;
  image: string;
  books: Book[];
}

export default Author;
