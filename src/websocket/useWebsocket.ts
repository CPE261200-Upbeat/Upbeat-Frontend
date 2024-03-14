import Stomp from "stompjs";
import { GameState } from "../model/gameState";
import { Config } from "../model/config";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import SockJS from "sockjs-client/dist/sockjs";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  selectWebSocket,
  setIsConnected,
  setStompClient,
} from "../redux/slices/websocket";
import { Credential } from "model/credential";
import { GameInfo } from "model/game";
import { setGameInfo } from "../redux/slices/game";

function useWebSocket() {
  const dispatch = useAppDispatch();
  const webSocket = useAppSelector(selectWebSocket);

  const connect = () => {
    try {
      const socket: WebSocket = new SockJS(`${process.env.VITE_SERVER}/ws`);
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

  function handleJoin(acct: Credential) {
    if (webSocket.stompClient && webSocket.stompClient.connected) {
      webSocket.stompClient.send("/app/game.join", {}, JSON.stringify(acct));
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
    handleJoin,
    getData,
    handleSetState,
    executeTurn,
    handleSetConfig,
  };
}

export default useWebSocket;

const onError = (err: Stomp.Message) => {
  console.log(err);
};
