import { useState, useEffect } from "react";
import Face6Icon from '@mui/icons-material/Face6';
import Logo from "../ui/Logo";
import MenuItem from "./MenuItem";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
    const [isScrollY, setIsScrollY] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Detect scroll
    useEffect(() => {
        const handleScroll = () => setIsScrollY(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`text-[#e6eef8] transition-all duration-500 h-16 flex justify-between items-center ${!isScrollY ? "bg-[#1a2536] border-b border-blue-500" : ""
                } px-4 md:px-10`}
        >
            {/* Left side: Hamburger + Logo */}
            <div className="flex items-center gap-4">
                {/* Hamburger for mobile */}
                <div
                    className="flex flex-col gap-1 cursor-pointer md:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <span className="border w-6 block"></span>
                    <span className="border w-5 block"></span>
                    <span className="border w-4 block"></span>
                </div>

                {/* Logo */}
                <div className="md:w-fit">
                    <Logo />
                </div>
            </div>

            {/* Right side: Desktop Menu + Search */}
            <div className="flex items-center gap-4">
                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-4 items-center">
                    <Link to={'/'}>
                        <MenuItem>Home</MenuItem>

                    </Link>
                    <Link to={'/bookmarks'}>
                        <MenuItem>Bookmarks</MenuItem>
                    </Link>
                    <Link to={'/login'}>
                        <MenuItem>
                            <Face6Icon className="w-5 h-5 mr-1 inline-block" />
                            Login
                        </MenuItem>
                    </Link>
                </ul>


            </div>

            {/* Mobile Menu Drawer */}
            <div
                className={`fixed top-0 left-0 w-full h-full bg-[#1a2536] z-50 flex flex-col p-6 gap-6 md:hidden transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <ul className="flex flex-col gap-4">
                    <Link to={'/'}>
                        <MenuItem onClick={() => setMobileMenuOpen(false)}>Home</MenuItem>
                    </Link>
                    <Link to={'/bookmarks'}>
                        <MenuItem onClick={() => setMobileMenuOpen(false)}>Bookmarks</MenuItem>

                    </Link>
                    <Link to={'/login'}>
                        <MenuItem onClick={() => setMobileMenuOpen(false)}>
                            <Face6Icon className="w-5 h-5 mr-1 inline-block" />
                            Login
                        </MenuItem>
                    </Link>

                </ul>


            </div>
        </header>
    );
};

export default Header;
