import Stomp from "stompjs";
import { GameState } from "../model/gameState";
import { Config } from "../model/config";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import SockJS from "sockjs-client/dist/sockjs";

import { GameInfo } from "model/game";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  selectWebSocket,
  setIsConnected,
  setStompClient,
} from "@/redux/slices/websocket";
import { setGameInfo } from "@/redux/slices/game";
import { Player } from "@/model/player";
import { ColorResult } from "react-color";

function useWebSocket() {
  const dispatch = useAppDispatch();
  const webSocket = useAppSelector(selectWebSocket);
  const serverUrl = import.meta.env.VITE_SERVER;

  const connect = () => {
    try {
      const socket: WebSocket = new SockJS(`${serverUrl}/ws`);
      const stompClient: Stomp.Client = Stomp.over(socket);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      stompClient.connect({}, () => onConnected(stompClient), onError);
      stompClient.debug = () => {};
    } catch (e) {
      console.log(e);
    }
  };

  const onConnected = (stompClient: Stomp.Client) => {
    stompClient.subscribe("/topic/public", onMessageReceived);
    dispatch(setIsConnected(true));
    dispatch(setStompClient(stompClient));
  };

  function handleJoin(player: Player) {
    if (webSocket.stompClient && webSocket.stompClient.connected) {
      webSocket.stompClient.send("/app/game.join", {}, JSON.stringify(player));
    }
  }

  function handleDisconnect(player: Player) {
    if (webSocket.stompClient && webSocket.stompClient.connected) {
      webSocket.stompClient.send(
        "/app/game.disconnect",
        {},
        JSON.stringify(player)
      );
    }
  }

  function handleSetState(state: GameState) {
    if (webSocket.stompClient && webSocket.stompClient.connected) {
      webSocket.stompClient.send(
        "/app/game.setState",
        {},
        JSON.stringify(state)
      );
    }
  }
  function handleTurnBegin(player: Player) {
    if (webSocket.stompClient && webSocket.stompClient.connected) {
      console.log(player);
      webSocket.stompClient.send(
        "/app/game.turnBegin",
        {},
        JSON.stringify(player)
      );
    }
  }

  function executeTurn(constructionPlan: string, timeLeft: number) {
    if (webSocket.stompClient && webSocket.stompClient.connected) {
      webSocket.stompClient.send(
        "/app/game.execute",
        {},
        JSON.stringify({ constructionPlan, timeLeft })
      );
    }
  }

  function handleSetConfig(config: Config) {
    if (webSocket.stompClient && webSocket.stompClient.connected) {
      webSocket.stompClient.send(
        "/app/game.config",
        {},
        JSON.stringify({ config })
      );
    }
  }

  function handleSetColor(player: Player, color: number) {
    console.log({ player, color });
    if (webSocket.stompClient && webSocket.stompClient.connected) {
      webSocket.stompClient.send(
        "/app/game.setColor",
        {},
        JSON.stringify({ player, color })
      );
    }
  }

  function getData() {
    if (webSocket.stompClient && webSocket.stompClient.connected) {
      webSocket.stompClient.send("/app/game.getData", {}, "");
    }
  }
  const onMessageReceived = (payload: Stomp.Message) => {
    const game: GameInfo = JSON.parse(payload.body);
    dispatch(setGameInfo(game));
  };

  return {
    connect,
    handleTurnBegin,
    handleJoin,
    handleDisconnect,
    handleSetState,
    handleSetConfig,
    handleSetColor,
    executeTurn,
    getData,
  };
}

export default useWebSocket;

const onError = (err: Stomp.Message) => {
  console.log(err);
};
