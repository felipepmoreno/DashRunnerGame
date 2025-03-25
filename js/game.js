let scene, camera, renderer;
let gameSpeed = 0.2;
let score = 0;
let gameActive = false;

function init() {
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.01);
    
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 3, 10);
    camera.lookAt(0, 0, -20);
    
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);
    document.body.appendChild(renderer.domElement);
    
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 10, 5);
    scene.add(directionalLight);
    
    createPlayer();
    createTrack();
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', onWindowResize);
    
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    
    if (gameActive) {
        // Move obstacles
        for (let i = obstacles.length - 1; i >= 0; i--) {
            obstacles[i].position.z += gameSpeed;
            
            if (detectCollision(player, obstacles[i])) {
                endGame();
            }
            
            if (obstacles[i].position.z > 10) {
                scene.remove(obstacles[i]);
                obstacles.splice(i, 1);
                score += 10;
                document.getElementById('score').innerText = `SCORE: ${Math.floor(score)}`;
                gameSpeed += 0.0005;
            }
        }
        
        // Handle jumping animation
        if (isJumping) {
            player.position.y = 0.5 + Math.sin(Date.now() * 0.01) * 2;
            if (player.position.y <= 0.5) {
                isJumping = false;
                player.position.y = 0.5;
            }
        }
        
        // Update score based on time
        score += 0.1;
        document.getElementById('score').innerText = `SCORE: ${Math.floor(score)}`;
        
        // Move track segments
        trackSegments.forEach(segment => {
            segment.position.z += gameSpeed;
            if (segment.position.z > 20) {
                segment.position.z -= groundDepth;
            }
        });
    }
    
    renderer.render(scene, camera);
}

function startGame() {
    gameActive = true;
    score = 0;
    document.getElementById('score').textContent = 'SCORE: 0';
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('gameOver').style.display = 'none';
    
    // Reset player position
    track = 1;
    player.position.set(lanes[track], 0.5, 0);
    
    // Clear existing obstacles
    obstacles.forEach(obstacle => scene.remove(obstacle));
    obstacles = [];
    
    // Start spawning obstacles
    setTimeout(spawnObstacle, 2000);
    
    // Reset game speed
    gameSpeed = 0.2;
}

function endGame() {
    gameActive = false;
    document.getElementById('gameOver').style.display = 'block';
    
    const explosion = new THREE.PointLight(0xff0000, 5, 10);
    explosion.position.copy(player.position);
    scene.add(explosion);
    
    player.visible = false;
    
    setTimeout(() => {
        scene.remove(explosion);
    }, 1000);
}

document.getElementById('gameOver').addEventListener('click', () => {
    player.visible = true;
    startGame();
});

document.getElementById('startButton').addEventListener('click', startGame);

init();
