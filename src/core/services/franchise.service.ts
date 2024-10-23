const url = `${import.meta.env.VITE_API_URL}/franchises`;

import { CreateFranchiseDto } from "../dtos/Franchise.dto";
import { Franchise } from "../interfaces/Franchise.interface";

export default class FranchiseService {
  static getAll = async () => {
    try {
      const data = await fetch(url);
      return data.json();
    } catch (e) {
      return e;
    }
  };

  static save = async (dto: CreateFranchiseDto) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    try {
      const data = await fetch(url, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(dto),
      });
      return await data.json();
    } catch (e) {
      return e;
    }
  };

  static delete = async (id: Franchise["id"]) => {
    try {
      return await fetch(`${url}/${id}`, {
        method: "DELETE",
      });
    } catch (e) {
      console.error(e);
      return e;
    }
  };
}
