import axios, { AxiosResponse } from "axios";
import { GameInfo } from "../model/game";
import { useDispatch } from "react-redux";
import { setGameInfo } from "../redux/slices/game";
export type Response<T> = Promise<AxiosResponse<T>>;

 const axiosCustom = axios.create({
	// Configuration
	baseURL: import.meta.env.VITE_SERVER,
	timeout: 8000,
	headers: {},
});


export async function getGameInfo() {
  const dispatch  = useDispatch()
  try {
    const response = await axiosCustom.get<GameInfo>("/game");
    dispatch(setGameInfo(response.data))
    
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

