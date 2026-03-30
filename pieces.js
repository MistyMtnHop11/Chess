const PIECE_SCALE = 0.2; // size of piece for adjustment

export async function loadPieces(scene) {
    const result = await BABYLON.SceneLoader.ImportMeshAsync("", "models/", "pawn.glb", scene);

    const redMat = new BABYLON.StandardMaterial("red", scene);
    redMat.diffuseColor = new BABYLON.Color3(1,0,0);

    const pawn = result.meshes[0];  
    pawn.rotation = BABYLON.Vector3.Zero();
    pawn.scaling = new BABYLON.Vector3(PIECE_SCALE, PIECE_SCALE, PIECE_SCALE);
    pawn.position = new BABYLON.Vector3(-3.5,0.6,-2.5);


    result.meshes.forEach(mesh => { //apply color to result.meshes
        mesh.material = redMat;
    });

    return pawn;
}