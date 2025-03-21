import { useState } from "react";
import { Button } from "../ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ThemeToggle } from "../theme-toggle";
import { Menu, X } from "lucide-react";
import { INavLink } from "@/constant/data";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { logoutAction } from "@/store/auth/authSlice";
import { Input } from "../ui/input";
import { ProfileToggle } from "./ProfileToggle";

const NavBar = ({ data }: { data: INavLink[] }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, loading, error } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch();
  const locationPath = useLocation().pathname;
  console.log('locationPath', locationPath)


  return (
    <nav className="bg-background w-full px-6 py-4 flex items-center justify-between text-lg">
      {/* Logo */}
      <Link to={isAuthenticated ? "/dashboard" : "/"} className="text-xl font-bold">
        EDU<span className="text-blue-500" onClick={() => navigate('/')}>Match</span>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-6 items-center">
        {data.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`hover:text-gray-400  ${location.pathname === item.path ? "text-blue-400" : ""
              }`}
          >
            {item.name}
          </Link>
        ))}
        {
          isAuthenticated && locationPath === '/dashboard' &&
          <Input type="search" placeholder="Search" className="w-[20rem]" />
        }
      </div>


      {/* Right Section */}
      <div className="hidden md:flex items-center space-x-4">
        {!isAuthenticated ?
          <>
            <Link to="/auth/login" className="text-blue-400 hover:text-blue-300">Login</Link>
            <Button className="bg-blue-500 hover:bg-blue-600" onClick={() => navigate("/auth/register")}>Sign Up</Button>
          </> :
          <>
           <ProfileToggle/>
          </>}

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
              className={`hover:text-gray-400 ${location.pathname === item.path ? "text-blue-400" : ""
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

