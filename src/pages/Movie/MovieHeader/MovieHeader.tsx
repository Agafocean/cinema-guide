import "./MovieHeader.css";

interface Param {
    data: any;
    isModal?: boolean;
}

export const MovieHeader = ({ data, isModal }: Param) => {
    const rating = (data.tmdbRating).toFixed(1);
    return (
        <div className={`info-header ${isModal && "info-header-modal"}`}>
            <div className={`info-rating ${rating >= 4 && "info-rating-4"} ${rating >= 6 && "info-rating-6"}
             ${rating >= 7 && "info-rating-7"} ${rating >= 8 && "info-rating-8"} ${isModal && "info-rating-modal"}`}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.00105 12.1733L3.29875 14.8054L4.34897 9.51991L0.392578 5.86118L5.74394 5.22669L8.00105 0.333313L10.2581 5.22669L15.6095 5.86118L11.6531 9.51991L12.7033 14.8054L8.00105 12.1733Z" fill="white" />
                </svg>
                <span>{rating}</span>
            </div>
            <span className="info-year">{data.releaseYear}</span>
            {data.genres.map((genre: string, ind: string) =>
                <span className="info-genre" key={ind}>{genre}</span>)}
            <span className="info-time">
                {Math.floor(data.runtime / 60) + " ч " + data.runtime % 60 + " мин"}
            </span>
        </div>
    )
}
