import ReactPlayer from 'react-player/youtube';
import './Trailer.css';
import { useDispatch } from 'react-redux';
import { saveActiveModal } from '../../store/reducer';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

export const Trailer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const previousPath = location.state?.previousLocation.pathname;
    const [playing, setPlaying] = useState(true);
    const [muted, setMuted] = useState(true);
    const [fullscreen, setFullscreen] = useState(false);

    return (
        <div className={` ${fullscreen ? "trailer-container-fullscreen" : "trailer-container"}`} >
            <div className={` ${fullscreen ? "trailer-fullscreen" : "trailer"}`}
                onClick={() => setPlaying(!playing)}>

                <ReactPlayer className="player" url={`https://www.youtube.com/watch?v=${id}`}
                    width="100%" height="100%" playing={playing} muted={muted}
                />

                {/*playing && <svg className='player-btn' width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="80" height="80" rx="40" fill="white" />
                    <path d="M30 25H33.3333V55H30V25ZM46.6667 25H50V55H46.6667V25Z" fill="black" />
                </svg>*/}

                {/*!playing && <svg className='player-btn' width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="80" height="80" rx="40" fill="white" />
                    <path d="M30 53.6595V26.3404C30 25.0313 31.4399 24.2332 32.55 24.927L54.4053 38.5867C55.4498 39.2393 55.4498 40.7605 54.4053 41.4133L32.55 55.0728C31.4399 55.7667 30 54.9687 30 53.6595Z" fill="black" />
                </svg>*/}
            </div>

            <div className={` ${fullscreen ? "btns-control-fullscreen" : "btns-control"}`}>
                <button className="player-volume"
                    onClick={() => setMuted(!muted)}>
                    <svg width="22" height="24" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M4 9.5H1C0.867392 9.5 0.740215 9.44732 0.646447 9.35355C0.552678 9.25979 0.5 9.13261 0.5 9V5C0.5 4.86739 0.552678 4.74021 0.646447 4.64645C0.740215 4.55268 0.867392 4.5 1 4.5H4L8.5 1V13L4 9.5Z"
                            stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4 4.5V9.5" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
                        <path
                            d="M10.9124 5.58582C11.0981 5.77153 11.2454 5.99201 11.3459 6.23466C11.4464 6.47731 11.4981 6.73739 11.4981 7.00003C11.4981 7.26267 11.4464 7.52274 11.3459 7.7654C11.2454 8.00805 11.0981 8.22853 10.9124 8.41424"
                            stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {muted && <span className="player-mute">x</span>}
                </button>

                <button className="fullscreen-icon"
                    onClick={() => setFullscreen(!fullscreen)}>
                    {!fullscreen && <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" /></svg>}
                    {fullscreen && <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" /></svg>}
                </button>

                <button onClick={() => {
                    dispatch(saveActiveModal(false));
                    setTimeout(() => navigate(previousPath), 500);
                }}>
                    <svg className="trailer-close"
                        width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="48" height="48" rx="24" fill="white" />
                        <path d="M22.5859 24L14.793 16.2071L16.2072 14.7928L24.0001 22.5857L31.793 14.7928L33.2072 16.2071L25.4143 24L33.2072 31.7928L31.793 33.2071L24.0001 25.4142L16.2072 33.2071L14.793 31.7928L22.5859 24Z" fill="black" />
                    </svg>
                </button>
            </div>

        </div>
    )
}
