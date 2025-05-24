import { useEffect } from 'react';
import './Modal.css';

function Modal({ isOpen, onClose, children }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <button className="close-button" onClick={onClose}>
                    ×
                </button>
                {children}
            </div>
        </div>
    );
}
export default Modal;
