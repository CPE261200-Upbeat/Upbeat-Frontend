import axios, { AxiosResponse } from "axios";
import { GameInfoResponse } from "../model/Game";

export type Response<T> = Promise<AxiosResponse<T>>;

 const axiosCustom = axios.create({
	// Configuration
	baseURL: import.meta.env.VITE_SERVER,
	timeout: 8000,
	headers: {},
});

// We should modified this function to store game info in global store and use effect for each page will do a job?
export async function getGameInfo(): Promise<GameInfoResponse> {
  try {
    const response = await axiosCustom.get<GameInfoResponse>("/game");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch game information");
  }
}

export async function Login(): Promise<String> {
  try {
    const response = await axiosCustom.get<String>("/login");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch game information");
  }
}


export async function SignUp(): Promise<String> {
  try {
    const response = await axiosCustom.get<String>("/signIn");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch game information");
  }
}

