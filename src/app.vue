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
    <hierarchy></hierarchy>
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
  },
};
</script>
<style scoped>
  #app {
    /*height: 900px;*/
    background-color: #009e68;
  }
</style>
