const PAWN_SCALE = 0.15; // size of piece for adjustment
const BISHOP_SCALE = 0.25;
const QUEEN_SCALE = 0.35;
const ROOK_SCALE = 0.2;
let rowStart = -3.5;
let redRowStart = -2.5;
let blueRowStart = 2.5;

const Pieces = Object.freeze({
    KNIGHT: 'knight',
    BISHOP: 'bishop',
    ROOK: 'rook'
}); 

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

function createPairs(Pieces, root, bishops, startX, startZ, material){
    
    switch(Pieces)
    {
        case ('bishop'):
            const bishop1 = root.clone(`bishop${material.name}1`);
            bishop1.position = new BABYLON.Vector3( startX, 0.60, startZ);
            bishop1.scaling  = new BABYLON.Vector3(BISHOP_SCALE, BISHOP_SCALE, BISHOP_SCALE);
            bishop1.getChildMeshes().forEach(mesh => {
                mesh.material = material;
            });

            const bishop2 = root.clone(`bishop${material.name}2`);
            bishop2.position = new BABYLON.Vector3(startX*-1, .60, startZ);
            bishop2.scaling = new BABYLON.Vector3(BISHOP_SCALE,BISHOP_SCALE,BISHOP_SCALE);
            bishop2.getChildMeshes().forEach(mesh => {
                mesh.material = material;
            });

            bishops.push(bishop1);
            bishops.push(bishop2);
            console.log("bishop case");
        case ('knight'):
            const knight1 = root.clone(`knight${material.name}1`);
            knight1.position = new BABYLON.Vector3( startX, 0.60, startZ);
            knight1.scaling  = new BABYLON.Vector3(BISHOP_SCALE, BISHOP_SCALE, BISHOP_SCALE);
            knight1.getChildMeshes().forEach(mesh => {
                mesh.material = material;
            });

            const knight2 = root.clone(`knight${material.name}2`);
            knight2.position = new BABYLON.Vector3(startX*-1, .60, startZ);
            knight2.scaling = new BABYLON.Vector3(BISHOP_SCALE,BISHOP_SCALE,BISHOP_SCALE);
            knight2.getChildMeshes().forEach(mesh => {
                mesh.material = material;
            });

            bishops.push(knight1);
            bishops.push(knight2);
            console.log("knight case");
    }
    
    
}


export async function loadPieces(scene) {
    // Materials for pieces
    const mRed = new BABYLON.StandardMaterial("red", scene);
    mRed.diffuseColor = new BABYLON.Color3(1,0,0);
    const mBlue = new BABYLON.StandardMaterial("blue", scene);
    mBlue.diffuseColor = new BABYLON.Color3(0,0,1);

    const pawnRoot = await loadPiece(scene, "pawn.glb");
    const bishopRoot = await loadPiece(scene, "bishop.glb");
    const knightRoot = await loadPiece(scene, "knight.glb");
    
    const bishops = new Array();
    const pawns = new Array();


    createPawn(pawnRoot, pawns, rowStart, redRowStart, mRed, 1);
    createPawn(pawnRoot, pawns, rowStart, blueRowStart, mBlue, 1);
    createPairs('bishop', bishopRoot,bishops, -2.5, -3.5, mRed);
    createPairs('bishop', bishopRoot,bishops, -2.5, 3.5, mBlue);
    createPairs('knight', knightRoot, bishops, 1.5, -3.5, mRed);
    
    pawnRoot.setEnabled(false); //hide root, we will clone it for each pawn
    bishopRoot.setEnabled(false);
    knightRoot.setEnabled(false);

    //const pawn = await loadPiece(scene, "pawn.glb", new BABYLON.Vector3(-3.5,0.6,-2.5), redMat);
    // bishopRoot.getChildMeshes().forEach(mesh => {
    //         mesh.material = mRed;
    //     });
    // const knightRoot = await loadPiece(scene, "knight.glb");
    // knightRoot.getChildMeshes().forEach(mesh => {
    //         mesh.material = mRed;
    //     });
    // const rookRoot = await loadPiece(scene, "rook.glb");
    // rookRoot.getChildMeshes().forEach(mesh => {
    //         mesh.material = mRed;
    //     });
    // const queenRoot = await loadPiece(scene, "queen.glb");
    // queenRoot.getChildMeshes().forEach(mesh => {
    //         mesh.material = mRed;
    //     });
    // const king = await loadPiece(scene, "king.glb", new BABYLON.Vector3(1.5,0.6,-2.5), redMat); 

    //pawn.rotation = BABYLON.Vector3.Zero();

    //pawn.scaling = new BABYLON.Vector3(PAWN_SCALE, PAWN_SCALE, PAWN_SCALE);
    // bishop.scaling = new BABYLON.Vector3(BISHOP_SCALE, BISHOP_SCALE, BISHOP_SCALE);
    // rook.scaling = new BABYLON.Vector3(ROOK_SCALE, ROOK_SCALE, ROOK_SCALE);
    // queen.scaling = new BABYLON.Vector3(QUEEN_SCALE, QUEEN_SCALE, QUEEN_SCALE);

    // //pawn.position = new BABYLON.Vector3(-3.5,0.35,-2.5);
    // //bishop.position = new BABYLON.Vector3(-1.5,0.60,-3.5);
    // queen.position = new BABYLON.Vector3(-0.5,0.75,-3.5);
    // rook.position = new BABYLON.Vector3(-3.5, 0.35, -3.5);


    // result.meshes.forEach(mesh => { //apply color to result.meshes
    //     mesh.material = redMat;
    // });

    return {pawns, bishops};
}