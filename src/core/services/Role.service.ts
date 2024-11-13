import axios from "axios";

const url = `${import.meta.env.VITE_API_URL}/roles`;

/* Interfaces */
import type { Role } from "../interfaces/Role.interface";

/* DTO's */
import type { CreateRoleDto, UpdateRoleDto } from "../dtos/Role.dto";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export default class RoleService {
  static save = async (dto: CreateRoleDto) => {
    return await axios.post(url, dto, {
      headers: { "Content-Type": "application/json" },
    });
  };

  static getAll = async (page = 1, limit = 10) => {
    return await axios.get(`${url}?page=${page}&limit=${limit}`, {
      withCredentials: true,
    });
  };

  static getAllSimple = async () => {
    return await axios.get(`${url}/simple`, { withCredentials: true });
  };

  static count = async () => {
    return await axios.get(`${url}/count`, { withCredentials: true });
  };

  static get = async (id: Role["id"]) => {
    return await axios.get(`${url}/${id}`, { withCredentials: true });
  };

  static update = async (id: Role["id"], dto: UpdateRoleDto) => {
    return await axios.put(`${url}/${id}`, dto, { withCredentials: true });
  };

  static delete = async (id: Role["id"]) => {
    return await axios.delete(`${url}/${id}`, { withCredentials: true });
  };
}
