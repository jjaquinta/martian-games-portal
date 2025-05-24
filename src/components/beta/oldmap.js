import React, {Suspense} from 'react';
import Scene from '../map/Scene.js'

const BetaOldMap = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Scene />
    </Suspense>
  );
};

export default BetaOldMap;

