import axios, { AxiosResponse } from "axios";

export type Response<T> = Promise<AxiosResponse<T>>;
function getAxiosInstance() {
  return axios.create({ baseURL: getServer() });
}

// export function newPlayer(name: string): Response<Player> {
//   return getAxiosInstance().post(`/player`, encodeURIComponent(name));
// }

// export function getPlayer(name: string): Response<Player> {
//   return getAxiosInstance().get(`/player/${encodeURIComponent(name)}`);
// }

// export function playerClick(name: string): Response<Player> {
//   return getAxiosInstance().put(`/player/${encodeURIComponent(name)}`);
// }

// export function getLeaderboard(): Response<Player[]> {
//   return getAxiosInstance().get("/player/leaderboard");
// }

// export function getCurrentPlayer(): string | null {
//   return window.localStorage.getItem("player");
// }

// export function setCurrentPlayer(player: string | null): void {
//   if (!player) return window.localStorage.removeItem("player");
//   window.localStorage.setItem("player", player);
// }

export function getServer(): string {
  return window.localStorage.getItem("server") || import.meta.env.VITE_SERVER;
}

export function setServer(server: string | null): void {
  if (!server) return window.localStorage.removeItem("server");
  window.localStorage.setItem("server", server);
}

export async function getGameInfo(): Promise<GameInfoResponse> {
  try {
    const response = await axios.get<GameInfoResponse>("/game");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch game information");
  }
}

export interface GameInfoResponse {
  config: {
    m: number;
    n: number;
    initPlanMin: number;
    initPlanSec: number;
    initBudget: number;
    initCenterDep: number;
    planRevMin: number;
    planRevSec: number;
    revCost: number;
    maxDep: number;
    interestPct: number;
  };
  players: {
    list: Player[];
    turn: number;
  };
  map: {
    regions: Region[][];
  };
}

export interface Player {
  name: string;
  bindings: {
    deposit: number;
    isDone: number;
    budget: number;
  };
  budget: number;
  cityCenter: {
    isCityCenter: boolean;
    deposit: number;
    pos: {
      row: number;
      col: number;
    };
  };
  ownedRegions: {
    isCityCenter: boolean;
    deposit: number;
    pos: {
      row: number;
      col: number;
    };
  }[];
  crew: {
    pos: {
      row: number;
      col: number;
    };
  };
  timeLeft: number;
  state: number;
  constructionPlan: string;
}

export interface Region {
  isCityCenter: boolean;
  deposit: number;
  pos: {
    row: number;
    col: number;
  };
}
