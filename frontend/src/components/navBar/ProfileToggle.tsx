
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"
import { useAppDispatch } from "@/hooks/reduxHook";
import { logoutAction } from "@/store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/Route";
import { Img } from "../Img";

export function ProfileToggle() {
  const { setTheme } = useTheme()
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
         <Img src="https://avatars.githubusercontent.com/u/77445921?v=4" alt="profile" className="w-8 h-8 rounded-full"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={()=>navigate(ROUTES.PROFILE)}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => dispatch(logoutAction(navigate))}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}