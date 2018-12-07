<template>
  <div id="app">
    <keep-alive>
      <component :is="currentComponent"></component>
    </keep-alive>
  </div>
</template>

<script>
// import Gravity from './components/Gravity';
// import Geometry from './components/Geometry';
// import PictureFrame from './components/PictureFrame';
// import Connection from './components/Connection';

const components = {
  Particle: require.ensure('./components/Particle'),
  Attraction: require.ensure('./components/Attraction'),
  MouseBalls: require.ensure('./components/MouseBalls'),
  Waves: require.ensure('./components/Waves'),
  Shape: require.ensure('./components/Shape'),
  Birds: require.ensure('./components/Birds'),
  Cube: require.ensure('./components/Cube'),
  Hierarchy: require.ensure('./components/Hierarchy'),
  InteractiveCubes: require.ensure('./components/InteractiveCubes'),
  CubesTween: require.ensure('./components/CubesTween'),
  CircleParticles: require.ensure('./components/CircleParticles'),
  VoxelPainter: require.ensure('./components/VoxelPainter'),
  Lines: require.ensure('./components/Lines'),
  ColorfulLines: require.ensure('./components/ColorfulLines'),
  ColorfulLines2: require.ensure('./components/ColorfulLines2'),
  DashedLines: require.ensure('./components/DashedLines'),
  SphereLines: require.ensure('./components/SphereLines'),
  Materials: require.ensure('./components/Materials'),
  ticTacToe: require.ensure('./components/ticTacToe'),
  ticTacToe2: require.ensure('./components/ticTacToe2'),
  Brick: require.ensure('./components/brick'),
  Loading: require.ensure('./components/Loading'),
  Panorama: require.ensure('./components/Panorama'),
  ParticleDemo: require.ensure('./components/ParticleDemo'),
  TreeFarm: require.ensure('./components/TreeFarm'),
  Demo: require.ensure('./components/demo'),
  Ball: require.ensure('./components/ball'),
};

export default {
  name: 'app',
  data() {
    return {
      currentComponent: components.Particle,
    };
  },
};
</script>
<style scoped>
  #app {
    /*height: 900px;*/
    /*background-color: #009e68;*/
    background: #fff;
  }
</style>
