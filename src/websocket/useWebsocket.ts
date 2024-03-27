import Stomp from "stompjs";
import { Config } from "../model/config";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import SockJS from "sockjs-client/dist/sockjs";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  selectWebSocket,
  setIsConnected,
  setStompClient,
} from "@/redux/slices/websocket";
import { setGameInfo } from "@/redux/slices/game";
import { Player } from "@/model/player";
import { GameState } from "@/model/gameState";

const useWebSocket = () => {
  const dispatch = useAppDispatch();
  const webSocket = useAppSelector(selectWebSocket);
  const serverUrl = import.meta.env.VITE_SERVER;

  const connect = () => {
    try {
      const socket = new SockJS(`${serverUrl}/ws`);
      const stompClient = Stomp.over(socket);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      stompClient.connect({}, () => onConnected(stompClient), onError);
      stompClient.debug = () => {};
    } catch (e) {
      console.log(e);
    }
  };

  const onConnected = (stompClient : Stomp.Client) => {
    stompClient.subscribe("/topic/public", onMessageReceived);
    dispatch(setIsConnected(true));
    dispatch(setStompClient(stompClient));
  };

  const handleJoin = (player : Player ) => {
    if (webSocket.stompClient && webSocket.stompClient.connected) {
      webSocket.stompClient.send("/app/game.join", {}, JSON.stringify(player));
    }
  };

  const handleDisconnect = (player : Player) => {
    if (webSocket.stompClient && webSocket.stompClient.connected) {
      webSocket.stompClient.send(
        "/app/game.disconnect",
        {},
        JSON.stringify(player)
      );
    }
  };

  const handleSetState = (state : GameState) => {
    if (webSocket.stompClient && webSocket.stompClient.connected) {
      webSocket.stompClient.send(
        "/app/game.setState",
        {},
        JSON.stringify(state)
      );
    }
  };

  const executeTurn = () => {
    if (webSocket.stompClient && webSocket.stompClient.connected) {
      webSocket.stompClient.send(
        "/app/game.execute",
        {},
        ""
      );
    }
  };

  const handleSetConfig = (config : Config) => {
    if (webSocket.stompClient && webSocket.stompClient.connected) {
      webSocket.stompClient.send(
        "/app/game.config",
        {},
        JSON.stringify({ config })
      );
    }
  };

  const handleSetPlan = (constructionPlan :string, planRevTime : number) => {
    if (webSocket.stompClient && webSocket.stompClient.connected) {
      webSocket.stompClient.send(
        "/app/game.setPlan",
        {},
        JSON.stringify({ constructionPlan, planRevTime })
      );
    }
  };

  const handleSetColor = (player : Player, color : number) => {
    if (webSocket.stompClient && webSocket.stompClient.connected) {
      webSocket.stompClient.send(
        "/app/game.setColor",
        {},
        JSON.stringify({ player, color })
      );
    }
  };

  const getData = () => {
    if (webSocket.stompClient && webSocket.stompClient.connected) {
      webSocket.stompClient.send("/app/game.getData", {}, "");
    }
  };

  const onMessageReceived = (payload : Stomp.Message) => {
    const game = JSON.parse(payload.body);
    dispatch(setGameInfo(game));
  };

  return {
    connect,
    handleJoin,
    handleDisconnect,
    handleSetState,
    handleSetPlan,
    handleSetConfig,
    handleSetColor,
    executeTurn,
    getData,
  };
};

export default useWebSocket;

const onError = (err : Stomp.Message) => {
  console.log(err);
};
