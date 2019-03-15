export default class Bird extends THREE.Geometry {
  constructor() {
    super();

    this.addVertice(5, 0, 0);
    this.addVertice(-5, -2, 1);
    this.addVertice(-5, 0, 0);
    this.addVertice(-5, -2, -1);

    this.addVertice(0, 2, -6);
    this.addVertice(0, 2, 6);
    this.addVertice(2, 0, 0);
    this.addVertice(-3, 0, 0);

    this.addFace3(0, 2, 1);
    this.addFace3(0, 3, 2);
    this.addFace3(4, 7, 6);
    this.addFace3(5, 6, 7);

    this.computeFaceNormals();
  }

  addVertice(x, y, z) {
    this.vertices.push(new THREE.Vector3(x, y, z));
  }

  addFace3(a, b, c) {
    this.faces.push(new THREE.Face3(a, b, c));
  }
}
