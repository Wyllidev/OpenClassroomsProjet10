import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// Import des actions pour déconnecter l'utilisateur et réinitialiser son profil
import { setLogOut } from '../../redux/reducers/userAuthSlice';
import { resetProfile } from '../../redux/reducers/profileSlice';
import logo from '../../assets/img/argentBankLogo.webp';

// Composant Header
export default function Header() {
    // Sélectionne le token de l'utilisateur dans l'état Redux pour vérifier s'il est connecté
    const token = useSelector(state => state.userAuth.token);
    // Sélectionne les informations de profil de l'utilisateur dans l'état Redux
    const profile = useSelector(state => state.profile);
    // Initialise la fonction dispatch pour envoyer des actions à Redux
    const dispatch = useDispatch();

    return (
        <header>
            <nav className="main-nav">
                {/* Logo et lien vers la page d'accueil */}
                <Link className="main-nav-logo" to="./">
                    <img
                        className="main-nav-logo-image"
                        src={logo}
                        alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>
                <div>
                    {/* Affiche le lien vers la page de profil avec le nom d'utilisateur si l'utilisateur est connecté */}
                    {token && (
                        <Link className="main-nav-item" to="./user">
                            {profile.userName}
                        </Link>
                    )}
                    {/* Lien de connexion/déconnexion */}
                    <Link
                        className="main-nav-item"
                        to={token ? './' : './sign-in/'}
                        onClick={() => {
                            if (token) {
                                // Si l'utilisateur est connecté, déclenche la déconnexion
                                dispatch(setLogOut({}));
                                dispatch(resetProfile());
                            }
                        }}
                    >
                        {/* Icône et texte dynamique (connexion ou déconnexion selon l'état) */}
                        <i className="fa fa-user-circle"></i>
                        {token ? ' Sign Out' : ' Sign In'}
                    </Link>
                    {/* Affiche le lien vers la page d'inscription si l'utilisateur n'est pas connecté */}
                    {!token && (
                        <Link className="main-nav-item" to="./sign-up">
                            Sign Up
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
}