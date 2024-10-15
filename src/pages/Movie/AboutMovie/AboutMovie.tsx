import { IMovie } from "../iMovie";
import "./AboutMovie.css";

interface Param {    
    data: IMovie
}

export const AboutMovie = ({data}: Param) => {
    const getLanguage = (code: string) => {
        const lang = new Intl.DisplayNames(['ru'], { type: 'language' });
        return lang.of(code);
    }
    let lang = getLanguage(data.language);
    lang = lang ? lang.charAt(0).toUpperCase() + lang.slice(1) : data.language;

    return (
        <div className="aboutMovie">
            <p className="aboutMovie-header">О фильме </p>
            <div className="aboutMovie-content">
                <div>
                    <span className="aboutMovie-description">Язык оригинала </span>
                    <span>{lang}</span>
                </div>
                <div>
                    <span className="aboutMovie-description">Бюджет </span>
                    <span>{data.budget}</span>
                </div>
                <div>
                    <span className="aboutMovie-description">Выручка </span>
                    <span>{data.revenue}</span>
                </div>
                <div>
                    <span className="aboutMovie-description">Режиссёр </span>
                    <span>{data.director}</span>
                </div>
                <div>
                    <span className="aboutMovie-description">Продакшен </span>
                    <span>{data.production}</span>
                </div>
                <div>
                    <span className="aboutMovie-description">Награды </span>
                    <span>{data.awardsSummary}</span>
                </div>
            </div>

        </div>
    )
}

