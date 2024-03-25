import { Region } from "./region";
import { CityCrew } from "./cityCrew";
import { Account } from "./account";

export interface Player {
  acct: Account;
  budget: number;
  cityCenter: Region | null;
  crew: CityCrew | null;
  planRevTime: number;
  constructionPlan: string;
  isDefeat: number;
  winCount: number;
  color: number;
}
