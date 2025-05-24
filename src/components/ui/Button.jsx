import './Button.css';

function Button({
    children,
    type = 'button',
    variant = 'primary',
    disabled,
    ...props
}) {
    return (
        <button
            type={type}
            className={`button ${variant} ${disabled ? 'disabled' : ''}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}
export default Button;
