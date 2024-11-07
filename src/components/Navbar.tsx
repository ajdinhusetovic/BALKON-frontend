import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-dark-brown-color text-white-color">
      <div className="flex-1 ">
        <Link to={"/"} className="btn btn-ghost text-3xl hover:bg-white-color hover:text-black">
          book&author
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 font-medium">
          <li>
            <Link to={"/books/create"} className="text-lg hover:bg-white-color hover:text-black">
              Add book
            </Link>
          </li>
          <li>
            <Link to={"/authors/create"} className="text-lg hover:bg-white-color hover:text-black">
              Add author
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
