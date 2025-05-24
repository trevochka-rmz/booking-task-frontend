import MainLayout from '../components/layout/MainLayout';
import './HomePage.css';

function HomePage() {
    return (
        <MainLayout>
            {/* <div className="home-page"> */}
            <h1>Добро пожаловать в систему бронирования квестов!</h1>
            <p>Выберите раздел в меню для продолжения работы</p>
            {/* </div> */}
        </MainLayout>
    );
}
export default HomePage;
