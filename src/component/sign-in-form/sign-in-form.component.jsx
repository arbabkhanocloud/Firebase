import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRedirectResult } from "firebase/auth";

import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithFacebookPopup,
  signInWithFacebookRedirect,
} from "../../util/firebase/firebase.util";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.style.scss";
import Button from "../button/button.component";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState({
    ...defaultFormFields,
    phoneNumber: "",
  });
  const { email, password, phoneNumber } = formFields;
  const navigate = useNavigate();

  useEffect(() => {
    return async () => {
      const response = await getRedirectResult(auth);
      if (response) {
        await createUserDocumentFromAuth(response.user);
        navigate("/");
      }
    };
  }, []);

  const handleSubmitChange = async (event) => {
    event.preventDefault();
    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log("response", response);
      if (response) {
        const { user } = response;
        await createUserDocumentFromAuth(user);
        navigate("/");
      }
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Wrong Password");
          break;
        case "auth/user-not-found":
          alert("No user associated with this email");
          break;
        default:
          console.log("sign In with Email and Password Failed", error.message);
      }
    }
  };

  const SignInWithGooglePopup = async () => {
    try {
      const response = await signInWithGooglePopup();
      if (response) {
        const { user } = response;
        await createUserDocumentFromAuth(user);
        navigate("/");
      }
    } catch (error) {
      console.log("Sign in with google Popup failed", error.message);
    }
  };

  const SignInWithGoogleRedirect = async () => {
    try {
      await signInWithGoogleRedirect();
    } catch (error) {
      console.log("Sign in with google Redirect failed", error.message);
    }
  };

  const SignInWithFacebookPopup = async () => {
    try {
      const response = await signInWithFacebookPopup();
      console.log("response", response);
      if (response) {
        const { user } = response;
        await createUserDocumentFromAuth(user);
        navigate("/");
      }
    } catch (error) {
      console.log("Sign in with Facebook Popup Failed", error.message);
    }
  };

  const SignInWithFacebookRedirect = async () => {
    try {
      await signInWithFacebookRedirect();
    } catch (error) {
      console.log("Sign in with Facebook Redirect failed", error.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign In with your Email and password</span>
      <form onSubmit={handleSubmitChange}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleInputChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleInputChange}
          name="password"
          value={password}
        />
        <FormInput
          label="Phone Number"
          type="tel"
          required
          onChange={handleInputChange}
          name="phoneNumber"
          value={phoneNumber}
        />
        <div className="buttons-container">
          <Button type="submit" buttonType="google">
            Sign In
          </Button>
          <div>OR</div>
          <Button
            type="button"
            buttonType="google"
            onClick={SignInWithGooglePopup}
          >
            google Popup sign in
          </Button>
          <Button
            type="button"
            buttonType="google"
            onClick={SignInWithGoogleRedirect}
          >
            google redirect sign in
          </Button>
          <Button
            type="button"
            buttonType="google"
            onClick={SignInWithFacebookPopup}
          >
            Facebook popup sign in
          </Button>
          <Button
            type="button"
            buttonType="google"
            onClick={SignInWithFacebookRedirect}
          >
            facebook redirect sign in
          </Button>
        </div>
      </form>
    </div>
  );
};
export default SignInForm;
