import axios from "axios";

const url = `${import.meta.env.VITE_API_URL}/auth`;

import type { LoginDto } from "../dtos/Login.dto";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export default class AuthService {
  static login = async (dto: LoginDto) => {
    return await axios.post(`${url}/login`, dto, { withCredentials: true });
  };

  static logout = async () => {
    return await axios.get(`${url}/logout`);
  };

  static verifySession = async () => {
    return await axios.get(`${url}/verify-session`, { withCredentials: true });
  };
}
