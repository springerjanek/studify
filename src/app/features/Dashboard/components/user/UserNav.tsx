import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetUserName } from "../../data-access/getUserName.query";
import { useAuth } from "@/app/shared/utils/auth";

export const UserNav = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const { data } = useGetUserName(currentUser.id);

  const userName = data ? data[0].name : "User";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-11 w-11 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src="https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png"
              alt="User Image"
            />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              Hello, {userName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {currentUser.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate("/dashboard/profile")}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => navigate("/dashboard/notifications")}
          >
            Notifications
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/dashboard/settings")}>
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
