import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "./firebaseCofig";

export const googleLogin = async () => {
	try {
		provider.setCustomParameters({ prompt: "select_account" });
		await signInWithPopup(auth, provider);
	} catch (error) {
		console.log("login failed", error);
		throw error;
	}
};


export const googleLogout = () => {
	return signOut(auth);
};