import { createScene } from "./scene.js";
import { setupInput } from "./input.js";
import { game } from "./game.js";
import { loadPieces } from "./pieces.js";

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas,true);
const scene = createScene(engine,canvas);

async function init() {
    await loadPieces(scene);
    setupInput(scene, handleClick);
}

init();

engine.runRenderLoop(() => {
    scene.render();
});


function handleClick(mesh) {
    const [, x, z] = mesh.name.split("_");
    console.log(`Clicked tile: x=${x}, z=${z}`);
}