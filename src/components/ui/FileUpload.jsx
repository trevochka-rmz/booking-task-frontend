import { useRef, useState } from 'react';
import './FileUpload.css';

function FileUpload({ label, onChange, accept, multiple = false }) {
    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            onChange(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="file-upload">
            {label && <label className="file-upload-label">{label}</label>}
            <div className="file-upload-container" onClick={triggerFileInput}>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept={accept}
                    multiple={multiple}
                    className="file-input"
                />
                <div className="file-upload-display">
                    {fileName || (
                        <span className="file-upload-placeholder">
                            Выберите файл...
                        </span>
                    )}
                </div>
                <button type="button" className="file-upload-button">
                    Обзор
                </button>
            </div>
        </div>
    );
}

export default FileUpload;
