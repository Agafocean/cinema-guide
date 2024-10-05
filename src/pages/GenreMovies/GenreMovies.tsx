import { useQuery } from "@tanstack/react-query";
import "./GenreMovies.css";
import { queryClient } from "../../api/queryClient";
import { fetchFiltered } from "../../api/fetchFiltered";
import { Link, useParams } from "react-router-dom";
import { Loader } from "../../components/Loader";

const count = 10;

export const GenreMovies = () => {
    const { genre, page } = useParams();
    const pageN = Number(page);
    const genreMoviesQuery = useQuery({
        queryFn: () => fetchFiltered({ count: count, page: pageN, genre: genre }),
        queryKey: ["genreMovies", pageN, genre]
    }, queryClient)

    switch (genreMoviesQuery.status) {
        case "pending": return <Loader />;
        case "error": return <div>=ERROR GENREMOVIES=</div>;
        case "success": {
            return (
                <section>
                    <div className="genreMovies">
                        <div className="genreMovies-header">
                            <Link to={"/genres"}><span className="genreMovies-toGenres">{"<"}</span></Link>
                            <span>{genre && genre.charAt(0).toUpperCase() + genre.slice(1)}</span>
                        </div>
                        <div className="genreMovies-posters">
                            {genreMoviesQuery.data.sort((a: any, b: any) => b.tmdbRating - a.tmdbRating)
                                .map((res: any, ind: string) => {
                                    if (res.posterUrl)
                                        return (
                                            <Link to={`/movie/${res.id}`} className="genreMovies-item" key={ind}
                                                state={{ data: res }}>
                                                <img src={res.posterUrl} />
                                            </Link>
                                        )
                                    else return (
                                        <Link to={`/movie/${res.id}`} className="genreMovies-item" key={ind}
                                            state={{ data: res }}>
                                            <div className="genreMovies-noposter">
                                                <p className="genreMovies-title">{res.title}</p>
                                                <p>Poster is coming</p>
                                            </div>
                                        </Link>
                                    )
                                }
                                )}
                        </div>
                        <div className="genreMovies-change">
                            <Link to={`/genres/${genre}/${pageN - 1}`} >
                                <button className="genreMovies-prev" type="button"
                                    disabled={pageN === 0}>{"< Prev"}</button>
                            </Link>
                            <Link to={`/genres/${genre}/${pageN + 1}`} >
                                <button className="genreMovies-next" type="button"
                                    disabled={genreMoviesQuery.data.length < count}>{"Next >"}</button>
                            </Link>
                        </div>
                    </div>
                </section>
            )
        }
    }
}