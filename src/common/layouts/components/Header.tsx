import { Avatar } from "@/common/components/ui/Avater";
import { useUserProfile } from "@/core/users/services/users-query";
import { logger } from "@/lib/logger";
import { Link } from "react-router";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/editor", label: "Editor" },
];

export const Header = () => {
  const { data } = useUserProfile();
  logger.log("User profile data in header", data);
  return (
    <header className="bg-primary p-4 text-white">
      <div className="relative flex items-center justify-between">
        <Link to="/" className="text-2xl">
          Logo
        </Link>

        <nav className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          {navLinks.map(link => (
            <Link key={link.label} to={link.to} className="mr-4 text-white">
              {link.label}
            </Link>
          ))}
        </nav>

        <div>
          <Avatar />
        </div>
      </div>
    </header>
  );
};
