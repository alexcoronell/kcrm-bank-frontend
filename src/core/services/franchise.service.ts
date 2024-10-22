const url = `${import.meta.env.VITE_API_URL}/franchises`;

export default class FranchiseService {
  static getAll = async () => {
    try {
      const data = await fetch(url);
      return await data.json();
    } catch (e) {
      console.error(e);
    }
  };
}