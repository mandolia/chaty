import { firestoreFirebase } from '../firebaseService/FirebaseIndex';

const Token = localStorage.getItem('token');
const usersRef = firestoreFirebase.collection('/users');

export const parseJwt = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));

  return JSON.parse(jsonPayload);
};

export const getMeByPhone = async () => {
  const res = await usersRef.get();
  let MyDocument = res.docs.filter((e) => e.data().mobile === parseJwt(Token).firebase.identities.phone[0]);
  MyDocument = MyDocument.map((e) => ({ id: e.id, ...e.data() }));

  return MyDocument;
};

export const getUserNameById = async (id) => {
  const res = await usersRef.get();
  let name = res.docs.filter((e) => e.id === id);
  name = name.map((e) => e.data().name);

  return name[0];
};

export const getUserDataById = async (id) => {
  const res = await usersRef.get();
  let data = res.docs.filter((e) => e.id === id);
  data = data.map((e) => e.data());
  return data[0];
};

export const formatTime = (timer) => {
  const getSeconds = `0${(timer % 60)}`.slice(-2)
  const minutes = `${Math.floor(timer / 60)}`
  const getMinutes = `0${minutes % 60}`.slice(-2)
  return ` ${getMinutes} : ${getSeconds}`
}

export const formatTimeCounteDown = (timer) => {
  const minutes = `${Math.floor(timer / 60)}`
  const getMinutes = `0${minutes % 60}`.slice(-2)
  const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)
  return ` ${getHours}h:${getMinutes}min`
}

export const ReversTimeToSec = (timer) => {
  const NewFormat = timer.split(":")
  const hours = parseInt(NewFormat[0].trim()) * 3600;
  const minutes = parseInt(NewFormat[1].trim()) * 60;
  let newTimer = hours + minutes
  return newTimer;

}