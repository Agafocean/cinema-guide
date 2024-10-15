import { useQuery } from "@tanstack/react-query"
import { queryClient } from "../../../api/queryClient"
import { fetchTop10 } from "../../../api/fetchTop10"
import "./Top10.css";
import { Link } from "react-router-dom";
import { Loader } from "../../../components/Loader";
import { IMovie } from "../../Movie/iMovie";

export const Top10 = () => {
    const top10Query = useQuery({
        queryFn: () => fetchTop10(),
        queryKey: ["top10"]
    }, queryClient);

    switch (top10Query.status) {
        case "pending": return <Loader />;
        case "error": return <div>=ERROR TOP10=</div>;
        case "success": {
            return (
                <section>
                    <div className="top10">
                        <p className="top10-header">Топ 10 фильмов</p>
                        <div className="top10-posters">
                            {top10Query.data.map((res: IMovie, ind: number) => {
                                if (res.posterUrl)
                                    return (
                                        <Link to={`/movie/${res.id}`} className="top10-item" key={ind}
                                            state={{ data: res }}>
                                            <img src={res.posterUrl} title={res.title} />
                                        </Link>
                                    )
                                else return (
                                    <Link to={`/movie/${res.id}`} className="top10-item" key={ind}
                                        state={{ data: res }}>
                                        <div className="top10-noposter">
                                            <p className="top10-title">{res.title}</p>
                                            <p>Poster is coming</p>
                                        </div>
                                    </Link>
                                )
                            }
                            )}
                        </div>
                    </div>
                </section>
            )
        }
    }
}