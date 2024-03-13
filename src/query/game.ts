import { AxiosResponse } from "axios";
import { GameInfo } from "../model/game";
import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosCustom } from "./axiosCustom";
import { useAppDispatch } from "../redux/hook";
import { setGameInfo } from "../redux/slices/game";
import { Player } from "../model/player";
import { setPlayer } from "../redux/slices/player";
import { Credential } from "../model/credential";
export type Response<T> = Promise<AxiosResponse<T>>;

export const useQueryGameData = () => {
  const dispatch = useAppDispatch();
  const query = useQuery<GameInfo | undefined>({
    queryKey: ["gameData"],
    queryFn: async () => {
      const response = await axiosCustom.get<GameInfo>("/game");
      dispatch(setGameInfo(response.data));
      return response.data;
    },
  });

  return query;
};
export const useMutationLogin = () => {
  const dispatch = useAppDispatch();

  const mutation = useMutation({
    mutationFn: async (credential: Credential) => {
      const response = await axiosCustom.post<Player>("/login", credential);
      dispatch(setPlayer(response.data));
      return response.data;
    },
  });

  return mutation;
};

export const useMutationSignUp = () => {
  const dispatch = useAppDispatch();

  const mutation = useMutation({
    mutationFn: async (credential: Credential) => {
      const response = await axiosCustom.post<Player>("/signUp", credential);
      dispatch(setPlayer(response.data));
      return response.data;
    },
  });

  return mutation;
};
