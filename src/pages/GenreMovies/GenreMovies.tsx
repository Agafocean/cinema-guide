import { useQuery } from "@tanstack/react-query";
import "./GenreMovies.css";
import { queryClient } from "../../api/queryClient";
import { fetchFiltered } from "../../api/fetchFiltered";
import { Link, useParams } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { LoaderBottom } from "../../components/LoaderBottom";
import { IMovie } from "../Movie/iMovie";


const count = 10;

export const GenreMovies = () => {
    const [genreMovies, setGenreMovies] = useState<Array<IMovie>>([]);
    const { genre } = useParams();
    const [pageN, setPageN] = useState(0);

    async function getGenreMovies() {
        setPageN(p => p + 1);
        const movies = await fetchFiltered({ count: count, page: pageN, genre: genre });
        setGenreMovies(p => p.concat(movies.sort((a: IMovie, b: IMovie) => b.tmdbRating - a.tmdbRating)));
        return movies
    }

    const genreMoviesQuery = useQuery({
        queryFn: () => getGenreMovies(),
        queryKey: ["genreMovies", genre]
    }, queryClient);

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
                        <InfiniteScroll
                            dataLength={genreMovies.length}
                            next={() => queryClient.invalidateQueries({ queryKey: ["genreMovies", genre] })}
                            hasMore={true} // Replace with a condition based on your data source
                            loader={<LoaderBottom />}
                            endMessage={<p style={{ textAlign: "center" }}>THE END</p>}
                        >
                            <div className="genreMovies-posters">
                                {genreMovies
                                    .map((res: IMovie, ind: number) => {
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
                        </InfiniteScroll>
                    </div>
                </section>
            )
        }
    }
}