import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-dark-brown-color text-white">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-3xl">
          book&author
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 font-medium">
          <li>
            <Link to={"/books/create"} className="text-lg">
              Add book
            </Link>
          </li>
          <li>
            <a className="text-lg">Add author</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
