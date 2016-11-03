<template>
  <div id="app">
    <!-- <particle></particle> -->
    <!-- <attraction></attraction> -->
    <!-- <mouse-balls></mouse-balls> -->
    <gravity></gravity>
  </div>
</template>

<script>
import Particle from './components/Particle';
import Attraction from './components/Attraction';
import MouseBalls from './components/MouseBalls';
import Gravity from './components/Gravity';

export default {
  name: 'app',
  components: {
    Particle,
    Attraction,
    MouseBalls,
    Gravity,
  },
};
</script>
<style scoped>
  #app {
    /*height: 900px;*/
    background-color: #009e68;
  }
</style>
