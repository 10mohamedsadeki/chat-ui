import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getGroups = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/groups/list`);
    return res.data;
  } catch (err) {
    console.error("Error fetching groups:", err);
    return null;
  }
};
