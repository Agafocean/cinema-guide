import { useQuery } from "@tanstack/react-query"
import { Loader } from "../../../components/Loader"
import { queryClient } from "../../../api/queryClient"
import "./GenrePoster.css";
import { fetchFiltered } from "../../../api/fetchFiltered";
import { FC } from "react";

type Genres = {
    genre: string;
    page: number
}

export const GenrePoster: FC<Genres> = ({ genre, page }) => {
    const genrePosterQuery = useQuery({
        queryFn: () => fetchFiltered({ count: 1, page: page * 3, genre: genre }),
        queryKey: ["genrePoster", genre]
    }, queryClient)

    switch (genrePosterQuery.status) {
        case "pending": return <Loader />;
        case "error": return <div>=ERROR FILTERED=</div>;
        case "success": {
            const srcPoster = genrePosterQuery.data[Math.floor(Math.random() * (genrePosterQuery.data.length - 1))].posterUrl;
            if (srcPoster)
                return (
                    <div className="genre-poster">
                        <img src={srcPoster} />
                    </div>
                )
            else return (
                <p className="genre-title">Poster is coming</p>
            )
        }
    }
}