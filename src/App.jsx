import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AuthGuard from './components/layout/AuthGuard';
import WelcomePage from './pages/WelcomePage';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import BookingSuccessPage from './pages/BookingSuccessPage';
import './assets/styles/global.css';
import Header from './components/ui/Header';
function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<WelcomePage />} />
                    <Route element={<AuthGuard />}>
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/booking" element={<BookingPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route
                            path="/booking/success"
                            element={<BookingSuccessPage />}
                        />
                    </Route>
                    <Route element={<AuthGuard roles={['admin']} />}>
                        <Route path="/admin" element={<AdminPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
