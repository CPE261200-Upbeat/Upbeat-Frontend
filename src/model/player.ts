import { Region } from "./region";
import { CityCrew } from "./cityCrew";
import { Credential } from "./credential";

export interface Player {
  acct: Credential;
  budget: number;
  cityCenter: Region | null;
  crew: CityCrew | null;
  timeLeft: number;
  constructionPlan: string;
  defeat: boolean;
  winCount: number;
}
