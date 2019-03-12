<template>
  <div>
    <h1 class="home__title">Webgl Demos</h1>
    <ul class="home__list">
      <li class="home__item"
        v-for="(item, index) in demos"
        :key="index">
        <router-link class="home__link" :to="{name: item.name}">{{item.name}}</router-link>
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

<style scoped>
  .home {
    &__title {
      margin-top: 50px;
      font-size: 40px;
      font-family: fontstack('Arial Black');
      text-align: center;
    }
    &__list {
      display: grid;
      grid-template: repeat(3, 1fr) / repeat(3, 1fr);
      max-width: 1100px;
      margin: 40px auto;
    }
    &__item {
      font-size: 16px;
      font-family: fontstack('Arial');
      list-style: none;
      text-align: center;
      border: 1px solid #fcfcfc;
    }
    &__link {
      display: block;
      padding: 20px 0;
      background: #f0f0f0;
      color: #555;
      text-decoration: none;
      &:hover {
        background: #e0e0e0;
        color: #333;
      }
      &:visited {
        color: #777;
      }
    }
  }
</style>
