import { IMovie } from "../iMovie";
import "./MoviePoster.css";

interface Param {
    data: IMovie;
    isModal?: boolean
}

export const MoviePoster = ({ data, isModal }: Param) => {
    /*  return (
          <div className={`poster ${isModal && "poster-modal"}`}>
              {data.posterUrl && <img src={data.posterUrl} alt="poster" />}
          </div>*/

    if (data.posterUrl)
        return (
            <div className={`poster ${isModal && "poster-modal"}`}>
                {data.posterUrl && <img src={data.posterUrl} alt="poster" />}
            </div>
        )
    else return (
        <div className="noposter">
            <p className="genreMovies-title">{data.title}</p>
            <p>Poster is coming</p>
        </div>
    )
}
