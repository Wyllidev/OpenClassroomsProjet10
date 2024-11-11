import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLogOut } from '../../redux/reducers/userAuthSlice';
import TextInput from '../../components/TextInput/Textinput';
import Button from '../../components/Button/Button';

// Composant principal pour la page d'inscription
export default function SignUp() {
	// États locaux pour stocker les informations d'inscription et gérer l'affichage des messages
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [userName, setUserName] = useState('');
	const [submitSuccess, setSubmitSuccess] = useState(false);// Indique si l'inscription a réussi
	const [confirmSuccess, setConfirmSuccess] = useState(false);// Affiche un message de confirmation si l'inscription est réussie
	const [error, setError] = useState(null); // Gère les erreurs lors de l'inscription

	// Utilisation de useDispatch pour envoyer des actions Redux
	const dispatch = useDispatch();
	// Utilisation de useNavigate pour rediriger l'utilisateur
	const navigate = useNavigate();

	// Fonction de gestion de l'inscription lorsque le formulaire est soumis
	const SignUp = async e => {
		e.preventDefault();
		try {
			// Envoi d'une requête POST vers l'API pour inscrire l'utilisateur
			const response = await fetch('http://localhost:3001/api/v1/user/signup', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email,
					password,
					firstName,
					lastName,
					userName,
				}),
			});

			// Vérifie si la réponse n'est pas OK, et lève une erreur en cas d'échec
			if (!response.ok) {
				throw new Error('Inscription échouée');
			}
			// Si l'inscription est réussie, déconnecte l'utilisateur avec Redux et met à jour les états de confirmation
			dispatch(setLogOut());
			setConfirmSuccess(true);
			setSubmitSuccess(true);
			setError(null);// Réinitialise les erreurs
		} catch (err) {
			console.error(err);
			setError("Erreur lors de l'inscription");
		}
	};

	return (
		<main className="main bg-dark">
			<section className="sign-in-content">
				<i className="fa fa-user-circle sign-in-icon"></i>
				<h1>Sign Up</h1>
				{/* Formulaire d'inscription */}
				<form onSubmit={SignUp}>
					{/* Champ pour l'email */}
					<TextInput
						className="input-wrapper"
						label="E-mail"
						id="email"
						type="text"
						autoComplete="email"
						onChange={e => setEmail(e.target.value)}
					/>
					{/* Champ pour le mot de passe */}
					<TextInput
						className="input-wrapper"
						label="Password"
						id="password"
						type="password"
						autoComplete="current-password"
						onChange={e => setPassword(e.target.value)}
					/>
					{/* Champ pour le prénom */}
					<TextInput
						className="input-wrapper"
						label="FirstName"
						id="firstName"
						type="text"
						autoComplete="given-name"
						onChange={e => setFirstName(e.target.value)}
					/>
					{/* Champ pour le nom de famille */}
					<TextInput
						className="input-wrapper"
						label="LastName"
						id="lastName"
						type="text"
						autoComplete="family-name"
						onChange={e => setLastName(e.target.value)}
					/>
					{/* Champ pour le nom d'utilisateur */}
					<TextInput
						className="input-wrapper"
						label="UserName"
						id="userName"
						type="text"
						autoComplete="username"
						onChange={e => setUserName(e.target.value)}
					/>
					{/* Bouton d'inscription ou redirection si l'inscription est réussie */}
					{submitSuccess ? (
						<Button
							className="sign-in-button"
							type="button"
							onClick={() => navigate('/sign-in')}
						>
							Aller sur la page de connexion
						</Button>
					) : (
						<Button className="sign-in-button" type="submit">
							Sign Up
						</Button>
					)}
					{/* Affichage d'un message d'erreur si l'inscription échoue */}
					{error && <p className="error-message">{error}</p>}
					{/* Message de confirmation si l'inscription est réussie */}
					{confirmSuccess && (
						<div className="confirm-success">
							<p>Vous êtes inscrit avec succès. Veuillez vous connecter.</p>
						</div>
					)}
				</form>
			</section>
		</main>
	);
}