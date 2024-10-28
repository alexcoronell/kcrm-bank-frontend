import axios from "axios";

const url = `${import.meta.env.VITE_API_URL}/franchises`;

import { CreateFranchiseDto, UpdateFranchiseDto } from "../dtos/Franchise.dto";
import { Franchise } from "../interfaces/Franchise.interface";

export default class FranchiseService {
  static save = async (dto: CreateFranchiseDto) => {
    return await axios.post(url, dto, {
      headers: { "Content-Type": "application/json" },
    });
  };

  static getAll = async () => {
    return await axios.get(url);
  };

  static count = async () => {
    return await axios.get(`${url}/count`);
  };

  static get = async (id: Franchise["id"]) => {
    return await axios.get(`${url}/${id}`);
  };

  static update = async (id: Franchise["id"], dto: UpdateFranchiseDto) => {
    return await axios.put(`${url}/${id}`, dto, {
      headers: { "Content-Type": "application/json" },
    });
  };

  static delete = async (id: Franchise["id"]) => {
    return await axios.delete(`${url}/${id}`);
  };
}
