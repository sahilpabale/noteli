import axios from "axios";

const api = "https://noteli-api.sahilpabale.me/api";

const pingServer = async (): Promise<boolean> => {
  try {
    const response = await axios.get(`${api}/`);
    return !response.data.isError;
  } catch (error) {
    return false;
  }
};

export default pingServer;
