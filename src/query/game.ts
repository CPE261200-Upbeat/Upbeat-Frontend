import { useMutation } from "@tanstack/react-query";
import { Player } from "model/player";
import axiosCustom from "./axiosCustom";
import { Account } from "@/model/account";

export const useMutationLogin = () => {
  const mutation = useMutation({
    mutationFn: async (acct: Account) => {
      const response = await axiosCustom.post<Player>("/login", acct);
      return response.data;
    },
  });

  return mutation;
};

export const useMutationSignUp = () => {
  const mutation = useMutation({
    mutationFn: async (acct: Account) => {
      console.log(acct);
      const response = await axiosCustom.post<Player>("/signUp", acct);
      return response.data;
    },
  });

  return mutation;
};
