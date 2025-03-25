let obstacles = [];
let trackSegments = [];
const groundDepth = 800;

function createTrack() {
    // Main track
    const trackGeometry = new THREE.PlaneGeometry(15, groundDepth);
    const trackMaterial = new THREE.MeshPhongMaterial({ 
        color: colors.ground,
        shininess: 10,
        transparent: true,
        opacity: 0.8
    });
    const track = new THREE.Mesh(trackGeometry, trackMaterial);
    track.rotation.x = -Math.PI / 2;
    track.position.z = -groundDepth / 2;
    scene.add(track);
    trackSegments.push(track);
    
    // Grid lines
    for (let i = 0; i < groundDepth; i += 10) {
        const lineGeometry = new THREE.BoxGeometry(15, 0.05, 0.05);
        const lineMaterial = new THREE.MeshPhongMaterial({ 
            color: colors.gridLines,
            emissive: colors.gridLines,
            emissiveIntensity: 0.5
        });
        const line = new THREE.Mesh(lineGeometry, lineMaterial);
        line.position.set(0, 0, -i);
        scene.add(line);
        trackSegments.push(line);
    }
    
    // Side lines
    for (let i = -groundDepth/2; i < groundDepth/2; i += 10) {
        [-7.5, 7.5].forEach(x => {
            const lineGeometry = new THREE.BoxGeometry(0.05, 0.05, 10);
            const lineMaterial = new THREE.MeshPhongMaterial({
                color: colors.gridLines,
                emissive: colors.gridLines,
                emissiveIntensity: 0.5
            });
            const line = new THREE.Mesh(lineGeometry, lineMaterial);
            line.position.set(x, 0, i);
            scene.add(line);
            trackSegments.push(line);
        });
    }
    
    // Lane dividers
    for (let i = -groundDepth/2; i < groundDepth/2; i += 10) {
        for (let j = 0; j < lanes.length - 1; j++) {
            const lineGeometry = new THREE.BoxGeometry(0.05, 0.05, 10);
            const lineMaterial = new THREE.MeshPhongMaterial({
                color: colors.gridLines,
                emissive: colors.gridLines,
                emissiveIntensity: 0.3
            });
            const line = new THREE.Mesh(lineGeometry, lineMaterial);
            line.position.set((lanes[j] + lanes[j+1]) / 2, 0, i);
            scene.add(line);
            trackSegments.push(line);
        }
    }
}

function spawnObstacle() {
    if (!gameActive) return;
    
    const laneIndex = Math.floor(Math.random() * 3);
    const obstacleGeometry = new THREE.BoxGeometry(2, 1, 1);
    const obstacleMaterial = new THREE.MeshPhongMaterial({ 
        color: colors.obstacle,
        emissive: colors.obstacle,
        emissiveIntensity: 0.7
    });
    
    const obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
    obstacle.position.set(lanes[laneIndex], 0.5, -groundDepth / 2);
    scene.add(obstacle);
    obstacles.push(obstacle);
    
    const nextSpawnTime = 1000 + Math.random() * 1500;
    setTimeout(spawnObstacle, nextSpawnTime);
}
