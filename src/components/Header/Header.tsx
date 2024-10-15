import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { Profile, RootState, saveActiveModal } from "../../store/reducer";
import { Guest } from "./Guest";
import { User } from "./User";
import { FormEventHandler, useEffect, useState } from "react";

export const Header = () => {
    const profile = useSelector<RootState, Profile>(state => state.profile);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [disableInput, setDisableInput] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const search = location.pathname.replace("/search/", "").replaceAll("%20", " ");
    const [searchInable, setSearchInable] = useState(false);

    useEffect(() => {
        if (location.pathname.includes("/search/")) {
            setSearchValue(search)
        }
        else {
            setDisableInput(false);
        }
    }, [search]);

    const handleSearch: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        if (searchValue) {
            dispatch(saveActiveModal(true));
            navigate(`/search/${searchValue}`, { state: { previousLocation: location } })
            setDisableInput(true);
        }
    }

    return (
        <div className="header">
            {!searchInable &&
                <Link to={"/"}>
                    <img className="header-logo" src="\logo.svg" alt="logo" />
                </Link>}

            <div className="header-wtd">
                {!searchInable && <>
                    <Link className={`header-main ${location.pathname === "/" && "underline"}`}
                        to={"/"}>Главная</Link>
                    <Link className={`header-genres ${location.pathname === "/genres" && "underline"}`}
                        to={"/genres"}>Жанры</Link>
                    <Link className="header-genres-icon" to={"/genres"}>
                        <img src="\genres.svg" alt="genres"></img>
                    </Link>
                </>}

                <form className={searchInable ? "search-inable" : "search"} onSubmit={handleSearch}>
                    <input className="header-search" type="search" placeholder="Поиск" disabled={disableInput}
                        onChange={(event) => { setSearchValue(event.target.value) }}
                        value={searchValue}
                    />

                    <svg className="input-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                        onClick={() => { setSearchInable(false) }}>
                        <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
                            fill="white" fillOpacity="0.5" />
                    </svg>
                </form>

                {!searchInable &&
                    <a className="header-search-icon" onClick={() => {
                        setSearchInable(true);
                    }}>
                        <img src="\search1.svg" alt="search"></img>
                    </a>}

                {!searchInable &&
                    <button className="header-user-icon" onClick={() => {
                        if (profile.email) navigate("/account")
                        else {
                            dispatch(saveActiveModal(true));
                            navigate("/login", { state: { previousLocation: location } })
                        }
                    }}>
                        <img src="\user.svg" alt="user"></img>
                    </button>}
            </div>

            {profile.email ? <User /> : <Guest />}

        </div >
    )
}



