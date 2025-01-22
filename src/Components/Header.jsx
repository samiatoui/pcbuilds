import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen((prev) => !prev);

    return (
        <header className="header">
            <div className="header-content">
                <h1>Test</h1>

                {/* Hamburger Icon */}
                <button
                    className="hamburger"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >☰</button>

                {/* Mobile Menu */}
                <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
                    <ul>
                        <li>
                            <Link to="/" onClick={() => setMenuOpen(false)}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="contact" onClick={() => setMenuOpen(false)}>
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Desktop Menu */}
                <div className="desktop-menu">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="contact">Contact</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;
