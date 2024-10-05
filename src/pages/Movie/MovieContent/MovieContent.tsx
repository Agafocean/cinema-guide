import "./MovieContent.css";

export const MovieContent = ({ data }: any) => {
    return (<>
        <p className="info-title">{data.title}</p>
        <p className="info-plot">{data.plot}</p>
    </>
    )
}
