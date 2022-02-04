import axios from 'axios';

export const signup = async (user) =>
  await axios.post(`http://localhost:3001/api/users/signup`, user);

export const signin = async (user) =>
  await axios.post(`http://localhost:3001/api/users/signin`, user);

export const addUser = async (user) => {
  await axios.post(`http://localhost:3001/api/users`, user);
};

export const updateUsers = async (id) =>
  await axios.patch(`http://localhost:3001/api/users/${id}`);
