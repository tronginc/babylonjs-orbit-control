const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

const MODELS_PATH = "./assets/models/";

const configCamera = (scene) => {
  const camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 5, BABYLON.Vector3.Zero(), scene);

  camera.setTarget(BABYLON.Vector3.Zero());
  camera.attachControl(canvas, true);
  camera.noRotationConstraint = true;

  camera.wheelPrecision = 50;
  camera.lowerRadiusLimit = 1.1;
  camera.upperRadiusLimit = 10;
};

const configLight = (scene) => {
  // Creates a light, aiming 0,1,0 - to the sky
  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
  // Dim the light a small amount - 0 to 1
  light.intensity = 0.7;
};

const loadModels = (scene) => {
  BABYLON.SceneLoader.Append(MODELS_PATH, "city-shanghai-sandboxie.glb", scene, function (result) {
    result.meshes[0].position = new BABYLON.Vector3(-1, 0, 1);
    console.log("Model city-shanghai-sandboxie.glb loaded!");
  });
};

const createScene = function () {
  // Creates a basic Babylon Scene object
  const scene = new BABYLON.Scene(engine);

  configCamera(scene);
  configLight(scene);
  loadModels(scene);

  return scene;
};
const scene = createScene(); //Call the createScene function
// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
  scene.render();
});
// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
  engine.resize();
});
