let player;
let track = 1;
let isJumping = false;
const lanes = [-4, 0, 4];

function createPlayer() {
    const playerGeometry = new THREE.BoxGeometry(1, 1, 1);
    const playerMaterial = new THREE.MeshPhongMaterial({ 
        color: colors.player,
        emissive: colors.player,
        emissiveIntensity: 0.5,
        shininess: 15
    });
    player = new THREE.Mesh(playerGeometry, playerMaterial);
    player.position.set(lanes[track], 0.5, 0);
    scene.add(player);
}

function handleKeyDown(event) {
    if (!gameActive) return;
    
    switch (event.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
            if (track > 0) {
                track--;
                player.position.x = lanes[track];
            }
            break;
            
        case 'ArrowRight':
        case 'd':
        case 'D':
            if (track < 2) {
                track++;
                player.position.x = lanes[track];
            }
            break;
            
        case ' ':
            if (!isJumping) {
                isJumping = true;
                player.position.y = 0.5;
            }
            break;
    }
}
