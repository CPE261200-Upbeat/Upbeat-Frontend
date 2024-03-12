import Stomp from "stompjs";
import { Player } from '../model/Player';
import { GameState } from '../model/GameState';
import { Config } from '../model/Config';
import { getGameInfo } from '../query/game';
import SockJS from "sockjs-client";

function useWebSocket(){

    const socket: WebSocket = new SockJS(import.meta.env.VITE_WEBSOCKET);
    const stompClient: Stomp.Client = Stomp.over(socket);
    // @ts-expect-error
    stompClient.connect({}, () => onConnected, onError);

    function handleJoin(player : Player) {
        stompClient.send("/app/game.join", {}, JSON.stringify({ player }));
    }

    function handleSetState(state:GameState) {
        stompClient.send("/app/game.setState", {}, JSON.stringify({ state }));
    }


    function executeTurn(player : Player) {
        stompClient.send("/app/game.execute", {}, JSON.stringify({ player }));
    }

    function handleSetConfig(config : Config) {
        stompClient.send("/app/game.config", {},JSON.stringify({ config }));
    }

    const onConnected = () => {
        stompClient.subscribe('/topic/public', onMessageReceived);
        console.log("test")

    }

    const onError = (err: Stomp.Message) => {
        console.log(err);
    }

    const onMessageReceived = (payload : Stomp.Message) => {
        const player : Player = JSON.parse(payload.body)
        getGameInfo()
        if(player) {
            //Winner Found handle winner found here
        }
    }

    return  { handleJoin, handleSetState, executeTurn, handleSetConfig };

}

export default useWebSocket;

