import { useNavigate } from "react-router-dom";
import "./User.css";
import { useSelector } from "react-redux";
import { Profile, RootState } from "../../../store/reducer";

export const User = () => {
    const navigate = useNavigate();
    const profile = useSelector<RootState, Profile>(state => state.profile);
    return (
        <button className="header-user" onClick={() => navigate("/account")}>
            {profile.surname}
        </button>
    )
}