import "./MoviePoster.css";

interface Param {
    data: any;
    isModal?: boolean
}

export const MoviePoster = ({ data, isModal }: Param) => {
    return (
        <div className={`poster ${isModal && "poster-modal"}`}>
            {data.posterUrl && <img src={data.posterUrl} alt="poster" />}
        </div>
    )
}
