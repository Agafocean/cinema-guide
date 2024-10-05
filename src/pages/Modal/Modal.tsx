import { MouseEventHandler, ReactNode, useRef } from 'react';
import './Modal.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveActiveModal } from '../../store/reducer';

interface ModalParam {
    active: boolean;
    children: ReactNode;
}

export const Modal = ({ active, children }: ModalParam) => {
    const previousPath = useLocation().state?.previousLocation.pathname;
    const { search } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const contentRef = useRef<HTMLDivElement>(null);

    const handleClose: MouseEventHandler<HTMLDivElement> = (event) => {
        if (search && event.target instanceof Node && !contentRef.current?.firstChild?.contains(event.target)) {
            dispatch(saveActiveModal(false));
            setTimeout(() => navigate(previousPath), 500);
        }
    }

    return (
        <div className={active ? "modal modal-in" : "modal modal-out"}
            onClick={handleClose} >
            <div className={active ? "content-in" : "content-out"} onClick={e => e.stopPropagation}
                ref={contentRef}  >
                {children}
            </div>
        </div>
    );
};

