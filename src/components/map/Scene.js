import React, { useState, useEffect } from 'react';
import { Canvas, useLoader, useThree  } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MeshBasicMaterial, CylinderGeometry, ConeGeometry, TextureLoader } from 'three';
import { OrbitControls } from '@react-three/drei';
import './scene.css';

const MODEL_PATH = `${process.env.PUBLIC_URL}/images/obj/ModularMilitaryEnvironmentPackVolume1/`;
const MODEL_DEFS = {
    BenzinTank: { name: 'Benzin Tank', file: 'BenzinTank.obj', texture: 'Buildings1024.png', position: [0, 0, 0], rotation: [-Math.PI / 4,0,0], scale: [1, 1, 1] },
    Block_A: { name: 'Barrier', file: 'Block_A.obj', texture: 'Buildings1024.png', position: [0, 30, 0], rotation: [0,0,0], scale: [1, 1, 1] },
    Block_B: { name: 'Curved Barrier', file: 'Block_B.obj', texture: 'Buildings1024.png', position: [0, 30, 0], rotation: [0,0,0], scale: [1, 1, 1] },
    BuildingRoofA: { name: "Roof A", file: 'BuildingRoofA.obj', texture: 'Buildings1024.png', position: [0, 0, 0], rotation: [-Math.PI / 4,0,0], scale: [1, 1, 1] },
    BuildingRoofB: { name: "Roof B", file: 'BuildingRoofB.obj', texture: 'Buildings1024.png', position: [0, 0, 0], rotation: [-Math.PI / 4,0,0], scale: [1, 1, 1] },
    BuildingWallA: { name: 'Wall A', file: 'BuildingWallA.obj', texture: 'Buildings1024.png', position: [0, 0, 0], rotation: [-Math.PI / 4,0,0], scale: [1, 1, 1] },
    BuildingWallB: { name: 'Wall B', file: 'BuildingWallB.obj', texture: 'Buildings1024.png', position: [0, 0, 0], rotation: [-Math.PI / 4,0,0], scale: [1, 1, 1] },
    Container: { name: 'Shipping Container', file: 'Container.obj', texture: 'Container1024.png', position: [0, 0, 0], rotation: [-Math.PI / 4,0,0], scale: [1, 1, 1] },
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

const Ground = ({ onClick }) => {
    return (
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0, 0]}
        onPointerDown={(e) => {
          e.stopPropagation(); // Prevent click events from propagating to other elements
          if (onClick) {
            onClick(''); // Call the onClick handler with an empty string
          }
        }}
        >
        <planeGeometry args={[10000, 10000]} /> {/* Large plane size for horizon-to-horizon ground */}
        <meshBasicMaterial color="grey" />
      </mesh>
    );
  };
  
  const Axis = ({ position = [0, 0, 0], rotation = [0, 0, 0] }) => {
    const axisLength = 500;
    const axisRadius = 10;
    const coneLength = 20;
    const coneRadius = 20;
  
    // Materials for the axes
    const materials = {
      x: new MeshBasicMaterial({ color: 'red' }),
      y: new MeshBasicMaterial({ color: 'green' }),
      z: new MeshBasicMaterial({ color: 'blue' }),
    };
  
    return (
      <group position={position} rotation={rotation}>
        {/* X-axis */}
        <mesh geometry={new CylinderGeometry(axisRadius, axisRadius, axisLength, 32)} material={materials.x} position={[axisLength / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]} />
        <mesh geometry={new ConeGeometry(coneRadius, coneLength, 32)} material={materials.x} position={[axisLength, 0, 0]} rotation={[0, 0, Math.PI / 2]} />
        <mesh geometry={new ConeGeometry(coneRadius, coneLength, 32)} material={materials.x} position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 2]} />
  
        {/* Y-axis */}
        <mesh geometry={new CylinderGeometry(axisRadius, axisRadius, axisLength, 32)} material={materials.y} position={[0, axisLength / 2, 0]} />
        <mesh geometry={new ConeGeometry(coneRadius, coneLength, 32)} material={materials.y} position={[0, axisLength, 0]} />
        <mesh geometry={new ConeGeometry(coneRadius, coneLength, 32)} material={materials.y} position={[0, 0, 0]} rotation={[Math.PI, 0, 0]} />
  
        {/* Z-axis */}
        <mesh geometry={new CylinderGeometry(axisRadius, axisRadius, axisLength, 32)} material={materials.z} position={[0, 0, axisLength / 2]} rotation={[Math.PI / 2, 0, 0]} />
        <mesh geometry={new ConeGeometry(coneRadius, coneLength, 32)} material={materials.z} position={[0, 0, axisLength]} rotation={[Math.PI / 2, 0, 0]} />
        <mesh geometry={new ConeGeometry(coneRadius, coneLength, 32)} material={materials.z} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      </group>
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
  const [selectedAction, setSelectedAction] = useState('Move');

  const [sceneDef,setSceneDef] = useState([
    { key:'tank1', name: "Benzin Tank", model:"BenzinTank", position:[0, 0, 0], rotation:[0, 0, 0], scale:[1, 1, 1]},
    { key:'tank2', name: "Benzin Tank", model:"BenzinTank", position:[0, 0, 700], rotation:[0, 0, Math.PI/4], scale:[1, 1, 1]},
    { key:'cont1', name: "Container", model:"Container", position:[0, 0, -400], rotation:[0, 0, 0], scale:[1, 1, 1]},
    { key:'cont2', name: "Container", model:"Container", position:[1000, 0, 200], rotation:[0, 0, Math.PI/4], scale:[1, 1, 1]},
  ]);
  
  const toDeg = (rad) => {
    return Math.round(rad/Math.PI*180);
  };

  const handleModelClick = (key) => {
    setSelected(key);
  };
  
  const getSelectedModel = () => {
    const key = selected;
    return sceneDef.find((element) => element.key === key);
  };

  const movePosition = (x, y, z) => {
    const pos1 = getSelectedModel().position;
    console.log("move by "+x+","+y+","+z);
    console.log(pos1[0]+","+pos1[1]+","+pos1[2]+" -> ");
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
    const pos2 = getSelectedModel().position;
    console.log(" -> "+pos2[0]+","+pos2[1]+","+pos2[2]);
  };
  
  const moveRotation = (x, y, z) => {
    const rad_x = x/180*Math.PI/2;
    const rad_y = y/180*Math.PI/2;
    const rad_z = z/180*Math.PI/2;
    console.log("selected key -> "+selected);
    console.log("rotate by "+x+","+y+","+z+" -> "+rad_x+","+rad_y+","+rad_z);
    const rot1 = getSelectedModel().rotation;
    console.log(rot1[0]/Math.PI*180+","+rot1[1]/Math.PI*180+","+rot1[2]/Math.PI*180+" -> ");
    setSceneDef((prevSceneDef) =>
      prevSceneDef.map((element) =>
        element.key === selected
          ? {
              ...element,
              position: [
                element.rotation[0] += rad_x,
                element.rotation[1] += rad_y,
                element.rotation[2] += rad_z,
              ],
            }
          : element
      )
    );
    const rot2 = getSelectedModel().rotation;
    console.log(" -> "+rot2[0]/Math.PI*180+","+rot2[1]/Math.PI*180+","+rot2[2]/Math.PI*180);
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

  const addNewObject = () => {
    const modelNames = Object.keys(MODEL_DEFS).map((key) => ({
      key,
      name: MODEL_DEFS[key].name,
    }));

    const selectedModel = window.prompt(
      "Select a model:\n" +
        modelNames.map((model, index) => `${index + 1}: ${model.name}`).join("\n")
    );

    const index = parseInt(selectedModel, 10) - 1;

    if (index >= 0 && index < modelNames.length) {
      const modelKey = modelNames[index].key;

      // Add the new object to the scene definition
      setSceneDef((prevSceneDef) => [
        ...prevSceneDef,
        {
          key: `${modelKey}_${Date.now()}`, // Unique key
          name: MODEL_DEFS[modelKey].name,
          model: modelKey,
          position: Array.from(MODEL_DEFS[modelKey].position), // Default position
          rotation: Array.from(MODEL_DEFS[modelKey].rotation), // Default rotation
          scale: Array.from(MODEL_DEFS[modelKey].scale), // Default scale
        },
      ]);
    }
  };

  const deleteSelected = () => {
    setSceneDef((prevSceneDef) =>
      prevSceneDef.filter((element) => element.key !== selected)
    );
    setSelected('');
  };

  const buttonGroups = {
    Move: [
      { label: '+X', onClick: (e) => movePosition(e.shiftKey ? 10 : 100, 0, 0) },
      { label: '-X', onClick: (e) => movePosition(e.shiftKey ? -10 : -100, 0, 0) },
      { label: '+Y', onClick: (e) => movePosition(0, e.shiftKey ? 10 : 100, 0) },
      { label: '-Y', onClick: (e) => movePosition(0, e.shiftKey ? -10 : -100, 0) },
      { label: '+Z', onClick: (e) => movePosition(0, 0, e.shiftKey ? 10 : 100) },
      { label: '-Z', onClick: (e) => movePosition(0, 0, e.shiftKey ? -10 : -100) },
    ],
    Rotate: [
      { label: '+X', onClick: (e) => moveRotation(e.shiftKey ? 1 : 5, 0, 0) },
      { label: '-X', onClick: (e) => moveRotation(e.shiftKey ? -1 : -5, 0, 0) },
      { label: '+Y', onClick: (e) => moveRotation(0, e.shiftKey ? 1 : 5, 0) },
      { label: '-Y', onClick: (e) => moveRotation(0, e.shiftKey ? -1 : -5, 0) },
      { label: '+Z', onClick: (e) => moveRotation(0, 0, e.shiftKey ? 1 : 5) },
      { label: '-Z', onClick: (e) => moveRotation(0, 0, e.shiftKey ? -1 : -5) },
    ],
    Scale: [
      { label: '+X', onClick: (e) => moveScale(e.shiftKey ? 1.005 : 1.05, 1, 1) },
      { label: '-X', onClick: (e) => moveScale(e.shiftKey ? 1 / 1.005 : 1 / 1.05, 1, 1) },
      { label: '+Y', onClick: (e) => moveScale(1, e.shiftKey ? 1.005 : 1.05, 1) },
      { label: '-Y', onClick: (e) => moveScale(1, e.shiftKey ? 1 / 1.005 : 1 / 1.05, 1) },
      { label: '+Z', onClick: (e) => moveScale(1, 1, e.shiftKey ? 1.005 : 1.05) },
      { label: '-Z', onClick: (e) => moveScale(1, 1, e.shiftKey ? 1 / 1.005 : 1 / 1.05) },
    ],
  };  

  const selectedModel = getSelectedModel();

  return (
    <>
    {selected ? (
      <>
        Selected: {selectedModel?.name || "Unknown"}
        [At: {Math.round(selectedModel.position[0])},{Math.round(selectedModel.position[1])},{Math.round(selectedModel.position[2])}]
        [Rot: {toDeg(selectedModel.rotation[0])},{toDeg(selectedModel.rotation[1])},{toDeg(selectedModel.rotation[2])}]
        <div className="control-buttons">
          <button
            type="button"
            onClick={() => deleteSelected()}
            style={{
              padding: '10px 15px',
              fontSize: '14px',
              backgroundColor: '#f0f0f0',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Del
          </button>
          <select
            value={selectedAction}
            onChange={(e) => setSelectedAction(e.target.value)}
            style={{ marginBottom: '10px', padding: '5px', fontSize: '16px' }}
          >
            <option value="Move">Move</option>
            <option value="Rotate">Rotate</option>
            <option value="Scale">Scale</option>
          </select>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {buttonGroups[selectedAction].map((button, index) => (
              <button
                key={index}
                type="button"
                onClick={button.onClick}
                style={{
                  padding: '10px 15px',
                  fontSize: '14px',
                  backgroundColor: '#f0f0f0',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  color:
                    button.label.includes('X') ? 'red' :
                    button.label.includes('Y') ? 'green' :
                    button.label.includes('Z') ? 'blue' : 'inherit', // Dynamically assign color
                }}
              >
                {button.label}
              </button>
            ))}
          </div>
          <br />
        </div>
      </>
    ) : (
      <button
        type="button"
        onClick={() => addNewObject()}
        style={{
          padding: '10px 15px',
          fontSize: '14px',
          backgroundColor: '#f0f0f0',
          border: '1px solid #ccc',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Add Object
      </button>
    )}
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
      <Ground onClick={setSelected} />
      {selected && (
        <Axis
          position={selectedModel?.position || [0, 0, 0]}
          rotation={selectedModel?.rotation || [0, 0, 0]}
        />
      )}

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
