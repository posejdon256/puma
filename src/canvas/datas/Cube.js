import { _getSize } from "../../datas/CollectAndShareDatas";
import { rotateByQuternionQ } from "../../Physics/Tensor/Rotation";
import quaternion from 'quaternionjs';
import math  from 'mathjs';
import { prepareQuaternion } from "../../Physics/Movement/Movement";

let a = 1.0;
let positions = [
    // Front face
    0, 0,  a,
     a, 0,  a,
     a,  a,  a,
    0,  a,  a,
    0, 0,  a,
    a,  a,  a,
    
    // Back face
    0, 0, 0,
    0,  a, 0,
     a,  a, 0,
     a, 0, 0,
     0, 0, 0,
     a,  a, 0,
    
    // Top face
    0,  a, 0,
    0,  a,  a,
     a,  a,  a,
     a,  a, 0,
     0,  a, 0,
     a,  a,  a,
    
    // Bottom face
    0, 0, 0,
     a, 0, 0,
     a, 0,  a,
    0, 0,  a,
    0, 0, 0,
    a, 0,  a,
    
    // Right face
     a, 0, 0,
     a,  a, 0,
     a,  a,  a,
     a, 0,  a,
     a, 0, 0,
     a,  a,  a,
    
    // Left face
    0, 0, 0,
    0, 0,  a,
    0,  a,  a,
    0,  a, 0,
    0, 0, 0,
    0,  a,  a,
  ];
  const indices = [
      0, 1, 2, 3, 4, 5,
      6, 7, 8, 9, 10, 11,
      12, 13, 14, 15, 16, 17,
       18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        31, 32, 33, 34, 35
  ];
  const normals = [
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,

    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,

      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,

      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,

      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,

     -1, 0, 0,
     -1, 0, 0,
     -1, 0, 0,
     -1, 0, 0,
     -1, 0, 0,
     -1, 0, 0,

  ];
//   export function createNormals() {

//   }
  export function getNormals() {
    return normals;
  }
  function updatePositions() {
    positions = [
      // Front face
      0, 0,  a,
       a, 0,  a,
       a,  a,  a,
      0,  a,  a,
      0, 0,  a,
      a,  a,  a,
      
      // Back face
      0, 0, 0,
      0,  a, 0,
       a,  a, 0,
       a, 0, 0,
       0, 0, 0,
       a,  a, 0,
      
      // Top face
      0,  a, 0,
      0,  a,  a,
       a,  a,  a,
       a,  a, 0,
       0,  a, 0,
       a,  a,  a,
      
      // Bottom face
      0, 0, 0,
       a, 0, 0,
       a, 0,  a,
      0, 0,  a,
      0, 0, 0,
      a, 0,  a,
      
      // Right face
       a, 0, 0,
       a,  a, 0,
       a,  a,  a,
       a, 0,  a,
       a, 0, 0,
       a,  a,  a,
      
      // Left face
      0, 0, 0,
      0, 0,  a,
      0,  a,  a,
      0,  a, 0,
      0, 0, 0,
      0,  a,  a,
    ];
  }
  export function getCubeVertices() {
      let _a = _getSize();
      if(_a !== a) {
        a = _a;
        let qStart2 = quaternion().fromAxis({x: 0, y: 0, z: 1}, -Math.atan2(1, math.sqrt(2)));
        let qStart = quaternion().fromAxis({x: 1, y: 0, z: 0}, math.pi / 4);
        qStart = qStart.multi(qStart2);
        let quater = {x: qStart.array()[0], y: qStart.array()[1], z: qStart.array()[2], w: qStart.array()[3]};
        updatePositions();
        const matrix = math.transpose(rotateByQuternionQ(quater));
        for(let i = 0 ; i < positions.length; i += 3) {
          const rot = math.matrix([ positions[i], positions[i + 1], positions[i + 2]]);
          const posNew = math.multiply(matrix, rot);
          positions[i] = posNew._data[0];
          positions[i + 1] = posNew._data[1];
          positions[i + 2] = posNew._data[2];
        }
      }
      return positions;
  }
  export function getCubeIndices() {
      return indices;
  }