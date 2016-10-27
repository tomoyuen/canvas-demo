<template>
  <div id="app">
    <!-- <particle></particle> -->
    <attraction></attraction>
  </div>
</template>

<script>
import Particle from './components/Particle';
import Attraction from './components/Attraction';

export default {
  name: 'app',
  components: {
    Particle,
    Attraction,
  },
};
</script>
<style scoped>
  #app {
    /*height: 900px;*/
    background-color: #009e68;
  }
</style>
