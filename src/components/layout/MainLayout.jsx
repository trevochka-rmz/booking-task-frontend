import Header from '../ui/Header';
import './MainLayout.css';

const MainLayout = ({ children }) => {
    return (
        <div className="main-layout">
            <Header />
            <main className="main-content">{children}</main>
        </div>
    );
};

export default MainLayout;
