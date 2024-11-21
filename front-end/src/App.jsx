import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import SignIn from './pages/SignIn/SignIn';
import User from './pages/User/User';
import SignUp from './pages/SignUp/SignUp';

export default function App() {
    // Utilisation de useSelector pour accéder au token de l'utilisateur depuis le store Redux
    const token = useSelector(state => state.userAuth.token);
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-in" element={<SignIn />} />
                                {/* 
                    Route pour la page utilisateur.
                    Si le token est présent (utilisateur authentifié), affiche la page User.
                    Sinon, redirige vers la page de connexion.
                */}
                <Route
                    path="/user"
                    element={token ? <User /> : <Navigate to="/sign-in" />}
                />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="*" element={<Home />} />
            </Routes>
            <Footer />
        </div>
    );
}