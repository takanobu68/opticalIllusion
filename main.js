let container, scene, camera, renderer;
let moveSphere;
let fixedSphere;
let object;
let ADD = 0.01,
  theta = 0;

function init() {
  container = document.querySelector("#scene-container");

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  const fov = 75;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 1;
  const far = 1000;

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, 50);

  create3D();
  createFixedSphere();

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 0, 10);
  scene.add(light);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  renderer.setAnimationLoop(() => {
    update();
    render();
  });
}

function create3D() {
  object = new THREE.Object3D();
  object.position.x = 20;
  scene.add(object);
}

function createFixedSphere() {
  let material = new THREE.MeshPhongMaterial({
    color: "red",
    shininess: 100,
    side: THREE.DoubleSide,
  });
  let geometry = new THREE.SphereGeometry(1, 30, 30);
  fixedSphere = new THREE.Mesh(geometry, material);
  scene.add(fixedSphere);
}

function update() {
  camera.lookAt(object.position);

  object.position.x = 7 * Math.sin(theta);
  object.position.y = 7 * Math.sin(theta);
  object.position.z = 7 * Math.cos(theta);

  camera.position.x = object.position.y;
  camera.position.z = object.position.z + 15;
  theta += ADD;
}

function render() {
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);

init();
