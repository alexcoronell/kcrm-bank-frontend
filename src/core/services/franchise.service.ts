import axios from "axios";

const url = `${import.meta.env.VITE_API_URL}/franchises`;

import type {
  CreateFranchiseDto,
  UpdateFranchiseDto,
} from "../dtos/Franchise.dto";
import type { Franchise } from "../interfaces/Franchise.interface";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export default class FranchiseService {
  static save = async (dto: CreateFranchiseDto) => {
    return await axios.post(url, dto, {
      headers: { "Content-Type": "application/json" },
    });
  };

  static getAll = async (page = 1, limit = 10) => {
    return await axios.get(`${url}?page=${page}&limit=${limit}`, {
      withCredentials: true,
    });
  };

  static count = async () => {
    return await axios.get(`${url}/count`, { withCredentials: true });
  };

  static get = async (id: Franchise["id"]) => {
    return await axios.get(`${url}/${id}`, { withCredentials: true });
  };

  static update = async (id: Franchise["id"], dto: UpdateFranchiseDto) => {
    return await axios.put(`${url}/${id}`, dto, { withCredentials: true });
  };

  static delete = async (id: Franchise["id"]) => {
    return await axios.delete(`${url}/${id}`, { withCredentials: true });
  };
}
