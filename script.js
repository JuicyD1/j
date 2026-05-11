import * as THREE from "https://unpkg.com/three@0.164.1/build/three.module.js";

const root = document.documentElement;
const canvas = document.querySelector("#scripture-canvas");
const stage = document.querySelector(".hero-stage");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.addEventListener("pointermove", (event) => {
  const x = Math.round((event.clientX / window.innerWidth) * 100);
  const y = Math.round((event.clientY / window.innerHeight) * 100);
  root.style.setProperty("--glow-x", `${x}%`);
  root.style.setProperty("--glow-y", `${y}%`);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  },
  { threshold: 0.18 },
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

document.querySelectorAll(".book").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".book").forEach((book) => book.classList.remove("active"));
    button.classList.add("active");
  });
});

if (canvas && stage) {
  initScriptureScene();
}

function initScriptureScene() {
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0.65, 7.6);

  const group = new THREE.Group();
  scene.add(group);

  const parchment = createParchment();
  group.add(parchment);

  const halo = createHalo();
  group.add(halo);

  const particles = createParticles();
  scene.add(particles);

  scene.add(new THREE.AmbientLight(0xffdf9a, 1.55));

  const keyLight = new THREE.PointLight(0xffc96e, 7.5, 16);
  keyLight.position.set(1.8, 2.3, 4.2);
  scene.add(keyLight);

  const rimLight = new THREE.PointLight(0x8f5726, 4, 14);
  rimLight.position.set(-2.5, -1.8, 2.5);
  scene.add(rimLight);

  const pointer = new THREE.Vector2();
  stage.addEventListener("pointermove", (event) => {
    const bounds = stage.getBoundingClientRect();
    pointer.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    pointer.y = -((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
  });

  function resize() {
    const { width, height } = stage.getBoundingClientRect();
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  }

  window.addEventListener("resize", resize);
  resize();

  const clock = new THREE.Clock();

  function tick() {
    const time = clock.getElapsedTime();

    if (!reduceMotion) {
      group.rotation.y = Math.sin(time * 0.32) * 0.18 + pointer.x * 0.08;
      group.rotation.x = Math.sin(time * 0.24) * 0.06 + pointer.y * 0.04;
      parchment.rotation.z = Math.sin(time * 0.45) * 0.018;
      particles.rotation.y = time * 0.025;
      halo.rotation.z = -time * 0.08;
      halo.material.opacity = 0.22 + Math.sin(time * 1.5) * 0.05;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }

  tick();
}

function createParchment() {
  const group = new THREE.Group();
  const material = new THREE.MeshStandardMaterial({
    color: 0xe7c07f,
    roughness: 0.72,
    metalness: 0.02,
    side: THREE.DoubleSide,
  });

  const sheet = new THREE.Mesh(new THREE.PlaneGeometry(3.85, 5.2, 48, 48), material);
  sheet.geometry.attributes.position.needsUpdate = true;
  bendPlane(sheet.geometry, 0.28);
  sheet.castShadow = true;
  group.add(sheet);

  const edgeMaterial = new THREE.MeshStandardMaterial({
    color: 0x9a6230,
    roughness: 0.86,
    metalness: 0.04,
  });

  const topRod = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 4.15, 32), edgeMaterial);
  topRod.rotation.z = Math.PI / 2;
  topRod.position.y = 2.72;
  group.add(topRod);

  const bottomRod = topRod.clone();
  bottomRod.position.y = -2.72;
  group.add(bottomRod);

  const leftRoll = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 5.15, 42), edgeMaterial);
  leftRoll.rotation.x = Math.PI / 2;
  leftRoll.position.x = -2.06;
  group.add(leftRoll);

  const rightRoll = leftRoll.clone();
  rightRoll.position.x = 2.06;
  group.add(rightRoll);

  const textMaterial = new THREE.MeshBasicMaterial({
    color: 0x5a3519,
    transparent: true,
    opacity: 0.55,
  });

  for (let i = 0; i < 10; i += 1) {
    const line = new THREE.Mesh(new THREE.PlaneGeometry(2.5 - (i % 3) * 0.34, 0.025), textMaterial);
    line.position.set(-0.1 + (i % 2) * 0.16, 1.58 - i * 0.33, 0.025);
    group.add(line);
  }

  const cross = createCross();
  cross.position.set(0, -1.42, 0.04);
  group.add(cross);

  group.rotation.set(-0.08, -0.18, -0.04);
  return group;
}

function createCross() {
  const material = new THREE.MeshBasicMaterial({
    color: 0x7c4a1f,
    transparent: true,
    opacity: 0.5,
  });
  const cross = new THREE.Group();
  const vertical = new THREE.Mesh(new THREE.PlaneGeometry(0.13, 0.95), material);
  const horizontal = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.12), material);
  horizontal.position.y = 0.18;
  cross.add(vertical, horizontal);
  return cross;
}

function bendPlane(geometry, amount) {
  const positions = geometry.attributes.position;

  for (let i = 0; i < positions.count; i += 1) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    const wave = Math.sin((y + 2.6) * Math.PI * 0.9) * 0.045;
    positions.setZ(i, Math.cos(x * 1.35) * amount + wave);
  }

  geometry.computeVertexNormals();
}

function createHalo() {
  const geometry = new THREE.RingGeometry(1.85, 2.05, 96);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffd982,
    transparent: true,
    opacity: 0.24,
    side: THREE.DoubleSide,
  });
  const halo = new THREE.Mesh(geometry, material);
  halo.position.z = -0.28;
  return halo;
}

function createParticles() {
  const count = 380;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    const radius = 2.3 + Math.random() * 4.6;
    const angle = Math.random() * Math.PI * 2;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6.4;
    positions[i * 3 + 2] = Math.sin(angle) * radius - 0.5;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0xffdda0,
    size: 0.035,
    transparent: true,
    opacity: 0.78,
    depthWrite: false,
  });

  return new THREE.Points(geometry, material);
}
