import DashboardSidebar from "@/components/DashboardSidebar";
import { Outlet } from "react-router-dom";
import {
  Users,
  Stethoscope,
  Palette,
  Building2,
  Scale,
  MoreHorizontal,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { getStudentDataAction } from "@/store/auth/studentSlice";

export interface Category {
  id: number;
  name: string;
  icon: JSX.Element;
  path: string;
}

const Home = () => {
  const [activeCategory, setActiveCategory] = useState<number>(1);
  const dispatch = useAppDispatch();

  const { user, isAuthenticated, loading, error } = useAppSelector(
    (state) => state.auth
  );
  const { student, studentEducation } = useAppSelector(
    (state) => state.student
  );
  console.log("student", student);

  useEffect(() => {
    dispatch(getStudentDataAction());
  }, [dispatch]);

  const categories: Category[] = [
    {
      id: 1,
      name: "All",
      icon: <Building2 className="w-5 h-5" />,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Engineering Colleges",
      icon: <Users className="w-5 h-5" />,
      path: "/dashboard/engineering",
    },
    {
      id: 3,
      name: "Medical Colleges",
      icon: <Stethoscope className="w-5 h-5" />,
      path: "/dashboard/medical",
    },
    {
      id: 4,
      name: "Management Colleges",
      icon: <Palette className="w-5 h-5" />,
      path: "/dashboard/management",
    },
    {
      id: 5,
      name: "Commerce Colleges",
      icon: <Building2 className="w-5 h-5" />,
      path: "/dashboard/commerce",
    },
    {
      id: 6,
      name: "Law Colleges",
      icon: <Scale className="w-5 h-5" />,
      path: "/dashboard/law",
    },
    {
      id: 7,
      name: "Other Colleges",
      icon: <MoreHorizontal className="w-5 h-5" />,
      path: "#",
    },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <DashboardSidebar
        categories={categories}
        setActiveCategory={setActiveCategory}
        activeCategory={activeCategory}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 ">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
