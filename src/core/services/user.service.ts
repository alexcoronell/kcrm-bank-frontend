const url = `${import.meta.env.VITE_API_URL}/users`;

export default class UserService {
  static getAll = async () => {
    try {
      const data = await fetch(url);
      return await data.json();
    } catch (e) {
      console.error(e);
    }
  };
}
