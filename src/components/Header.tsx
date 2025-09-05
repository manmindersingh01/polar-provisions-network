import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X, Triangle as AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { BlizzardEffect } from "./BlizzardEffect";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
  { path: "/", label: "Home" },
  { path: "/weather", label: "Weather" },
  { path: "/supplies", label: "Supplies" },
  { path: "/research", label: "Research" },
  { path: "/guides", label: "Guides" },
  { path: "/data", label: "Data" },
  { path: "/communication", label: "Communication" }];


  return (
    <header className="relative bg-secondary shadow-md">
      <BlizzardEffect />
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-white">
              Polar Provisions Network
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) =>
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
              cn(
                "px-3 py-2 rounded-md transition-colors",
                isActive ?
                "bg-primary text-primary-foreground" :
                "text-white hover:bg-secondary-700"
              )
              }>

                {item.label}
              </NavLink>
            )}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/emergency">
              <Button
                variant="default"
                className="bg-accent hover:bg-accent-700 text-white">

                <AlertTriangle className="mr-2 h-4 w-4" />
                Emergency
              </Button>
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="text-white"
              onClick={toggleMenu}>

              {isMenuOpen ?
              <X className="h-6 w-6" /> :

              <Menu className="h-6 w-6" />
              }
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen &&
        <nav className="md:hidden mt-4 pb-4 space-y-2">
            {navItems.map((item) =>
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
            cn(
              "block px-3 py-2 rounded-md transition-colors",
              isActive ?
              "bg-primary text-primary-foreground" :
              "text-white hover:bg-secondary-700"
            )
            }>

                {item.label}
              </NavLink>
          )}
            <Link
            to="/emergency"
            onClick={() => setIsMenuOpen(false)}
            className="block mt-4">

              <Button
              variant="default"
              className="w-full bg-accent hover:bg-accent-700 text-white">

                <AlertTriangle className="mr-2 h-4 w-4" />
                Emergency
              </Button>
            </Link>
          </nav>
        }
      </div>
    </header>);

}