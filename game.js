import { Chess } from "https://cdn.skypack.dev/chess.js";

export const game = new Chess();

export function tryMove(from, to) {
    return game.move({ from, to});
}