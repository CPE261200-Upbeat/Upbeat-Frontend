import { Account } from "./Account";
import { CityCrew } from "./CityCrew";
import { Region } from "./Region";

export interface Player {
    acct: Account;
    budget: number;
    cityCenter: Region ;
    crew: CityCrew;
    timeLeft: number;
    constructionPlan: string;
    defeat : boolean;
  }
  
  