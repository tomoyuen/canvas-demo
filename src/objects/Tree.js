class Cone extends THREE.Mesh {
  constructor(size = 10, translate) {
    const geometry = new THREE.CylinderGeometry(size / 2, size, size, 6);
    const material = new THREE.MeshPhongMaterial({
      color: 0x2c9e4b,
      shininess: 20,
      side: THREE.FrontSide,
      flatShading: true,
    });

    if (translate) {
      geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, size, 0));
    }
    super(geometry, material);
  }
}

export default class Tree extends THREE.Object3D {
  constructor(size = 6 + Math.random()) {
    super();
    let lastCone;
    let cone;

    for (let i = 0; i < size; i++) {
      cone = new Cone((size - i) + 1, i);
      cone.position.y = 0;
      if (lastCone) {
        const box = new THREE.Box3().setFromObject(lastCone);
        cone.position.y = (box.max.y + box.min.y) / 2;
      } else {
        cone.position.y += 2;
      }
      lastCone = cone;
      cone.castShadow = true;
      cone.receiveShadow = true;
      this.add(cone);
    }
  }
}
