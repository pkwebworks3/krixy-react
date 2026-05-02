import { useState } from "react";
import "./navbar.css";

function Navbar() {
    const [showPopup, setShowPopup] = useState(false);

    function log_clicked(e) {
        e.preventDefault(); // prevent page reload
        setShowPopup(true);
    }

    function closePopup() {
        setShowPopup(false);
    }

    return (
        <>
            <nav>
                <span>
                    <img src="src/assets/4x/Asset 86logowbg.png" alt="" className="logo" />
                </span>

                <li>
                    <ul><a href="">projects</a></ul>
                    <ul><a href="">about</a></ul>
                    <ul>
                        <a href="" onClick={log_clicked} className="login">
                            login
                        </a>
                    </ul>
                </li>
            </nav>

            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-box">
                        <p>This feature is under development 🚧</p>
                        <button onClick={closePopup}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Navbar;