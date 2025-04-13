import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHook";
import { LocalStorage } from "@/utils";
import { getCurrentUserAction } from "@/store/auth/authSlice";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ProtectedRoutesProps {
  children: JSX.Element;
}

const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);
  const [checking, setChecking] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const accessToken = LocalStorage.get("accessToken");

  useEffect(() => {
    const verifyUser = async () => {
      if (!accessToken) {
        navigate("/auth");
        return;
      }

      try {
        await dispatch(getCurrentUserAction()).unwrap();
      } catch (error) {
        LocalStorage.clear();
        navigate("/auth");
      } finally {
        setChecking(false);
      }
    };

    verifyUser();
  }, [accessToken, dispatch, navigate]);

  if (loading || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/40">
        <Card className="p-6 flex items-center justify-center shadow-md rounded-2xl">
          <CardContent className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="text-sm text-muted-foreground">Checking authentication...</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  return isAuthenticated ? children : null;
};

export default ProtectedRoutes;
