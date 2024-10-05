import { useDispatch, useSelector } from "react-redux";
import "./AccountInfo.css";
import { Profile, RootState, saveProfile } from "../../../store/reducer";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../../api/fetchLogout";
import { queryClient } from "../../../api/queryClient";
import { MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../../components/Loader";

export const AccountInfo = () => {
    const profile = useSelector<RootState, Profile>(state => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutMutation = useMutation({
        mutationFn: () => logout(),
        onSuccess() {
            dispatch(saveProfile({ email: "", favorites: [], name: "", surname: "" }));
            navigate("/")
        }
    }, queryClient)

    const handleLogout: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        logoutMutation.mutate();
    };

    return (
        <>
            <div className="account-info">
                <div className="info-item">
                    <div className="info-icon">
                        <div className="info-icon-in">
                            <p className="info-name-value">
                                {profile.name.charAt(0) + profile.surname.charAt(0)}
                            </p>
                        </div>
                    </div>
                    <div className="info-name">
                        <p className="info-name-title">Имя Фамилия</p>
                        <p className="info-name-value">{profile.name} {profile.surname}</p>
                    </div>
                </div>
                <div className="info-item">
                    <div className="info-icon">
                        <div className="info-icon-in">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 3C21.5523 3 22 3.44772 22 4V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V19H20V7.3L12 14.5L2 5.5V4C2 3.44772 2.44772 3 3 3H21ZM8 15V17H0V15H8ZM5 10V12H0V10H5ZM19.5659 5H4.43414L12 11.8093L19.5659 5Z" fill="white" />
                            </svg>
                        </div>
                    </div>
                    <div className="info-name">
                        <p className="info-name-title">Электронная почта</p>
                        <p className="info-name-value">{profile.email}</p>
                    </div>
                </div>
            </div>

            {logoutMutation.isPending && <Loader />}

            <button className="info-button" type="button" onClick={handleLogout}>
                Выйти из аккаунта
            </button>
        </>
    )
}    
