import httpService, { setDefaultCommonHeader } from "./httpService";
import { URL_API } from "../config.json";
import jwtDecode from "jwt-decode";

const TOKEN_KEY = "token";

export function createUser(user) {
  return httpService.post(`${URL_API}/users/add`, user);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(TOKEN_KEY);
    return jwtDecode(jwt);
  } catch {
    return null;
  }
}

setDefaultCommonHeader("x-auth-token", getJWT());

export function getJWT() {
  return localStorage.getItem(TOKEN_KEY);
}
export function getMyProfile() {
  return httpService.get(`${URL_API}/users/myInfo`);
}

export async function loginUser(email, password) {
  const res = await httpService.post(`${URL_API}/auth/login`, {
    email,
    password,
  });
  console.log({ token: res.data.newToken }, res);

  localStorage.setItem(TOKEN_KEY, res.data.newToken);
}

export function logoutUser() {
  localStorage.removeItem(TOKEN_KEY);
}

export function editUser({ _id, ...body }) {
  return httpService.put(`${URL_API}/users/edit/${_id}`, body);
}

const usersService = {
  createUser,
  getCurrentUser,
  getMyProfile,
  getJWT,
  loginUser,
  logoutUser,
};

export default usersService;
