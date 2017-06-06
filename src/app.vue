<template>
  <div id="app">
    <!-- <particle></particle> -->
    <!-- <attraction></attraction> -->
    <!-- <mouse-balls></mouse-balls> -->
    <!-- <gravity></gravity> -->
    <!-- <waves></waves> -->
    <!-- <shape></shape> -->
    <!-- <geometry></geometry> -->
    <!-- <birds></birds> -->
    <!-- <cube></cube> -->
    <!-- <hierarchy></hierarchy> -->
    <!-- <interactive-cubes></interactive-cubes> -->
    <!-- <cubes-tween></cubes-tween> -->
    <!-- <circle-particles></circle-particles> -->
    <!-- <voxel-painter></voxel-painter> -->
    <!-- <lines></lines> -->
    <!-- <colorful-lines></colorful-lines> -->
    <!-- <colorful-lines-2></colorful-lines-2> -->
    <!-- <dashed-lines></dashed-lines> -->
    <!-- <sphere-lines></sphere-lines> -->
    <!-- <materials></materials> -->
    <!-- <tic-tac-toe></tic-tac-toe> -->
    <!-- <tic-tac-toe-2></tic-tac-toe-2> -->
    <!-- <brick></brick> -->
    <!-- <picture-frame></picture-frame> -->
    <!-- <loading></loading> -->
    <!-- <panorama></panorama> -->
    <!-- <particle-demo></particle-demo> -->
    <!--<tree-farm></tree-farm>-->
    <!-- <demo></demo> -->
    <ball></ball>
  </div>
</template>

<script>
import Particle from './components/Particle';
import Attraction from './components/Attraction';
import MouseBalls from './components/MouseBalls';
// import Gravity from './components/Gravity';
import Waves from './components/Waves';
import Shape from './components/Shape';
// import Geometry from './components/Geometry';
import Birds from './components/Birds';
import Cube from './components/Cube';
import Hierarchy from './components/Hierarchy';
import InteractiveCubes from './components/InteractiveCubes';
import CubesTween from './components/CubesTween';
import CircleParticles from './components/CircleParticles';
import VoxelPainter from './components/VoxelPainter';
import Lines from './components/Lines';
import ColorfulLines from './components/ColorfulLines';
import ColorfulLines2 from './components/ColorfulLines2.vue';
import DashedLines from './components/DashedLines';
import SphereLines from './components/SphereLines';
import Materials from './components/Materials';
import ticTacToe from './components/ticTacToe';
import ticTacToe2 from './components/ticTacToe2';
import Brick from './components/brick';
// import PictureFrame from './components/PictureFrame';
import Loading from './components/Loading';
import Panorama from './components/Panorama';
import ParticleDemo from './components/ParticleDemo';
import TreeFarm from './components/TreeFarm';
import Demo from './components/demo';
import Ball from './components/ball';

export default {
  name: 'app',
  components: {
    Particle,
    Attraction,
    MouseBalls,
    // Gravity,
    Waves,
    Shape,
    // Geometry,
    Birds,
    Cube,
    Hierarchy,
    InteractiveCubes,
    CubesTween,
    CircleParticles,
    VoxelPainter,
    Lines,
    ColorfulLines,
    ColorfulLines2,
    DashedLines,
    SphereLines,
    Materials,
    ticTacToe,
    ticTacToe2,
    Brick,
    // PictureFrame,
    Loading,
    Panorama,
    ParticleDemo,
    TreeFarm,
    Demo,
    Ball,
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
