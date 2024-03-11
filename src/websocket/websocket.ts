import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { Player } from '../model/Player';
import { GameState } from '../model/GameState';
import { Config } from '../model/Config';
import { getGameInfo } from '../query/game';

const socket = new SockJS(import.meta.env.VITE_WEBSOCKET);
const stompClient = Stomp.over(socket);

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

const onConnected = (stompClient : Stomp.Client) => {
    stompClient.subscribe('/topic/public', onMessageReceived);
}

const onMessageReceived = (payload : Stomp.Message) => {
    const player : Player = JSON.parse(payload.body)
    getGameInfo()
    if(player) {
        //Winner Found handle winner found here
    }
}