import { Chess } from "https://esm.sh/chess.js";

export const game = new Chess();

export function tryMove(from, to) {
    return game.move({ from, to});
}