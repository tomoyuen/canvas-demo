/**
 * Hilbert Curve: Generates 2D-Coordinates in a very fast way.
 *
 * @author Dylan Grafmyre
 *
 * Based on work by:
 * @author Thomas Diewald
 * @link http://www.openprocessing.org/sketch/15493
 *
 * @param center     Center of Hilbert curve.
 * @param size       Total width of Hilbert curve.
 * @param iterations Number of subdivisions.
 * @param v0         Corner index -X, -Z.
 * @param v1         Corner index -X, +Z.
 * @param v2         Corner index +X, +Z.
 * @param v3         Corner index +X, -Z.
 */

import * as THREE from 'three';

function hilbert2D(
  center = new THREE.Vector3(0, 0, 0),
  size = 10,
  iterations = 1,
  v0 = 0,
  v1 = 1,
  v2 = 2,
  v3 = 3) {
  const half = size / 2;
  const vec_s = [
    new THREE.Vector3(center.x - half, center.y, center.z - half),
    new THREE.Vector3(center.x - half, center.y, center.z + half),
    new THREE.Vector3(center.x + half, center.y, center.z + half),
    new THREE.Vector3(center.x + half, center.y, center.z - half)
  ];

  const vec = [
    vec_s[v0],
    vec_s[v1],
    vec_s[v2],
    vec_s[v3]
  ];

  // Recurse iterations
  if (0 <= --iterations) {
    const tmp = [];

    Array.prototype.push.apply(tmp, hilbert2D(vec[0], half, iterations, v0, v3, v2, v1));
    Array.prototype.push.apply(tmp, hilbert2D(vec[1], half, iterations, v0, v1, v2, v3));
    Array.prototype.push.apply(tmp, hilbert2D(vec[2], half, iterations, v0, v1, v2, v3));
    Array.prototype.push.apply(tmp, hilbert2D(vec[3], half, iterations, v2, v1, v0, v3));

    // Return recursive call
    return tmp;
  }

  // Return complete Hilbert Curve.
  return vec;
}

export default hilbert2D;
