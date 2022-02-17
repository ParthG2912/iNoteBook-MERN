import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import UserDetail from "./UserDetail";

export const Navbar = () => {
    let location = useLocation();
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    iNotebook
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">
                                About
                            </Link>
                        </li>
                    </ul>
                    {localStorage.getItem("token") ? (
                        <form className="d-flex">
                            {location.pathname !== "/userDetail" && (
                                <Link to="/userDetail" className="btn btn-primary mx-1 d-flex align-item-center">
                                    <i className="m-auto fa-solid fa-user"></i>
                                    <p className="my-auto ms-2">Account</p>
                                </Link>
                            )}
                            <Link
                                to="/login"
                                className="btn btn-primary mx-1 d-flex align-item-center"
                                onClick={() => {
                                    localStorage.removeItem("token");
                                }}>
                                <i className="m-auto fa-solid fa-right-from-bracket"></i>
                                <p className="my-auto ms-2">Logout</p>
                            </Link>
                        </form>
                    ) : (
                        <form className="d-flex">
                            {location.pathname !== "/login" && (
                                <Link to="/login" className="btn btn-primary mx-1" role="button">
                                    Login
                                </Link>
                            )}
                            {location.pathname !== "/signup" && (
                                <Link to="/signup" className="btn btn-primary mx-1" role="button">
                                    Signup
                                </Link>
                            )}
                        </form>
                    )}
                </div>
            </div>
        </nav>
    );
};
