const PAWN_SCALE = 0.15; // size of piece for adjustment
const BISHOP_SCALE = 0.25;
const QUEEN_SCALE = 0.35;
const ROOK_SCALE = 0.2;
let rowStart = -3.5;
let redRowStart = -2.5;
let blueRowStart = 2.5;

async function loadPiece(scene, fileName) {
    const result = await BABYLON.SceneLoader.ImportMeshAsync("", "models/", fileName, scene);
    return result.meshes[0];
};

function createPawn(root, pawns, startX, startZ, material, step = 1) {
    
    for( let i=0; i < 8; i++) {
        if ( i < 2) {
            console.log(`Creating piece ${i+1}`);

        }


        const x = startX + i * step; //increment along the row
        const pawn = root.clone(`pawn${material.name}${i+1}`);
        pawn.position = new BABYLON.Vector3( x, 0.35, startZ);
        pawn.scaling  = new BABYLON.Vector3(PAWN_SCALE, PAWN_SCALE, PAWN_SCALE);
        pawn.getChildMeshes().forEach(mesh => {
            mesh.material = material;
        });
        pawns.push(pawn);
    }
}


export async function loadPieces(scene) {
    // Materials for pieces
    const mRed = new BABYLON.StandardMaterial("red", scene);
    mRed.diffuseColor = new BABYLON.Color3(1,0,0);
    const mBlue = new BABYLON.StandardMaterial("blue", scene);
    mBlue.diffuseColor = new BABYLON.Color3(0,0,1);

    const pawnRoot = await loadPiece(scene, "pawn.glb");
    const pawns = new Array();


    createPawn(pawnRoot, pawns, rowStart, redRowStart, mRed, 1);
    createPawn(pawnRoot, pawns, rowStart, blueRowStart, mBlue, 1);

    
    pawnRoot.setEnabled(false); //hide root, we will clone it for each pawn

    //const pawn = await loadPiece(scene, "pawn.glb", new BABYLON.Vector3(-3.5,0.6,-2.5), redMat);
    const bishop = await loadPiece(scene, "bishop.glb");
    bishop.getChildMeshes().forEach(mesh => {
            mesh.material = mRed;
        });
    // const knight = await loadPiece(scene, "knight.glb", new BABYLON.Vector3(-1.5,0.6,-2.5), redMat);
    const rook = await loadPiece(scene, "rook.glb");
    rook.getChildMeshes().forEach(mesh => {
            mesh.material = mRed;
        });
    const queen = await loadPiece(scene, "queen.glb");
    queen.getChildMeshes().forEach(mesh => {
            mesh.material = mRed;
        });
    // const king = await loadPiece(scene, "king.glb", new BABYLON.Vector3(1.5,0.6,-2.5), redMat); 

    //pawn.rotation = BABYLON.Vector3.Zero();

    //pawn.scaling = new BABYLON.Vector3(PAWN_SCALE, PAWN_SCALE, PAWN_SCALE);
    bishop.scaling = new BABYLON.Vector3(BISHOP_SCALE, BISHOP_SCALE, BISHOP_SCALE);
    rook.scaling = new BABYLON.Vector3(ROOK_SCALE, ROOK_SCALE, ROOK_SCALE);
    queen.scaling = new BABYLON.Vector3(QUEEN_SCALE, QUEEN_SCALE, QUEEN_SCALE);

    //pawn.position = new BABYLON.Vector3(-3.5,0.35,-2.5);
    bishop.position = new BABYLON.Vector3(-1.5,0.60,-3.5);
    queen.position = new BABYLON.Vector3(-0.5,0.75,-3.5);
    rook.position = new BABYLON.Vector3(-3.5, 0.35, -3.5);


    // result.meshes.forEach(mesh => { //apply color to result.meshes
    //     mesh.material = redMat;
    // });

    return {pawns, bishop, rook, queen};
}