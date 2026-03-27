export function createScene(engine,canvas) {
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera("cam", MATH.PI / 2, MATH.PI / 3, 10, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1,1,0), scene);

    createBoard(scene);

    return scene;
}

function createBoard(scene) {
    for (let x = 0; x<8; x++) {
        for (let z = 0; z<8; z++) {
            const tile = BABYLON.MeshBuilder.CreateBox(`tile_${x}_${z}`, {size: 1, height: 0.1}, scene);

            tile.position.x = x - 3.5;
            tile.position.z = z - 3.5;
        }
    }
}