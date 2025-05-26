import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import FileUpload from '../ui/FileUpload';
import './OnBoardingForm.css';

function OnboardingForm({ initialData, onSubmit, onCancel }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: initialData?.profile || {},
    });
    // const [avatar, setAvatar] = useState(null);

    // const handleFileChange = (file) => {
    //     setAvatar(file);
    // };
    // setAvatar(file);

    const handleFormSubmit = (data) => {
        const formData = new FormData();
        formData.append('name', data.name || ' ');
        // formData.append('username', data.username);
        formData.append('phone', data.phone || '');
        formData.append('gender', data.gender || '');
        formData.append('birthDate', data.birthDate || '');
        formData.append('nativeLanguage', data.nativeLanguage || 'ru');
        formData.append('status', data.status || '');
        formData.append('bio', data.bio || '');
        formData.append('socials', JSON.stringify({}));
        // if (avatar) {
        //     formData.append('avatar', avatar);
        // }
        // for (let [key, value] of formData.entries()) {
        //     console.log(key, value);
        // }

        onSubmit(formData); // Передаём данные и аватар отдельно
    };

    return (
        <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="onboarding-form"
        >
            <h2>Заполните профиль</h2>

            <div className="form-section">
                {/* <Input
                    label="Никнейм*"
                    {...register('username', { required: 'Обязательное поле' })}
                    error={errors.username}
                /> */}
                <Input
                    label="Полное имя*"
                    {...register('name', { required: 'Обязательное поле' })}
                    error={errors.name}
                />
                {/* <FileUpload
                    label="Аватар"
                    onChange={handleFileChange}
                    accept="image/*"
                /> */}
            </div>

            <div className="form-section">
                <Input label="Телефон" type="tel" {...register('phone')} />
                <div className="form-row">
                    <Input
                        label="Дата рождения"
                        type="date"
                        {...register('birthDate')}
                    />
                    <Input
                        label="Родной язык"
                        {...register('nativeLanguage')}
                    />
                </div>
                <Input label="Статус" {...register('status')} />
                <Input
                    label="О себе"
                    textarea // Используем кастомный проп вместо multiline
                    {...register('bio')}
                />
            </div>
            <div className="form-actions">
                <Button type="button" onClick={onCancel} variant="secondary">
                    Отмена
                </Button>
                <Button type="submit" className="full-width-button">
                    Сохранить профиль
                </Button>
            </div>
        </form>
    );
}

export default OnboardingForm;
