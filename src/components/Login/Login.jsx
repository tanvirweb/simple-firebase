import app from "../../firebase/firebase.init";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

const Login = () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const hangleLogin =() => {
        signInWithPopup(auth, provider)
        .then(result => {
            console.log(result.user)
        })
        .catch(error => {
            console.log(error, error.message)
        })
    }

    return (
        <div>
            <button onClick={hangleLogin}>LogIn</button>
        </div>
    );
};

export default Login;