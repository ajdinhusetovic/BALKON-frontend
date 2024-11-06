const Navbar = () => {
  return (
    <div className="navbar bg-light-blue text-white">
      <div className="flex-1">
        <a className="btn btn-ghost text-3xl">book&author</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 font-medium">
          <li>
            <a className="text-lg">Add book</a>
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
