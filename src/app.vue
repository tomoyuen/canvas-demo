<template>
  <div>
    <h1>Hello App!</h1>
    <p>
      <router-link to="/particle">go particle</router-link>
      <router-link to="/attraction">go attraction</router-link>
    </p>
    <router-view></router-view>
    <!-- <keep-alive>
      <component :is="currentComponent"></component>
    </keep-alive> -->
  </div>
</template>

<script>
// import Gravity from './components/Gravity';
// import Geometry from './components/Geometry';
// import PictureFrame from './components/PictureFrame';
// import Connection from './components/Connection';

export default {
  name: 'app',
  data() {
    return {
      // currentComponent: components.Particle,
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
