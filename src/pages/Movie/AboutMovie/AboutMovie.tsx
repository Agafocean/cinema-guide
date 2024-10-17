import { IMovie } from "../iMovie";
import "./AboutMovie.css";

interface Param {    
    data: IMovie
}

export const AboutMovie = ({data}: Param) => {
    const getLanguage = (code: string) => {
        const lang = new Intl.DisplayNames(['en'], { type: 'language' });
        return lang.of(code);
    }
    let lang = getLanguage(data.language);
    lang = lang ? lang.charAt(0).toUpperCase() + lang.slice(1) : data.language;

    return (
        <div className="aboutMovie">
            <p className="aboutMovie-header">About </p>
            <div className="aboutMovie-content">
                <div>
                    <span className="aboutMovie-description">Language </span>
                    <span>{lang}</span>
                </div>
                <div>
                    <span className="aboutMovie-description">Budget </span>
                    <span>{data.budget}</span>
                </div>
                <div>
                    <span className="aboutMovie-description">Revenue </span>
                    <span>{data.revenue}</span>
                </div>
                <div>
                    <span className="aboutMovie-description">Director </span>
                    <span>{data.director}</span>
                </div>
                <div>
                    <span className="aboutMovie-description">Production </span>
                    <span>{data.production}</span>
                </div>
                <div>
                    <span className="aboutMovie-description">Awards </span>
                    <span>{data.awardsSummary}</span>
                </div>
            </div>

        </div>
    )
}

