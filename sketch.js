var canvas = document.getElementById("renderCanvas");

var startRenderLoop = function (engine, canvas) {
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
        }
    });
}

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
var createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    //color background black
    scene.clearColor = new BABYLON.Color3.FromHexString('#000');






    //create sphere w params (x, y, z, diameter)
    var s1 = createSphere(1, 1, -1, 3);
    //wrap sphere in material from URL file
    s1.material = hexMat('#7851a9');
    
    //create sphere w params (x, y, z, diameter)
    var s2 = createSphere(0, 1, 10, 10);
    //wrap sphere in material from local file
    s2.material = fileMat('https://images.pexels.com/photos/53594/blue-clouds-day-fluffy-53594.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', scene);
    s2.rotation.x -= Math.PI / 6;

    //create box with params x, y, z, width, height, depth
    var b1 = createBox(2, 2.5, -2, 1, 1, 1);
    //wrap box in material colored with hex code
    b1.material = fileMat('https://upload.wikimedia.org/wikipedia/commons/c/c0/Denmark_crown.png', scene);
    b1.rotation.z -= Math.PI/4;
        
    //create box with params x, y, z, width, height, ddepth
    var b2 = createBox(0, -2, -1.5, 10, 2, 10);
    //wrap box in material from local file
    b2.material = fileMat('https://media.fisheries.noaa.gov/styles/original/s3/dam-migration/ocean-near-bogoslof_8-19_mms.jpg?itok=TGWbO2P1', scene);
    b2.rotation.y += Math.PI / 2;





    return scene;
};
        window.initFunction = async function() {
            
            
            var asyncEngineCreation = async function() {
                try {
                return createDefaultEngine();
                } catch(e) {
                console.log("the available createEngine function failed. Creating the default engine instead");
                return createDefaultEngine();
                }
            }

            window.engine = await asyncEngineCreation();
if (!engine) throw 'engine should not be null.';
startRenderLoop(engine, canvas);
window.scene = createScene();};
initFunction().then(() => {sceneToRender = scene                    
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});
