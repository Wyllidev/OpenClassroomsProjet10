import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
// Import de l'action Redux pour mettre à jour le profil de l'utilisateur
import { setGetProfile } from "../../redux/reducers/profileSlice"
import Account from "../../components/Account/Account"
import EditButton from "../../components/EditButton/EditButton"

// Composant principal de la page utilisateur
export default function User() {
    // Récupération du token d'authentification depuis le store Redux
    const token = useSelector(state => state.userAuth.token)
    // Récupération des informations du profil depuis le store Redux
    const profile = useSelector(state => state.profile)

    // Création de la fonction de dispatch pour envoyer des actions à Redux
    const dispatch = useDispatch()

    // Utilisation de useEffect pour effectuer une requête API lors du montage du composant
    useEffect(() => {
        // Fonction asynchrone pour récupérer les données de l'utilisateur
        const fetchDataUser = async () => {
            try {
                // Requête vers l'API pour obtenir le profil de l'utilisateur
                const response = await fetch("http://localhost:3001/api/v1/user/profile", {
                method: "POST",
                    headers: {
                        // Ajout du token pour l'authentification
                        "Authorization": `Bearer ${token}`
                    }
                })
                // Conversion de la réponse en JSON
                const data = await response.json()
                // Envoi des données du profil à Redux pour mise à jour du store
                dispatch(setGetProfile({ data }))
            } catch (err) {
                console.log(err)
            }
        }
        // Appel de la fonction pour récupérer les données de l'utilisateur
        fetchDataUser()
    }, [token])// Dépendance sur le token pour relancer useEffect si le token change

    return (

        <main className="main bg-dark">
            <div className="header">
                <h1>Welcome back<br />{profile.firstName + " " + profile.lastName + "!"}</h1>
                <EditButton />
            </div>
            <h2 className="sr-only">Accounts</h2>
            <Account
                title="Argent Bank Checking (x8349)"
                amount="$2,082.79"
                description="Available Balance" />
            <Account
                title="Argent Bank Savings (x6712)"
                amount="$10,928.42"
                description="Available Balance" />
            <Account
                title="Argent Bank Credit Card (x8349)"
                amount="$184.30"
                description="Current Balance" />
        </main>
    )
}
