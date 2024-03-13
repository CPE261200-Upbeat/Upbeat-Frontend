import { Region } from "./region";
import { Account } from "./account";
import { CityCrew } from "./cityCrew";



export interface Player {
    acct: Account;
    budget: number;
    cityCenter: Region ;
    crew: CityCrew;
    timeLeft: number;
    constructionPlan: string;
    defeat : boolean;
  }
  
  
