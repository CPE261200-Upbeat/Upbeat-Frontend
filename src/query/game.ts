import { AxiosResponse } from "axios";
import { useMutation } from "@tanstack/react-query";
import { Player } from "model/player";
import axiosCustom from "./axiosCustom";
import { Credential } from "model/credential";
export type Response<T> = Promise<AxiosResponse<T>>;


export const useMutationLogin = () => {

  const mutation = useMutation({
    mutationFn: async (credential: Credential) => {
      const response = await axiosCustom.post<Player>("/login", credential);
      return response.data;
    },
  });

  return mutation;
};

export const useMutationSignUp = () => {

  const mutation = useMutation({
    mutationFn: async (credential: Credential) => {
      const response = await axiosCustom.post<Player>("/signUp", credential);
      return response.data;
    },
  });

  return mutation;
};
