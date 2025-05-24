import './BookingSteps.css';

function BookingSteps({ currentStep, onNext, onPrev }) {
    const steps = [
        'Страна',
        'Город',
        'Локация',
        'Игра',
        'Дата и время',
        'Детали',
        'Подтверждение',
    ];

    return (
        <div className="booking-steps">
            <div className="steps-progress">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className={`step ${
                            index + 1 === currentStep ? 'active' : ''
                        } ${index + 1 < currentStep ? 'completed' : ''}`}
                    >
                        <div className="step-number">{index + 1}</div>
                        <div className="step-label">{step}</div>
                    </div>
                ))}
            </div>

            <div className="steps-navigation">
                {currentStep > 1 && (
                    <button onClick={onPrev} className="nav-btn prev-btn">
                        Назад
                    </button>
                )}
                {currentStep < steps.length && (
                    <button
                        onClick={onNext}
                        className="nav-btn next-btn"
                        disabled={currentStep === steps.length}
                    >
                        Далее
                    </button>
                )}
            </div>
        </div>
    );
}

export default BookingSteps;
