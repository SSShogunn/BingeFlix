import { createContext, useContext, useEffect, useState } from "react";

import {signInWithEmailAndPassword,createUserWithEmailAndPassword,onAuthStateChanged,signOut} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { auth, db } from "../services/firebase"
import {doc,setDoc} from "firebase/firestore"

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState({})

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => {
            unsubscribe()
        }
    }, [])

    async function signUp(email, password, firstName, lastName) {
        const db = getFirestore();
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setDoc(doc(db, "users", user.uid), {
                    uid: user.uid,
                    firstName, 
                    lastName,
                    email,
                    favShows: [],
                })
            });
    }

    function signIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logOut() {
        return signOut(auth)
    }
    return (
        <AuthContext.Provider value={{ user, signUp, signIn, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export function UserAuth() {
    return (
        useContext(AuthContext)
    )
}