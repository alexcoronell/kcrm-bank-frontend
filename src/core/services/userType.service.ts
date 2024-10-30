import axios from "axios";

const url = `${import.meta.env.VITE_API_URL}/user-types`;

/* Interfaces */
import { UserType } from "../interfaces/UserType.interface";

/* DTO's */
import { CreateUserTypeDto, UpdateUserTypeDto } from "../dtos/UserType.dto";


export default class UserTypeService {
  static save = async (dto: CreateUserTypeDto) => {
    return await axios.post(url, dto, {
      headers: { "Content-Type": "application/json" },
    });
  };

  static getAll = async (page = 1, limit = 10) => {
    return await axios.get(`${url}?page=${page}&limit=${limit}`);
  };

  static getAllSimple = async () => {
    return await axios.get(`${url}/simple`);
  };

  static count = async () => {
    return await axios.get(`${url}/count`);
  };

  static get = async (id: UserType["id"]) => {
    return await axios.get(`${url}/${id}`);
  };

  static update = async (id: UserType["id"], dto: UpdateUserTypeDto) => {
    return await axios.put(`${url}/${id}`, dto, {
      headers: { "Content-Type": "application/json" },
    });
  };

  static delete = async (id: UserType["id"]) => {
    return await axios.delete(`${url}/${id}`);
  };
}