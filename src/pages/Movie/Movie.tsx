import "./Movie.css";
import { useLocation, useParams } from "react-router-dom";
import { AboutMovie, MovieContent, MovieFooter, MovieHeader, MoviePoster } from ".";
import { fetchMovie } from "../../api/fetchMovie";
import { queryClient } from "../../api/queryClient";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../../components/Loader";

export const Movie = () => {
    const location = useLocation();
    const data = location.state ? location.state.data : null;
    const { id } = useParams();

    const movieQuery = useQuery({
        queryFn: () => !data ? fetchMovie(Number(id)) : data,
        queryKey: ["movie", id]
    }, queryClient);

    switch (movieQuery.status) {
        case "pending": return <Loader />;
        case "error": return <div>=ERROR MOVIE=</div>;
        case "success":

            window.scrollTo(0, 0);

            return (
                <section>
                    <div className="movie">
                        <div className="info">
                            <MovieHeader data={movieQuery.data} />
                            <MovieContent data={movieQuery.data} />
                            <MovieFooter isRandom={false} data={movieQuery.data} />
                        </div>
                        <MoviePoster data={movieQuery.data} />
                    </div>
                    <AboutMovie data={movieQuery.data} />
                </section>
            )
    }
}