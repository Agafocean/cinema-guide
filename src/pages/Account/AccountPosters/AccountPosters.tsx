import { useMutation, useQuery } from "@tanstack/react-query"
import "./AccountPosters.css";
import { Link } from "react-router-dom";
import { fetchFavorites } from "../../../api/fetchFavorites";
import { queryClient } from "../../../api/queryClient";
import { Loader } from "../../../components/Loader";
import { delFavorite } from "../../../api/fetchDelFavorite";
import { Profile, RootState, saveProfile } from "../../../store/reducer";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { IMovie } from "../../Movie/iMovie";

export const AccountPosters = () => {
    const profile = useSelector<RootState, Profile>(state => state.profile);
    const dispatch = useDispatch();
    const [id, setId] = useState("")

    const favoritesQuery = useQuery({
        queryFn: () => fetchFavorites(),
        queryKey: ["favorites"]
    }, queryClient)

    const delFavoriteMutation = useMutation({
        mutationFn: () => delFavorite(id),
        onSuccess() {
            const indFavorite = profile.favorites.indexOf(id)
            profile.favorites.splice(indFavorite, 1);
            dispatch(saveProfile(profile));
            queryClient.invalidateQueries({ queryKey: ["favorites"] })
        }
    }, queryClient);

    switch (favoritesQuery.status) {
        case "pending": return <Loader />;
        case "error": return <div>=ERROR FAVORITES=</div>;
        case "success": {
            return (
                <div className="account-posters">
                    {favoritesQuery.data.map((res: IMovie, ind: number) => {
                        return <div className="account-item" key={ind}>
                            {res.posterUrl ?
                                <Link to={`/movie/${res.id}`} state={{ data: res }}>
                                    <img src={res.posterUrl} title={res.title} />
                                </Link>
                                :
                                <Link to={`/movie/${res.id}`} state={{ data: res }}>
                                    <div className="account-noposter">
                                        <p className="account-title">{res.title}</p>
                                        <p>Poster is coming</p>
                                    </div>
                                </Link>
                            }

                            {delFavoriteMutation.isPending && <Loader />}

                            <button className="delFavorite" onClick={() => {
                                setId(String(res.id));
                                delFavoriteMutation.mutate()
                            }}>
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="48" height="48" rx="24" fill="white" />
                                    <path d="M22.5859 24L14.793 16.2071L16.2072 14.7928L24.0001 22.5857L31.793 14.7928L33.2072 16.2071L25.4143 24L33.2072 31.7928L31.793 33.2071L24.0001 25.4142L16.2072 33.2071L14.793 31.7928L22.5859 24Z" fill="black" />
                                </svg>
                            </button>
                        </div>
                    }
                    )}
                </div >
            )
        }
    }
}