const colors = {
    player: 0x00ffff,
    ground: 0x000033,
    obstacle: 0xff00ff,
    gridLines: 0x0066ff,
    particles: [0x00ffff, 0xff00ff, 0xffff00]
};

function detectCollision(obj1, obj2) {
    const box1 = new THREE.Box3().setFromObject(obj1);
    const box2 = new THREE.Box3().setFromObject(obj2);
    return box1.intersectsBox(box2);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
