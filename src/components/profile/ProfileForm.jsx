import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import FileUpload from '../ui/FileUpload';
import Button from '../ui/Button';
import './ProfileForm.css';

function ProfileForm({ initialData, onSubmit, onCancel }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: initialData?.profile || {},
    });
    const [avatar, setAvatar] = useState(null);

    const handleFileChange = (file) => {
        setAvatar(file);
    };

    const submitHandler = (data) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });
        if (avatar) formData.append('avatar', avatar);
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)} className="profile-form">
            <div className="form-section">
                <h3>Основная информация</h3>
                <div className="form-group">
                    <label>Имя</label>
                    <input
                        {...register('name', { required: 'Обязательное поле' })}
                    />
                    {errors.name && (
                        <span className="error">{errors.name.message}</span>
                    )}
                </div>

                <div className="form-group">
                    <label>Телефон</label>
                    <input type="tel" {...register('phone')} />
                </div>

                <div className="form-group">
                    <label>Аватар</label>
                    <FileUpload onChange={handleFileChange} accept="image/*" />
                </div>
            </div>

            <div className="form-actions">
                <Button type="button" onClick={onCancel} variant="secondary">
                    Отмена
                </Button>
                <Button type="submit">Сохранить изменения</Button>
            </div>
        </form>
    );
}

export default ProfileForm;
