const axios = require("axios");

interface Config {
  mongo_uri: string;
  baseURL: string;
  clientID: string;
  issuerBaseURL: string;
  clientSecret: string;
}

export default async (): Promise<Config> => {
  try {
    const response = await axios.post(
      "https://configapi.sahilpabale.repl.co/config"
    );
    const data: Config = response.data;
    return data;
  } catch (error) {
    return error;
  }
};
