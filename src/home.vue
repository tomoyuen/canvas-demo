<template>
  <div>
    <h1>Webgl Demos</h1>
    <ul>
      <li v-for="(item, index) in demos" :key="index">
        <router-link :to="{name: item.name}">{{item.name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import routes from './routes';

export default {
  data() {
    const demos = routes.filter(item => item.path !== '/');
    return {
      demos,
    };
  },
};
</script>
