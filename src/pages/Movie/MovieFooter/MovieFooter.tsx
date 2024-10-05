import { Link, useLocation, useNavigate } from "react-router-dom";
import "./MovieFooter.css";
import { queryClient } from "../../../api/queryClient";
import { useDispatch, useSelector } from "react-redux";
import { Profile, RootState, saveActiveModal, saveProfile, saveRandomMovie } from "../../../store/reducer";
import { useEffect, useState } from "react";
import { addFavorite } from "../../../api/fetchAddFavorite";
import { delFavorite } from "../../../api/fetchDelFavorite";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "../../../components/Loader";

interface Param {
    isRandom: boolean;
    data: any
}

export const MovieFooter = ({ isRandom, data }: Param) => {
    const profile = useSelector<RootState, Profile>(state => state.profile);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [fillColor, setFillColor] = useState("#333333");
    const [strokeColor, setStrokeColor] = useState("#FFFFFF");
    const id = data.id;

    useEffect(() => {
        isRandom && dispatch(saveRandomMovie(data));
        if (profile.favorites.includes(id)) {
            setFillColor("#B4A9FF");
            setStrokeColor("#B4A9FF");
        }
        else {
            setFillColor("#333333");
            setStrokeColor("#FFFFFF");
        }
    }, [id]);

    const addFavoriteMutation = useMutation({
        mutationFn: () => addFavorite(id),
        onSuccess() {
            profile.favorites.push(id);
            dispatch(saveProfile(profile));
            setFillColor("#B4A9FF");
            setStrokeColor("#B4A9FF");
        }
    }, queryClient);

    const delFavoriteMutation = useMutation({
        mutationFn: () => delFavorite(id),
        onSuccess() {
            const indFavorite = profile.favorites.indexOf(id)
            profile.favorites.splice(indFavorite, 1);
            dispatch(saveProfile(profile));
            setFillColor("#333333");
            setStrokeColor("#FFFFFF");
        }
    }, queryClient);

    function handleFavorites() {
        if (!profile.email) {
            dispatch(saveActiveModal(true));
            navigate("/login", { state: { previousLocation: location } });
        }
        else {
            if (profile.favorites.includes(id)) {
                delFavoriteMutation.mutate()
            }
            else {
                addFavoriteMutation.mutate()
            }
        }
    }

    return (
        <div className="info-footer">
            <Link to={`/trailer/${data.trailerYouTubeId}`} state={{ previousLocation: location }}
                className={isRandom ? "info-trailer-R" : ""} >
                <button className={isRandom ? "info-trailer info-trailer-R" : "info-trailer"}
                    type="button" onClick={() => dispatch(saveActiveModal(true))}>
                    Трейлер
                </button>
            </Link>

            <Link to={`/movie/${id}`} state={{ data: data }}>
                {isRandom && <button className="info-about" type="button">О фильме</button>}
            </Link>

            {(addFavoriteMutation.isPending || delFavoriteMutation.isPending) && <Loader />}

            <button className="info-icon" onClick={handleFavorites}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3Z"
                        fill={fillColor} stroke={strokeColor} strokeWidth={2} />
                </svg>
            </button>

            {
                isRandom &&
                <button className="info-icon" onClick={() => { dispatch(saveRandomMovie({})) }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 4C14.7486 4 17.1749 5.38626 18.6156 7.5H16V9.5H22V3.5H20V5.99936C18.1762 3.57166 15.2724 2 12 2C6.47715 2 2 6.47715 2 12H4C4 7.58172 7.58172 4 12 4ZM20 12C20 16.4183 16.4183 20 12 20C9.25144 20 6.82508 18.6137 5.38443 16.5H8V14.5H2V20.5H4V18.0006C5.82381 20.4283 8.72764 22 12 22C17.5228 22 22 17.5228 22 12H20Z" fill="white" />
                    </svg>
                </button>
            }
        </div >
    )
}
