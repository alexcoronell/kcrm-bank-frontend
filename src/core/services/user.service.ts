import axios from "axios";

const url = `${import.meta.env.VITE_API_URL}/users`;

/* Interfaces */
import type { User } from "../interfaces/User.interface";

/* DTO's */
import type {
  CreateUserDto,
  UpdateUserDto,
  UpdateUserPasswordDto,
} from "../dtos/User.dto";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export default class UserService {
  static save = async (dto: CreateUserDto) => {
    return await axios.post(url, dto, {
      headers: { "Content-Type": "application/json" },
    });
  };

  static getAll = async (page = 1, limit = 10) => {
    return await axios.get(`${url}?page=${page}&limit=${limit}`);
  };

  static count = async () => {
    return await axios.get(`${url}/count`);
  };

  static get = async (id: User["id"]) => {
    return await axios.get(`${url}/${id}`);
  };

  static update = async (id: User["id"], dto: UpdateUserDto) => {
    return await axios.patch(`${url}/${id}`, dto, {
      headers: { "Content-Type": "application/json" },
    });
  };

  static updatePassword = async (
    id: User["id"],
    dto: UpdateUserPasswordDto
  ) => {
    return await axios.patch(`${url}/password/${id}`, dto, {
      headers: { "Content-Type": "application/json" },
    });
  };

  static delete = async (id: User["id"]) => {
    return await axios.delete(`${url}/${id}`);
  };
}
