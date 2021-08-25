export interface Config {
  mongo_uri: string;
  baseURL: string;
  clientID: string;
  issuerBaseURL: string;
  clientSecret: string;
}

export async function getConfig(): Promise<Config> {
  try {
    const data: Config = {
      mongo_uri: process.env.MONGO_URI!,
      baseURL: process.env.BASE_URL!,
      clientID: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
      issuerBaseURL: process.env.ISSUER_BASE_URL!,
    };
    return data;
  } catch (error) {
    return error;
  }
}
