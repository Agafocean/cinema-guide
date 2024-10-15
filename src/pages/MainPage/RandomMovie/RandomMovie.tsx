import { useQuery } from "@tanstack/react-query"
import "./RandomMovie.css";
import { fetchRandom } from "../../../api/fetchRandom";
import { queryClient } from "../../../api/queryClient";
import { Loader } from "../../../components/Loader";
import { MovieContent, MovieFooter, MovieHeader, MoviePoster } from "../../Movie";
import { useDispatch, useSelector } from "react-redux";
import { RootState, saveRandomMovie } from "../../../store/reducer";
import { IMovie } from "../../Movie/iMovie";

export const RandomMovie = () => {
    const dispatch = useDispatch();
    const randomMovie = useSelector<RootState, IMovie>(state => state.randomMovie);   

    const movieQuery = useQuery({
        queryFn: async () => !randomMovie.id && dispatch(saveRandomMovie(await fetchRandom())), 
        queryKey: ["randomMovie"]
    }, queryClient);

    switch (movieQuery.status) {
        case "pending": return <Loader />;
        case "error": return <div>=ERROR RANDOM-MOVIE=</div>;
        case "success":

            return (
                <section>
                    <div className="movie">
                        <div className="info">
                            <MovieHeader data={randomMovie} />
                            <MovieContent data={randomMovie} />
                            <MovieFooter isRandom={true} data={randomMovie} />
                        </div>
                        <MoviePoster data={randomMovie} />
                    </div>
                </section>
            )
    }
}