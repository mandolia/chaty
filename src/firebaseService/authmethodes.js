import firebase from 'firebase';
import { firestoreFirebase, firebaseStorage } from './FirebaseIndex';

const usersRef = firestoreFirebase.collection('/users');

export const authMethods = {

  login: async (phoneNumber, password, appVerifier, authStep, setAuthStep, setLoginError) => {
    const snapshot = await usersRef.get();
    const AllusersPhoneNumber = snapshot.docs.map((doc) => doc.data().mobile);
    if (AllusersPhoneNumber.includes(phoneNumber)) {
      const UserPassword = snapshot.docs.filter((doc) => doc.data().mobile === phoneNumber);
      (UserPassword[0].data().password === password
        ? firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
          .then((confirmationResult) => {
            setAuthStep(authStep + 1);
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
          }).catch((error) => {
            console.log(error);

            // Error; SMS not sent
            // ...
          })
        : setLoginError(' Password Incorrect'));
    } else {
      setLoginError('Incorect Phone Number');
    }
  },

  handleOTPCheck: async (OTPcode, setUser, setToken, authStep, setAuthStep, otpPassword, loginPassword, signupPassord, setOtpError) => {
    if (signupPassord === otpPassword && signupPassord !== '') {
      window.confirmationResult.confirm(OTPcode)
        .then(async (res) => {
          const token = await Object.entries(res.user)[5][1].b;
          setUser(res.user);
          // set token to localStorage
          await localStorage.setItem('token', token);
          // grab token from local storage and set to state.
          setToken(window.localStorage.token);
          setAuthStep(authStep + 1);
        })
        .catch((err) => setOtpError(err.message));
    } else if (loginPassword === otpPassword && loginPassword !== '') {
      window.confirmationResult.confirm(OTPcode)
        .then(async (res) => {
          const token = await Object.entries(res.user)[5][1].b;
          setUser(res.user);
          // set token to localStorage
          await localStorage.setItem('token', token);
          // grab token from local storage and set to state.
          setToken(window.localStorage.token);
          setAuthStep(authStep + 1);
        })
        .catch((err) => setOtpError(err.message));
    } else {
      setOtpError('Password Incorect');
    }
  },

  saveUser: async (data, appVerifier, authStep, setAuthStep, setSignupError, valuePhone) => {
    const snapshot = await usersRef.get();
    const Allusers = snapshot.docs.map((doc) => doc.data().mobile);
    if (!Allusers.includes(valuePhone)) {
      firebase.auth().signInWithPhoneNumber(valuePhone, appVerifier)
        .then(async (confirmationResult) => {
          await usersRef.add({
            email: data.email,
            name: data.name,
            gender: data.gender,
            mobile: valuePhone,
            password: data.password,
            PictureView: "everybody",
            profilView: true,
            privateChat: true,
            status: "Life is Good",
            friends: [],
            blockedUsers: [],
            teamChatContact: [],
            teamChatNotification: [],
            audio: {
              type: "",
              from: "",
              candidate: ""
            },
            video:{
              type: "",
              from: "",
              candidate: ""
            },
            acceptedRequest: [],
            avatar: '',
            blockedGroups: [],
            confirmationCode: [],
            groups: [],
            notification: [],
            onlineStatus: 'everybody',
            history:[]
          });
          setAuthStep(authStep + 1);
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
        }).catch((error) => {
          setSignupError(error.message);
          // Error; SMS not sent
          // ...
        });
    } else {
      setSignupError('Phone Number Already Exist');
    }
  },

  signout: (setErrors, setToken) => {
    // signOut is a no argument function
    firebase.auth().signOut().then((res) => {
      // remove the token
      localStorage.removeItem('token');
      // set the token back to original state
      setToken(null);
    })
      .catch((err) => {
        console.log(err);
        // there shouldn't every be an error from firebase but just in case
        setErrors((prev) => ([...prev, err.message]));
        // whether firebase does the trick or not i want my user to do there thing.
        localStorage.removeItem('token');
        setToken(null);
        console.error(err.message);
      });
  },

  forgotPass: (email) => {
    firebase.auth().sendPasswordResetEmail(email);
  },
};
