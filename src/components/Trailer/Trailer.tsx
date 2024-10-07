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

    return (
        <div className='trailer-container'>
            <div className="trailer" onClick={() => setPlaying(!playing)}>
                <ReactPlayer className="player" url={`https://www.youtube.com/watch?v=${id}`}
                    width="100%" height="100%" playing={playing} 
                    muted={true} 
                />
                {playing && <svg className='player-btn' width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="80" height="80" rx="40" fill="white" />
                    <path d="M30 25H33.3333V55H30V25ZM46.6667 25H50V55H46.6667V25Z" fill="black" />
                </svg>}

                {!playing && <svg className='player-btn' width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="80" height="80" rx="40" fill="white" />
                    <path d="M30 53.6595V26.3404C30 25.0313 31.4399 24.2332 32.55 24.927L54.4053 38.5867C55.4498 39.2393 55.4498 40.7605 54.4053 41.4133L32.55 55.0728C31.4399 55.7667 30 54.9687 30 53.6595Z" fill="black" />
                </svg>
                }
            </div>

            <button onClick={() => {
                dispatch(saveActiveModal(false));
                setTimeout(() => navigate(previousPath), 500);
            }}>
                <svg className="trailer-close" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="48" rx="24" fill="white" />
                    <path d="M22.5859 24L14.793 16.2071L16.2072 14.7928L24.0001 22.5857L31.793 14.7928L33.2072 16.2071L25.4143 24L33.2072 31.7928L31.793 33.2071L24.0001 25.4142L16.2072 33.2071L14.793 31.7928L22.5859 24Z" fill="black" />
                </svg>
            </button>

        </div>
    )
}
