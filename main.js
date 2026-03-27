import { createScene } from "./scene.js";
import { setupInput } from "./input.js";
import { game } from "./game.js";

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas,true);

const scene = createScene(engine,canvas);

setupInput(scene, handleClick);

engine.runRenderLoop(() => {
    scene.render();
});