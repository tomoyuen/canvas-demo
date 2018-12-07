<template>
  <div>
    <h1>Webgl Demos</h1>
    <ul>
      <li v-for="item in demos" :key="item.name">
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
