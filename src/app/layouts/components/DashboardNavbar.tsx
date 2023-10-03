import { useState } from "react";
import { StyledLink } from "@shared/ui/Link";
import { HamburgerMenu, NavbarContainer } from "./DashboardNavbar.styled";
import { DashboardTutorial } from "@/app/features/Dashboard/components/tutorial/DashboardTutorial";
import { HamburgerIconWrapper } from "./Navbar.styled";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";

export const DashboardNavbar = () => {
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);

  return (
    <>
      <NavbarContainer>
        <StyledLink to="/" className="mb-4">
          Studify
        </StyledLink>

        <StyledLink to="/dashboard" className="mb-4">
          Home
        </StyledLink>

        <DashboardTutorial />

        <StyledLink to="/dashboard/notifications">
          <NotificationsActiveOutlinedIcon className="w-4 h-4" /> Notifications
        </StyledLink>

        <StyledLink to="">
          <SettingsOutlinedIcon className="w-4 h-4" /> Settings
        </StyledLink>

        <StyledLink to="">
          <SupportAgentOutlinedIcon className="w-4 h-4" /> Support
        </StyledLink>

        <HamburgerIconWrapper>
          <MenuIcon onClick={() => setShowHamburgerMenu(!showHamburgerMenu)} />
        </HamburgerIconWrapper>
      </NavbarContainer>
      {showHamburgerMenu && (
        <HamburgerMenu>
          <StyledLink to="/" className="mb-4">
            Studify
          </StyledLink>
          <StyledLink to="">
            <NotificationsActiveOutlinedIcon className="w-4 h-4" />
            Notifications
          </StyledLink>
          <StyledLink to="">
            <SettingsOutlinedIcon className="w-4 h-4" /> Settings
          </StyledLink>
          <StyledLink to="">
            <SupportAgentOutlinedIcon className="w-4 h-4" />
            Support
          </StyledLink>
        </HamburgerMenu>
      )}
    </>
  );
};
