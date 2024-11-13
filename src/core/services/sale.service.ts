import axios from "axios";

const url = `${import.meta.env.VITE_API_URL}/sales`;

/* Interfaces */
import type { Sale } from "../interfaces/Sale.interface";

/* DTO's */
import type { CreateSaleDto, UpdateSaleDto } from "../dtos/Sale.dto";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export default class SaleService {
  static save = async (dto: CreateSaleDto) => {
    return await axios.post(url, dto, { withCredentials: true });
  };

  static getAll = async (page = 1, limit = 10) => {
    return await axios.get(`${url}?page=${page}&limit=${limit}`, {
      withCredentials: true,
    });
  };

  static count = async () => {
    return await axios.get(`${url}/count`, { withCredentials: true });
  };

  static get = async (id: Sale["id"]) => {
    return await axios.get(`${url}/${id}`, { withCredentials: true });
  };

  static update = async (id: Sale["id"], dto: UpdateSaleDto) => {
    return await axios.put(`${url}/${id}`, dto, { withCredentials: true });
  };

  static delete = async (id: Sale["id"]) => {
    return await axios.delete(`${url}/${id}`, { withCredentials: true });
  };
}
