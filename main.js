import "./style.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import SplitText from "split-type";
import * as THREE from "three";
import * as dat from "dat.gui";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger, TextPlugin);
const loader = new GLTFLoader();
let ring = null;
let contactRotation = false;
let renderer, scene, camera;

function initThreejs() {
  const gui = new dat.GUI();
  dat.GUI.toggleHide();

  const canvas = document.querySelector("canvas.webgl");
  scene = new THREE.Scene();

  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  //GLTF Loader
  loader.load("ring.glb", function (gltf) {
    ring = gltf.scene;
    ring.position.set(0, 0, 0);
    ring.scale.set(0.5, 0.5, 0.5);
    scene.add(ring);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "section.details",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
      defaults: {
        ease: "power3.Out",
        duration: 3,
      },
    });

    tl.to(ring.position, {
      z: 2.5,
      y: -0.34,
    });
    tl.to(
      ring.rotation,
      {
        z: 1,
      },
      "<"
    );
  });

  window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    //Camera
    camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.z = 2;
    camera.position.y = 0;
    camera.position.x = 0;
    scene.add(camera);

    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initThreejs();
});
