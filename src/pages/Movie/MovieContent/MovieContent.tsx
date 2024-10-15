import { IMovie } from "../iMovie";
import "./MovieContent.css";

interface Param {    
    data: IMovie
}

export const MovieContent = ({ data }: Param) => {
    return (<>
        <p className="info-title">{data.title}</p>
        <p className="info-plot">{data.plot}</p>
    </>
    )
}
