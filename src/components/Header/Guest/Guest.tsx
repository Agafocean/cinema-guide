import { useDispatch } from "react-redux";
import "./Guest.css";
import { Link, useLocation } from "react-router-dom";
import { saveActiveModal } from "../../../store/reducer";

export const Guest = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    return (
        <Link className="header-guest" to={"/login"} state={{ previousLocation: location }}
            onClick={() => dispatch(saveActiveModal(true))}
        >
            Войти
        </Link>
    )
}