import Stomp from "stompjs";
import { getGameInfo } from '../query/game';
import { Player } from "../model/player";
import { GameState } from "../model/gameState";
import { Config } from "../model/config";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import SockJS from "sockjs-client/dist/sockjs";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { selectWebsocket, setIsConnected, setStompClient } from "../redux/slices/websocket";


function useWebSocket(){
    const dispatch = useAppDispatch()
    const webSocket  = useAppSelector(selectWebsocket)

    const connect = (username : string) => {
        try {
            const socket: WebSocket = new SockJS(`http://localhost:8080/ws`);
            const stompClient: Stomp.Client = Stomp.over(socket);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            stompClient.connect({}, () => onConnected(stompClient , username), onError);
        } catch (e) {
            console.log(e);
        }
    }

    const onConnected = (stompClient : Stomp.Client, username : string) => {
        stompClient.subscribe('/topic/public', onMessageReceived);
        stompClient.send("/app/game.addUser", {}, JSON.stringify({ username : username }));
        dispatch(setIsConnected(true))
        dispatch(setStompClient(stompClient))
    }

    function handleJoin(player : Player) {
        if (webSocket.stompClient && webSocket.stompClient.connected) {
            webSocket.stompClient.send("/app/game.join", {}, JSON.stringify({ player }));
        }
    }

    function handleSetState(state:GameState) {
        if (webSocket.stompClient && webSocket.stompClient.connected) {
           webSocket.stompClient.send("/app/game.setState", {}, JSON.stringify({ state }));
        }
    }


    function executeTurn(player : Player) {
        if (webSocket.stompClient && webSocket.stompClient.connected) {
            webSocket.stompClient.send("/app/game.execute", {}, JSON.stringify({ player }));
        }
    }

    function handleSetConfig(config : Config) {
        if (webSocket.stompClient && webSocket.stompClient.connected) {
            webSocket.stompClient.send("/app/game.config", {},JSON.stringify({ config }));
        }
    }

  

    const onMessageReceived = (payload : Stomp.Message) => {
        const player : Player = JSON.parse(payload.body)
        getGameInfo()
        if(player) {
            //Winner Found handle winner found here
        }
    }

    return  { connect , handleJoin, handleSetState, executeTurn, handleSetConfig };

}

export default useWebSocket;

const onError = (err: Stomp.Message) => {
    console.log(err);
}