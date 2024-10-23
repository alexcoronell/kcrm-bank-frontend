const url = `${import.meta.env.VITE_API_URL}/sales`;

export default class SaleService {
  static getAll = async () => {
    try {
      const data = await fetch(url);
      return await data.json();
    } catch (e) {
      console.error(e);
    }
  };
}
