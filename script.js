// script.js

// 1. Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 2. Earth geometry and materials
const earthRadius = 1;
const earthGeometry = new THREE.SphereGeometry(earthRadius, 32, 32);

// Load textures (replace with your actual image paths!)
const textureLoader = new THREE.TextureLoader();
const earthDayMap = textureLoader.load('Images/Day.jpg'); // Day side texture
const earthSpecMap = textureLoader.load('Images/Day_night.webp'); // Specular map for oceans/shininess
const earthCloudsMap = textureLoader.load('Images/Clouds.png');
const starsTexture = new THREE.TextureLoader().load('Images/stars.jpg');
scene.background = starsTexture;

const earthMaterial = new THREE.MeshPhongMaterial({
    map: earthDayMap,
    specularMap: earthSpecMap,
    shininess: 10, // Adjust for more or less shine
    // Add night map for city lights effect
    combine: THREE.MixOperation, // Uncomment and adjust to blend day/night maps
    transparent: true // If using an alpha channel in your daymap for some reason
});

const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earthMesh);

// Optional: Add a separate sphere for clouds
// Clouds (fixed)
const cloudsGeometry = new THREE.SphereGeometry(earthRadius + 0.003, 64, 64); // smoother wrap

// Load cloud texture (must be PNG with transparency)
const cloudsMaterial = new THREE.MeshPhongMaterial({
    map: earthCloudsMap,
    transparent: true,
    opacity: 0.8,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending // Makes clouds appear light
});

const cloudsMesh = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
scene.add(cloudsMesh);



// 3. Lighting
// Ambient light to illuminate the entire scene
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

// Directional light to simulate the sun
const sunLight = new THREE.DirectionalLight(0xffffff, 1);
sunLight.position.set(5, 3, 5); // Position of the "sun"
scene.add(sunLight);

// 4. Camera position
camera.position.z = 3;

// 5. Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the Earth
    earthMesh.rotation.y += 0.002;

    // Rotate the clouds slightly faster or slower to create movement
    cloudsMesh.rotation.y += 0.0025;

    renderer.render(scene, camera);
}


animate();