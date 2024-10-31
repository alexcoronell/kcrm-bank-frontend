import axios from "axios";

const url = `${import.meta.env.VITE_API_URL}/products`;

/* Interfaces */
import type { Product } from "../interfaces/Product.interface";

/* DTO's */
import type { CreateProductDto, UpdateProductDto } from "../dtos/Product.dto";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export default class ProductService {
  static save = async (dto: CreateProductDto) => {
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

  static get = async (id: Product["id"]) => {
    return await axios.get(`${url}/${id}`);
  };

  static update = async (id: Product["id"], dto: UpdateProductDto) => {
    return await axios.put(`${url}/${id}`, dto, {
      headers: { "Content-Type": "application/json" },
    });
  };

  static delete = async (id: Product["id"]) => {
    return await axios.delete(`${url}/${id}`);
  };
}