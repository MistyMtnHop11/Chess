export function setupInput(scene, onTileClick) {
    scene.onPointerObservable.add((pointerInfo) => {
        if (pointerInfo.type !== 1) return;
        if(!pointerInfo.pickInfo.hit) return;
        const mesh = pointerInfo.pickInfo.pickedMesh;
        if (!mesh || !mesh.name.startsWith("tile_")) return;
        onTileClick(mesh);
    });    
};
