const url = `${import.meta.env.VITE_API_URL}/franchises`;

import { CreateFranchiseDto } from "../dtos/Franchise.dto";

export default class FranchiseService {
  static getAll = async () => {
    try {
      const data = await fetch(url);
      return await data.json();
    } catch (e) {
      console.error(e);
    }
  };

  static save = async (dto: CreateFranchiseDto) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    try {
      return await fetch(url, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(dto),
      });
    } catch (e) {
      console.log("Error: ", e);
      return e;
    }
  };
}
