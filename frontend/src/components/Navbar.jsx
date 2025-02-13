import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-xl font-bold">
         Happy Holidays
        </Link>

        {/* Navigation Links */}
        <div className="space-x-4 px-2">
          <Link to="/" className="text-white hover:text-gray-300">
           <b>Home</b> 
          </Link>
          <Link to="/holidays" className="text-white hover:text-gray-300">
           <b>Holidays</b> 
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
