export function setupInput(scene, onTileClick) {
    scene.onPointObservable.add((pointerInfo) => {
        if (pointerInfo.pickInfo.hit) {
            const mesh = pointerInfo.pickInfo.pickedMesh;
            if (mesh.name.startsWith("tile_")) {
                onTileClick(mesh);
            }
        }
    });
}