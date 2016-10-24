<template>
  <div id="app">
    <particle></particle>
  </div>
</template>

<script>
import Particle from './components/particle';

export default {
  name: 'app',
  components: {
    Particle,
  },
};
</script>
<style scoped>
  #app {
    height: 900px;
    background-color: #009e68;
  }
</style>
