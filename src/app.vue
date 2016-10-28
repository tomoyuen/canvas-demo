<template>
  <div id="app">
    <!-- <particle></particle> -->
    <!-- <attraction></attraction> -->
    <mouse-balls></mouse-balls>
  </div>
</template>

<script>
import Particle from './components/Particle';
import Attraction from './components/Attraction';
import MouseBalls from './components/MouseBalls';

export default {
  name: 'app',
  components: {
    Particle,
    Attraction,
    MouseBalls,
  },
};
</script>
<style scoped>
  #app {
    /*height: 900px;*/
    background-color: #009e68;
  }
</style>
