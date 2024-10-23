import axios from "axios";

const url = `${import.meta.env.VITE_API_URL}/franchises`;

import { CreateFranchiseDto } from "../dtos/Franchise.dto";
import { Franchise } from "../interfaces/Franchise.interface";

export default class FranchiseService {
  static getAll = async () => {
    return await axios.get(url);
  };

  static save = async (dto: CreateFranchiseDto) => {
    return await axios.post(url, dto, {
      headers: { "Content-Type": "application/json" },
    });
  };

  static delete = async (id: Franchise["id"]) => {
    return await axios.delete(`${url}/${id}`);
  };
}
