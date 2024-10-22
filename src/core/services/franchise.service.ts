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

  static save = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    try {
      const data = fetch(url, {
        method: "POST",
        headers: myHeaders,
      });
      return data;
    } catch (e) {
      console.error(e);
    }
  };
}
