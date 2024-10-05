import { useQuery } from "@tanstack/react-query"
import { queryClient } from "../../api/queryClient"
import { fetchGenres } from "../../api/fetchGenres"
import "./Genres.css";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { GenrePoster } from ".";

export const Genres = () => {
    const genresQuery = useQuery({
        queryFn: () => fetchGenres(),
        queryKey: ["genres"]
    }, queryClient)

    switch (genresQuery.status) {
        case "pending": return <Loader />;
        case "error": return <div>=ERROR GENRES=</div>;
        case "success": {
            return (
                <section>
                    <div className="genres">
                        <p className="genres-header">Жанры фильмов</p>
                        <div className="genres-list">
                            {genresQuery.data.map((res: string, ind: number) =>
                                <Link to={`/genres/${res}/0`} className="genres-item" key={ind}>
                                    <GenrePoster genre={res} page={ind} />
                                    <p className="genres-name">{res.charAt(0).toUpperCase() + res.slice(1)}</p>
                                </Link>
                            )}
                        </div>
                    </div>
                </section>
            )
        }
    }
}