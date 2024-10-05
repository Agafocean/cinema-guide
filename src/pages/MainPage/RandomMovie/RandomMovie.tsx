import { useQuery } from "@tanstack/react-query"
import "./RandomMovie.css";
import { fetchRandom } from "../../../api/fetchRandom";
import { queryClient } from "../../../api/queryClient";
import { Loader } from "../../../components/Loader";
import { MovieContent, MovieFooter, MovieHeader, MoviePoster } from "../../Movie";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducer";

export const RandomMovie = () => {
    const randomMovie = useSelector<RootState, any>(state => state.randomMovie);

    const movieQuery = useQuery({
        queryFn: () => !randomMovie.id ? fetchRandom() : randomMovie,
        queryKey: ["randomMovie", randomMovie.id]
    }, queryClient);

    switch (movieQuery.status) {
        case "pending": return <Loader />;
        case "error": return <div>=ERROR RANDOM-MOVIE=</div>;
        case "success":
            return (
                <section>
                    <div className="movie">
                        <div className="info">
                            <MovieHeader data={movieQuery.data} />
                            <MovieContent data={movieQuery.data} />
                            <MovieFooter isRandom={true} data={movieQuery.data} />
                        </div>
                        <MoviePoster data={movieQuery.data} />
                    </div>
                </section>
            )
    }
}