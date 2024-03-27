import axios from 'axios';


interface ISignUp {
  username: string;
  password: string;
  fullname:string;
  avatar: string;
}

interface ISignIn {
  email: string;
  password: string;
}

export const register = async (body: ISignUp) => {
  const res = await axios.post('/v1/users/register', body);
  console.log('res register ', res);
  return res;
};

// export const logIn = async (body: ISignIn) => {
//   const res = await http.post('/auth/login', body);
//   console.log('res login ', res);
//   return res;
// };

// export const getToken = async () => {
//   const token = await AsyncStorage.getItem('token');
//   return token;
// };