import { useEffect, useRef, useState } from "react";
import { IMovie } from "../iMovie";
import "./MoviePoster.css";
import { Loader } from "../../../components/Loader";

interface Param {
    data: IMovie;
    isModal?: boolean
}

export const MoviePoster = ({ data, isModal }: Param) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const posterImg = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (posterImg.current?.complete) {
            setIsLoaded(true)
        }
        else {
            setIsLoaded(false)
        }
    }, [data.id]);

    if (data.posterUrl)
        return (
            <div className={`poster ${isModal && "poster-modal"} `}>
                {!isLoaded && <Loader />}
                {data.posterUrl && <img className={`poster-img ${!isLoaded && "poster-loaded"}`}
                    src={data.posterUrl} onLoad={() => setIsLoaded(true)} alt="poster"
                    ref={posterImg}
                />}
            </div>
        )
    else return (
        <div className={`noposter ${isModal && "poster-modal"} `}>
            {!isModal && <p className="genreMovies-title">{data.title}</p>}
            {!isModal && <p>Poster is coming</p>}
        </div>
    )
}
