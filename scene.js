export function createScene(engine,canvas) {
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera("cam", Math.PI / 2, Math.PI / 3, 10, BABYLON.Vector3.Zero(), scene);
    //lets add some vertical limits, beta is up/down angle (its measured in radians from top: 0 straight down, math.pi/2: looking from side, math.pi: looking from below)
    camera.lowerBetaLimit = 0.1; //cant go under board
    camera.upperBetaLimit = Math.PI / 2; //cant go past straight overhead

    //zoom limits -> rad = distance from target
    camera.lowerRadiusLimit = 5; // cant get closer that 5 units
    camera.upperRadiusLimit = 20; // cant get further than 20 units

    camera.minZ = 0.01;


    camera.attachControl(canvas, true);

    new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1,1,0), scene);

    createBoard(scene);

    return scene;
}

function createBoard(scene) {
    const whiteMat = new BABYLON.StandardMaterial("white", scene);
    whiteMat.diffuseColor = new BABYLON.Color3(1,1,1);

    const blackMat = new BABYLON.StandardMaterial("black", scene);
    blackMat.diffuseColor = new BABYLON.Color3(0.1,0.1,0.1);


    for (let x = 0; x<8; x++) {
        for (let z = 0; z<8; z++) {
            const tile = BABYLON.MeshBuilder.CreateBox(`tile_${x}_${z}`, {size: 1, height: 0.1}, scene);

            tile.position.x = x - 3.5;
            tile.position.z = z - 3.5;
            tile.material = ( x + z ) % 2 === 0 ? whiteMat : blackMat;
        }
    }
}