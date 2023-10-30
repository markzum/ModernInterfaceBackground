let scene, camera, renderer, controls;

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 2000);
camera.position.z = 250;

var light = new THREE.AmbientLight(0xffffff);
scene.add(light);

light = new THREE.AmbientLight(0x444444, 0.1);
light.position.set(0, 1, 0);
scene.add(light);

var directionalLight = new THREE.DirectionalLight(0xffeedd);
directionalLight.position.set(0, 1, 0).normalize();
scene.add(directionalLight);

var mesh = null;

var mtlLoader = new THREE.MTLLoader();
mtlLoader.load('objects/Earth1.mtl', function (materials) {
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('objects/Earth1.obj', function (object) {
        mesh = object;
        scene.add(mesh);
    });
});

renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xccccff);
document.body.appendChild(renderer.domElement);

controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', renderer);

animate();

function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}