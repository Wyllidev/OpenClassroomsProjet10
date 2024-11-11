import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import de l'action pour mettre à jour le profil utilisateur
import { setEditProfile } from '../../redux/reducers/profileSlice';
import TextInput from '../TextInput/Textinput';
import Button from '../Button/Button';

// Déclaration du composant EditButton
export default function EditButton() {
	// Récupère le token d'authentification et le profil utilisateur à partir de Redux
	const token = useSelector(state => state.userAuth.token);
	const profile = useSelector(state => state.profile);
	// Initialise les états locaux
	const [isEditing, setIsEditing] = useState(false);// Indique si l'édition est en cours
	const [newUserName, setNewUserName] = useState(profile.userName);// Nom d'utilisateur modifié
	const [error, setError] = useState('');// Message d'erreur

	// Initialise dispatch pour envoyer des actions Redux
	const dispatch = useDispatch();

	// Met à jour le champ `newUserName` lorsque `profile.userName` change
	useEffect(() => {
		setNewUserName(profile.userName);
	}, [profile.userName]);

	// Fonction pour soumettre la modification du nom d'utilisateur
	const editUserName = async e => {
		e.preventDefault();
		// Vérifie que le champ n'est pas vide
		if (!newUserName) {
			setError('The field cannot be empty.');
			return;
		}
		try {
			// Requête API pour mettre à jour le profil de l'utilisateur
			const response = await fetch(
				'http://localhost:3001/api/v1/user/profile',
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ userName: newUserName }),
				},
			);
			// Vérifie la réponse de l'API
			if (!response) {
				throw new Error("Échec de la mise à jour du nom d'utilisateur");
			}
			// Met à jour l'état Redux avec le nouveau nom d'utilisateur
			dispatch(setEditProfile(newUserName));
			// Désactive le mode édition
			setIsEditing(false);
		} catch (err) {
			console.log(err);
		}
	};

	// Annule l'édition en réinitialisant les champs et les erreurs
	const cancelEdit = () => {
		setIsEditing(false);
		setNewUserName(profile.userName);
		setError('');
	};

	return (
		<div>
			{/* Si l'édition est activée */}
			{isEditing ? (
				<div>
					{/* Champ pour éditer le nom d'utilisateur */}
					<TextInput
						label="Username"
						id="username"
						type="text"
						autoComplete="username"
						onChange={e => {
							setNewUserName(e.target.value);
							setError('');
						}}
						value={newUserName}
					/>
					{/* Affiche un message d'erreur si le champ est vide */}
					{error && <p className="error-message">{error}</p>}
					<br />
					{/* Affichage des champs prénom et nom (désactivés) */}
					<TextInput
						label="First Name"
						id="firstName"
						type="text"
						autoComplete="given-name"
						onChange={e => {}}
						value={profile.firstName}
						disabled
						className="disabled-input" // Ajout de la classe pour les styles CSS
					/>
					<br />
					<TextInput
						label="Last Name"
						id="lastName"
						type="text"
						autoComplete="family-name"
						onChange={e => {}}
						value={profile.lastName}
						disabled
						className="disabled-input" // Ajout de la classe pour les styles CSS
					/>
					<br />
					{/* Boutons pour sauvegarder ou annuler l'édition */}
					<Button className="edit-button" onClick={editUserName}>
						Save
					</Button>
					<Button className="edit-button" onClick={cancelEdit}>
						Cancel
					</Button>
				</div>
			) : (
				// Si l'édition est désactivée, affiche les informations de profil
				<div>
					<p>First Name: {profile.firstName}</p>
					<p>Last Name: {profile.lastName}</p>
					{/* Bouton pour activer le mode édition */}
					<Button className="edit-button" onClick={() => setIsEditing(true)}>
						Edit UserName
					</Button>
				</div>
			)}
		</div>
	);
}