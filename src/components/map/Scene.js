import React, { useState, useEffect } from 'react';
import { Canvas, useLoader, useThree  } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { TextureLoader } from 'three';
import { OrbitControls } from '@react-three/drei';

const MODEL_PATH = `${process.env.PUBLIC_URL}/images/obj/ModularMilitaryEnvironmentPackVolume1/`;
const MODEL_DEFS = {
    BenzinTank: { file: 'BenzinTank.obj', texture: 'Buildings1024.png', position: [0, -10, 0], rotation: [-Math.PI / 2,0,0], scale: [1, 1, 1] },
    Block_A: { file: 'Block_A.obj', texture: 'Buildings1024.png', position: [0, 55, 0], rotation: [0,0,0], scale: [1, 1, 1] },
    Block_B: { file: 'Block_B.obj', texture: 'Buildings1024.png', position: [0, 55, 0], rotation: [0,0,0], scale: [1, 1, 1] },
    //BuildingRoofA: { file: 'BuildingRoofA.obj', texture: 'Buildings1024.png', position: [0, 0, 0], rotation: [0,0,0], scale: [1, 1, 1] },
    //BuildingRoofB: { file: 'BuildingRoofB.obj', texture: 'Buildings1024.png', position: [0, 0, 0], rotation: [0,0,0], scale: [1, 1, 1] },
    BuildingWallA: { file: 'BuildingWallA.obj', texture: 'Buildings1024.png', position: [0, 0, 0], rotation: [-Math.PI / 2,0,0], scale: [1, 1, 1] },
    BuildingWallB: { file: 'BuildingWallB.obj', texture: 'Buildings1024.png', position: [0, 0, 0], rotation: [-Math.PI / 2,0,0], scale: [1, 1, 1] },
    Container: { file: 'Container.obj', texture: 'Container1024.png', position: [0, 0, 0], rotation: [-Math.PI / 2,0,0], scale: [1, 1, 1] },
};


const ModelInst = ({ clickKey, modelPath, texturePath, position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1],
        onClick }) => {
    const model = useLoader(OBJLoader, `${MODEL_PATH}/${modelPath}`);
    const texture = useLoader(TextureLoader, `${MODEL_PATH}/${texturePath}`);

    // Apply the shared texture to the model's materials
    useEffect(() => {
      model.traverse((child) => {
        if (child.isMesh) {
          //child.geometry.center();
          child.material.map = texture;
          child.material.needsUpdate = true;
        }
      });
    }, [model, texture]);
    
    return (
        <group position={position} rotation={rotation} scale={scale}
            onPointerDown={(e) => {
            e.stopPropagation(); // Prevent the event from propagating to the canvas
            if (onClick) {
              onClick(clickKey); // Pass relevant data
            }
          }}
        >
          <primitive object={model.clone()} />
        </group>
    );
};

const Ground = () => {
    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[10000, 10000]} /> {/* Large plane size for horizon-to-horizon ground */}
        <meshBasicMaterial color="green" />
      </mesh>
    );
  };

const CameraSetup = () => {
    const { camera } = useThree();

    useEffect(() => {
        camera.position.set(0, 100, 500);  // Set the camera position
        camera.lookAt(0, 100, 0);         // Make the camera look at a specific point
        camera.updateProjectionMatrix();  // Ensure the camera updates with the new settings
    }, [camera]);

    return null; // This component doesn't render anything itself
};

const addVectors = (a, b) => a.map((val, index) => val + b[index]);
const multVectors = (a, b) => a.map((val, index) => val*b[index]);

const Scene = () => {
  const [selected, setSelected] = useState('');
  

  const [sceneDef,setSceneDef] = useState([
    { key:'tank1', model:"BenzinTank", position:[0, 0, 0], rotation:[0, 0, 0], scale:[1, 1, 1]},
    { key:'tank2', model:"BenzinTank", position:[0, 0, 700], rotation:[0, 0, Math.PI/4], scale:[1, 1, 1]},
    { key:'cont1', model:"Container", position:[0, 0, -400], rotation:[0, 0, 0], scale:[1, 1, 1]},
    { key:'cont2', model:"Container", position:[1000, 0, 200], rotation:[0, 0, Math.PI/4], scale:[1, 1, 1]},
  ]);
  
  const handleModelClick = (key) => {
    setSelected(key);
  };
  
  const getSelectedModel = () => {
    const key = selected;
    return sceneDef.find((element) => element.key === key);
  };

  const movePosition = (x, y, z) => {
    setSceneDef((prevSceneDef) =>
      prevSceneDef.map((element) =>
        element.key === selected
          ? {
              ...element,
              position: [
                element.position[0] + x,
                element.position[1] + y,
                element.position[2] + z,
              ],
            }
          : element
      )
    );
  };
  
  const moveRotation = (x, y, z) => {
    setSceneDef((prevSceneDef) =>
      prevSceneDef.map((element) =>
        element.key === selected
          ? {
              ...element,
              position: [
                element.rotation[0] += x/180*Math.PI,
                element.rotation[1] += y/180*Math.PI,
                element.rotation[2] += z/180*Math.PI,
              ],
            }
          : element
      )
    );
  };

  const moveScale = (x, y, z) => {
    setSceneDef((prevSceneDef) =>
      prevSceneDef.map((element) =>
        element.key === selected
          ? {
              ...element,
              position: [
                element.scale[0] *= x,
                element.scale[1] *= y,
                element.scale[2] *= z,
              ],
            }
          : element
      )
    );
  };

  return (
    <>
    Selected: {selected}
    Move:
    <button 
            type="button" 
            onClick={() => movePosition(100,0,0)} 
            aria-label="+X"
          >
            +X
    </button>
    <button 
            type="button" 
            onClick={() => movePosition(-100,0,0)} 
            aria-label="-X"
          >
            -X
    </button>
    <button 
            type="button" 
            onClick={() => movePosition(0,100,0)} 
            aria-label="+Y"
          >
            +Y
    </button>
    <button 
            type="button" 
            onClick={() => movePosition(0,-100,0)} 
            aria-label="-Y"
          >
            -Y
    </button>
    <button 
            type="button" 
            onClick={() => movePosition(0,0,100)} 
            aria-label="+Z"
          >
            +Z
    </button>
    <button 
            type="button" 
            onClick={() => movePosition(0,0,-100)} 
            aria-label="-Z"
          >
            -Z
    </button>
    Rotate:
    <button 
            type="button" 
            onClick={() => moveRotation(5,0,0)} 
            aria-label="+X"
          >
            +X
    </button>
    <button 
            type="button" 
            onClick={() => moveRotation(-5,0,0)} 
            aria-label="-X"
          >
            -X
    </button>
    <button 
            type="button" 
            onClick={() => moveRotation(0,5,0)} 
            aria-label="+Y"
          >
            +Y
    </button>
    <button 
            type="button" 
            onClick={() => moveRotation(0,-5,0)} 
            aria-label="-Y"
          >
            -Y
    </button>
    <button 
            type="button" 
            onClick={() => moveRotation(0,0,5)} 
            aria-label="+Z"
          >
            +Z
    </button>
    <button 
            type="button" 
            onClick={() => moveRotation(0,0,-5)} 
            aria-label="-Z"
          >
            -Z
    </button>
    Scale:
    <button 
            type="button" 
            onClick={() => moveScale(1.05,1,1)} 
            aria-label="+X"
          >
            +X
    </button>
    <button 
            type="button" 
            onClick={() => moveScale(1/1.05,1,1)} 
            aria-label="-X"
          >
            -X
    </button>
    <button 
            type="button" 
            onClick={() => moveScale(1,1.05,1)} 
            aria-label="+Y"
          >
            +Y
    </button>
    <button 
            type="button" 
            onClick={() => moveScale(1,1/1.05,1)} 
            aria-label="-Y"
          >
            -Y
    </button>
    <button 
            type="button" 
            onClick={() => moveScale(1,1,1.05)} 
            aria-label="+Z"
          >
            +Z
    </button>
    <button 
            type="button" 
            onClick={() => moveScale(1,1,1/1.05)} 
            aria-label="-Z"
          >
            -Z
    </button>
    <br/>
    <Canvas camera={{
        fov: 60, // Adjust field of view if needed
        far: 10000,
      }}
      style={{ height: '100vh' }}>
      <CameraSetup/>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <spotLight position={[100, 100, 100]} angle={0.15} penumbra={1} />
      <pointLight position={[-100, -100, -100]} />
      <Ground />

      {sceneDef.map((sceneElem, index) => (
        <ModelInst
          key={sceneElem.key}
          clickKey={sceneElem.key}
          modelPath={MODEL_DEFS[sceneElem.model].file}
          texturePath={MODEL_DEFS[sceneElem.model].texture}
          position={addVectors(MODEL_DEFS[sceneElem.model].position, sceneElem.position)}
          rotation={addVectors(MODEL_DEFS[sceneElem.model].rotation, sceneElem.rotation)}
          scale={multVectors(MODEL_DEFS[sceneElem.model].scale, sceneElem.scale)}
          onClick={handleModelClick}
        />
      ))}

      {/* Orbit controls for camera rotation */}
      <OrbitControls />
    </Canvas>
    </>
  );
};

export default Scene;
