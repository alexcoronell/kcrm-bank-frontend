const url = `${import.meta.env.VITE_API_URL}/user-types`;

export default class UserTypeService {
  static getAll = async () => {
    try {
      const data = await fetch(url);
      return await data.json();
    } catch (e) {
      console.error(e);
    }
  };
}