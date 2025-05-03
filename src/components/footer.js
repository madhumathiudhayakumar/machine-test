import React from 'react'
import { auth, googleProvider, signInWithPopup, facebookProvider } from '../loginAuthentication/firebase'
import {
	fetchSignInMethodsForEmail,
	linkWithCredential,
	FacebookAuthProvider,
} from "firebase/auth";
import { useLocation, useNavigate } from 'react-router-dom';

const Footer = ({ message }) => {
	const navigate = useNavigate()
	const location = useLocation()

	const handleGoogleLogin = async () => {
		try {
			const result = await signInWithPopup(auth, googleProvider);
			const user = result.user;
			localStorage.setItem("user", JSON.stringify(user));
			navigate("/home"); 
		} catch (error) {
			console.error("Google login error:", error.message);
		}
	};

	const handleFacebookLogin = async () => {
		try {
			const result = await signInWithPopup(auth, facebookProvider);
			const user = result.user;
			localStorage.setItem("user", JSON.stringify(user));
			navigate("/home");
		} catch (error) {
			if (error.code === "auth/account-exists-with-different-credential") {
				const pendingCred = FacebookAuthProvider.credentialFromError(error);
				const email = error.customData.email;

				const methods = await fetchSignInMethodsForEmail(auth, email);

				if (methods.includes("google.com")) {
					const googleResult = await signInWithPopup(auth, googleProvider);
					await linkWithCredential(googleResult.user, pendingCred);
					console.log("Facebook linked to Google account");
					navigate("/home");
				} else {
					alert("Please sign in using the provider you originally used.");
				}
			} else {
				console.error("Facebook login error:", error.message);
			}
		}
	};

	const handleLinkedInLogin = async (providerName) => {
		alert(`${providerName} login is not implemented yet.`);
	}

	const getIconButtonStyle = (isClickable = true) => ({
		width: '40px',
		height: '40px',
		cursor: isClickable ? 'pointer' : 'default',
	});

	return (
		<div>
			<div className="d-flex justify-content-center gap-3">
				<div
					onClick={location.pathname !== '/home' ? handleGoogleLogin : () => { }}
					className="rounded-circle border d-flex justify-content-center align-items-center"
					style={getIconButtonStyle(location.pathname !== '/home')}
				>
					<i className="bi bi-google"></i>
				</div>
				<div
					onClick={location.pathname !== '/home' ? handleFacebookLogin : () => { }}
					className="rounded-circle border d-flex justify-content-center align-items-center"
					style={getIconButtonStyle(location.pathname !== '/home')}
				>
					<i className="bi bi-facebook"></i>
				</div>
				<div
					onClick={location.pathname !== '/home' ? () => handleLinkedInLogin("Linked In") : () => { }}
					className="rounded-circle border d-flex justify-content-center align-items-center"
					style={getIconButtonStyle(location.pathname !== '/home')}
				>
					<i className="bi bi-linkedin"></i>
				</div>
				<div
					onClick={location.pathname !== '/home' ? () => handleLinkedInLogin("Twitter") : () => { }}
					className="rounded-circle border d-flex justify-content-center align-items-center"
					style={getIconButtonStyle(location.pathname !== '/home')}
				>
					<i className="bi bi-twitter"></i>
				</div>
			</div>
			{message && (
				<div className="text-center mt-4">
					<div className="fw-semibold">Abc@gmail.com</div>
					<div className="text-muted small">&copy; 2025 ABC. All rights reserved.</div>
				</div>
			)}
		</div>
	)
}
export default Footer

