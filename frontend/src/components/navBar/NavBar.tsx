import { useState } from "react";
import { Button } from "../ui/button";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "../theme-toggle";
import { Menu, X } from "lucide-react";
import { INavLink } from "@/constant/data";

const NavBar = ({data}: {data: INavLink[]}) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-background w-full px-6 py-4 flex items-center justify-between text-lg">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold">
       EDU<span className="text-blue-500">Match</span>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-6 items-center">
        {data.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`hover:text-gray-400  ${
              location.pathname === item.path ? "text-blue-400" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Right Section */}
      <div className="hidden md:flex items-center space-x-4">
        <Link to="/login" className="text-blue-400 hover:text-blue-300">Login</Link>
        <Button className="bg-blue-500 hover:bg-blue-600">Sign Up</Button>
        <ThemeToggle />
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} className="text-black dark:text-white" /> : <Menu size={24} className="text-black dark:text-white" />}
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-background flex flex-col items-center space-y-4 py-4 md:hidden">
          {data.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`hover:text-gray-400 ${
                location.pathname === item.path ? "text-blue-400" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Link to="/login" className="text-blue-400 hover:text-blue-300">Login</Link>
          <Button >Sign Up</Button>
          <ThemeToggle />
        </div>
      )}
    </nav>
  );
};

export default NavBar;

