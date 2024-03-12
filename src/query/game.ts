import { AxiosResponse } from "axios";
import { GameInfo } from "../model/game";
import { useQuery } from "@tanstack/react-query";
import { axiosCustom } from "./axiosCustom";
import { useAppDispatch } from "../redux/hook";
import { setGameInfo } from "../redux/slices/game";
export type Response<T> = Promise<AxiosResponse<T>>;



export const useQueryGameData = () => {
  const dispatch = useAppDispatch(); 
  const query = useQuery<GameInfo | undefined>({
    queryKey: ['gameData'],
    queryFn: async () => {
      const response = await axiosCustom.get<GameInfo>("/game");
      dispatch(setGameInfo(response.data));
      return response.data; 
    }
  });
  
  return query;
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

