import Home from './home';

export default [{
  path: '/',
  name: 'home',
  component: Home,
}, {
  name: 'particle',
  path: '/particle',
  component: () => import('./components/particle'),
}, {
  name: 'attraction',
  path: '/attraction',
  component: () => import('./components/Attraction'),
}, {
  name: 'mouseballs',
  path: '/mouseballs',
  component: resolve => require(['./components/MouseBalls'], resolve),
}, {
  name: 'waves',
  path: '/waves',
  component: resolve => require(['./components/Waves'], resolve),
}, {
  name: 'shape',
  path: '/shape',
  component: resolve => require(['./components/Shape'], resolve),
}, {
  name: 'birds',
  path: '/birds',
  component: resolve => require(['./components/Birds'], resolve),
}, {
  name: 'cube',
  path: '/cube',
  component: resolve => require(['./components/Cube'], resolve),
}, {
  name: 'hierarchy',
  path: '/hierarchy',
  component: resolve => require(['./components/Hierarchy'], resolve),
}, {
  name: 'interactivecubes',
  path: '/interactivecubes',
  component: resolve => require(['./components/InteractiveCubes'], resolve),
}, {
  name: 'cubestween',
  path: '/cubestween',
  component: resolve => require(['./components/CubesTween'], resolve),
}, {
  name: 'circleparticles',
  path: '/circleparticles',
  component: resolve => require(['./components/CircleParticles'], resolve),
}, {
  name: 'voxelpainter',
  path: '/voxelpainter',
  component: resolve => require(['./components/VoxelPainter'], resolve),
}, {
  name: 'lines',
  path: '/lines',
  component: resolve => require(['./components/Lines'], resolve),
}, {
  name: 'ColorfulLines',
  path: '/ColorfulLines',
  component: resolve => require(['./components/ColorfulLines'], resolve),
}, {
  name: 'ColorfulLines2',
  path: '/ColorfulLines2',
  component: resolve => require(['./components/ColorfulLines2'], resolve),
}, {
  name: 'DashedLines',
  path: '/DashedLines',
  component: resolve => require(['./components/DashedLines'], resolve),
}, {
  name: 'SphereLines',
  path: '/SphereLines',
  component: resolve => require(['./components/SphereLines'], resolve),
}, {
  name: 'Materials',
  path: '/Materials',
  component: resolve => require(['./components/Materials'], resolve),
}, {
  name: 'ticTacToe',
  path: '/ticTacToe',
  component: resolve => require(['./components/ticTacToe'], resolve),
}, {
  name: 'ticTacToe2',
  path: '/ticTacToe2',
  component: resolve => require(['./components/ticTacToe2'], resolve),
}, {
  name: 'brick',
  path: '/brick',
  component: resolve => require(['./components/brick'], resolve),
}, {
  name: 'Loading',
  path: '/Loading',
  component: resolve => require(['./components/Loading'], resolve),
}, {
  name: 'Panorama',
  path: '/Panorama',
  component: resolve => require(['./components/Panorama'], resolve),
}, {
  name: 'ParticleDemo',
  path: '/ParticleDemo',
  component: resolve => require(['./components/ParticleDemo'], resolve),
}, {
  name: 'TreeFarm',
  path: '/TreeFarm',
  component: resolve => require(['./components/TreeFarm'], resolve),
}, {
  name: 'Demo',
  path: '/demo',
  component: resolve => require(['./components/demo'], resolve),
}, {
  name: 'Ball',
  path: '/ball',
  component: resolve => require(['./components/ball'], resolve),
}, {
  name: 'Connection',
  path: '/connection',
  component: resolve => require(['./components/Connection'], resolve),
}, {
  name: 'Geometry',
  path: '/geometry',
  component: resolve => require(['./components/Geometry'], resolve),
}, {
  name: 'Gravity',
  path: '/gravity',
  component: resolve => require(['./components/Gravity'], resolve)
}];
