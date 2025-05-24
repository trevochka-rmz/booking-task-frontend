import './Input.css';

function Input({ label, isTextarea = false, error, ...props }) {
    return (
        <div className="input-group">
            {label && <label className="input-label">{label}</label>}
            {isTextarea ? (
                <textarea className="input-field textarea" {...props} />
            ) : (
                <input className="input-field" {...props} />
            )}
            {error && <span className="input-error">{error}</span>}
        </div>
    );
}

export default Input;
