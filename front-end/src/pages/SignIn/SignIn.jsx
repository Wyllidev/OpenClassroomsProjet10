import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setLogIn } from "../../redux/reducers/userAuthSlice"
import TextInput from "../../components/TextInput/Textinput"
import Button from "../../components/Button/Button"

// Composant principal pour la page de connexion
export default function SignIn() {
	// États locaux pour stocker les informations de connexion et la case "Remember me"
    const [email, setEmail] = useState("")// Stocke l'email saisi par l'utilisateur
    const [password, setPassword] = useState("")// Stocke le mot de passe saisi par l'utilisateur
    const [checkBox, setCheckBox] = useState(false)// Gère l'état de la case "Remember me"

	// Hook pour rediriger l'utilisateur
    const navigate = useNavigate()
	// Hook pour envoyer des actions à Redux
    const dispatch = useDispatch()

	// Fonction pour gérer la connexion de l'utilisateur
    const fetchLogIn = async (e) => {
        e.preventDefault()// Empêche le rechargement de la page à la soumission du formulaire
        try {
			// Envoie une requête POST à l'API pour authentifier l'utilisateur
            const response = await fetch("http://localhost:3001/api/v1/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })// Envoie l'email et le mot de passe dans le corps de la requête
            })
            const data = await response.json()// Récupère la réponse en JSON
            const token = data.body.token// Récupère le token d'authentification
			// Envoie le token au store Redux pour authentifier l'utilisateur
            dispatch(setLogIn({ token }))
			// Redirige l'utilisateur vers la page profil après la connexion
            navigate("/user")
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
				{/* Formulaire de connexion */}
                <form onSubmit={fetchLogIn}>
					{/* Champ pour l'email */}
                    <TextInput
                        className="input-wrapper"
                        label="E-mail"
                        id="email"
                        type="text"
                        autoComplete="email"
                        onChange={(e) => setEmail(e.target.value)} />
					{/* Champ pour le mot de passe */}
                    <TextInput
                        className="input-wrapper"
                        label="Password"
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)} />
					{/* Case à cocher pour "Remember me" */}
                    <TextInput
                        className="input-remember"
                        label="Remember me"
                        id="remember-me"
                        type="checkbox"
                        onChange={() => setCheckBox(!checkBox)} />
					{/* Bouton de soumission pour se connecter */}
                    <Button
                        className="sign-in-button"
                        type="submit">
                        Sign In
                    </Button>
                </form>
            </section>
        </main>
    )
}