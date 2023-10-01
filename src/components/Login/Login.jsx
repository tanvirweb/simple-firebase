import { useState } from "react";
import app from "../../firebase/firebase.init";
import { GoogleAuthProvider, signInWithPopup, getAuth, signOut, GithubAuthProvider } from "firebase/auth";

const Login = () => {
    const [userInfo, setUserInfo] = useState(null);
    const auth = getAuth(app);
    const providerGoogle = new GoogleAuthProvider();
    const providerGithub = new GithubAuthProvider();

    const handleGoogleLogin = () => {
        signInWithPopup(auth, providerGoogle)
        .then(result => {
            setUserInfo(result.user)
        })
        .catch(error => {
            console.log(error, error.message)
        })
    }

    const handleGithubLogin = () => {
        signInWithPopup(auth, providerGithub)
        .then(result => {
            setUserInfo(result.user)
            console.log(result.user)
        })
        .catch(error => {
            console.log(error, error.message)
        })
    }

    const handleSignOut = () => {
        signOut(auth)
        .then(() => {
            setUserInfo(null)
        })
        .catch(error => {
            console.log(error, error.message)
        })
    }

    return (
        <div className="text-center p-5">
            { userInfo ?
                <button className="px-4 py-1 rounded-md font-bold bg-red-600 text-white" onClick={handleSignOut}>Log Out</button>
                : 
                <>
                    <button className="px-4 py-1 rounded-md font-bold bg-green-600 text-white" onClick={handleGoogleLogin}>LogIn with Google</button>
                    <button className="px-4 py-1 rounded-md font-bold bg-green-600 text-white" onClick={handleGithubLogin}>LogIn with GitHub</button>
                </>
            }
            { 
                userInfo &&
                <div className="max-w-xs mx-auto p-4 rounded-md shadow-md border mt-5">
                    <img className="w-20 h-20 rounded-full object-cover mx-auto mb-3" src={userInfo.photoURL} alt="" />
                    <h2 className="font-bold">Name: {userInfo.displayName}</h2>
                    {
                        userInfo.email &&
                        <p>Email: {userInfo.email}</p>
                    }
                </div>
            }
        </div>
    );
};

export default Login;