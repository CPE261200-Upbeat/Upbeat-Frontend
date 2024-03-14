import { Region } from "./region";
import { CityCrew } from "./cityCrew";
import { AccountPair } from "./account";



export interface Player {
    acct: AccountPair<string,string>;
    budget: number;
    cityCenter: Region | null;
    crew: CityCrew | null;
    timeLeft: number;
    constructionPlan: string;
    defeat : boolean;
    winCount: number;
  }
  
  
