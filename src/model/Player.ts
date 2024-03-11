import { CityCrew } from "./CityCrew";
import { Region } from "./Region";

export interface Player {
    name: string;
    budget: number;
    cityCenter: Region ;
    crew: CityCrew;
    timeLeft: number;
    constructionPlan: string;
    defeat : boolean;
  }
  
  