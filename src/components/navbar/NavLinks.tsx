import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const categories = [
  { label: "Gyms", path: "/search?category=gyms" },
  { label: "Yoga Studios", path: "/search?category=yoga" },
  { label: "Sports Centers", path: "/search?category=sports" },
  { label: "Wellness Centers", path: "/search?category=wellness" },
];

const quickLinks = [
  { label: "Near Me", path: "/search?nearby=true" },
  { label: "Browse All", path: "/search" },
  { label: "About Us", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export const NavLinks = () => {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-white/70 hover:text-white">
            Categories
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-48 gap-2 p-4 bg-white/10 backdrop-blur-md">
              {categories.map((category) => (
                <li key={category.label}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={category.path}
                      className="block px-2 py-1 text-white/70 hover:text-white transition-colors"
                    >
                      {category.label}
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {quickLinks.map((link) => (
          <NavigationMenuItem key={link.label}>
            <Link
              to={link.path}
              className="block px-4 py-2 text-white/70 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};