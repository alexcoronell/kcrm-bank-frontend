const url = `${import.meta.env.VITE_API_URL}/franchidses`;

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
      const response = await fetch(url, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(dto),
      });
      const { status, ok } = await response;
      const data = await response.json();
      return { status, ok, data };
    } catch (e) {
      console.log("***** error service *****", e);
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
