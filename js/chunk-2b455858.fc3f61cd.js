(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2b455858"],{"0b60":function(e,t,n){(function(e){e.ParametricGeometries={klein:function(e,t,n){var o,a,r;t*=Math.PI,e*=2*Math.PI,t*=2,t<Math.PI?(o=3*Math.cos(t)*(1+Math.sin(t))+2*(1-Math.cos(t)/2)*Math.cos(t)*Math.cos(e),r=-8*Math.sin(t)-2*(1-Math.cos(t)/2)*Math.sin(t)*Math.cos(e)):(o=3*Math.cos(t)*(1+Math.sin(t))+2*(1-Math.cos(t)/2)*Math.cos(e+Math.PI),r=-8*Math.sin(t)),a=-2*(1-Math.cos(t)/2)*Math.sin(e),n.set(o,a,r)},plane:function(e,t){return function(n,o,a){var r=n*e,i=0,s=o*t;a.set(r,i,s)}},mobius:function(e,t,n){e-=.5;var o,a,r,i=2*Math.PI*t,s=2;o=Math.cos(i)*(s+e*Math.cos(i/2)),a=Math.sin(i)*(s+e*Math.cos(i/2)),r=e*Math.sin(i/2),n.set(o,a,r)},mobius3d:function(e,t,n){e*=Math.PI,t*=2*Math.PI,e*=2;var o,a,r,i=e/2,s=2.25,c=.125,m=.65;o=c*Math.cos(t)*Math.cos(i)-m*Math.sin(t)*Math.sin(i),r=c*Math.cos(t)*Math.sin(i)+m*Math.sin(t)*Math.cos(i),a=(s+o)*Math.sin(e),o=(s+o)*Math.cos(e),n.set(o,a,r)}},e.ParametricGeometries.TubeGeometry=function(t,n,o,a,r,i){this.path=t,this.segments=n||64,this.radius=o||1,this.segmentsRadius=a||8,this.closed=r||!1,i&&(this.debug=new e.Object3D);var s=this,c=this.segments+1,m=t.computeFrenetFrames(n,r),u=m.tangents,h=m.normals,l=m.binormals;this.tangents=u,this.normals=h,this.binormals=l;var d=function(n,a,r){a*=2*Math.PI;var i=n*(c-1);i=Math.floor(i);var m=t.getPointAt(n),d=u[i],p=h[i],b=l[i];s.debug&&(s.debug.add(new e.ArrowHelper(d,m,o,255)),s.debug.add(new e.ArrowHelper(p,m,o,16711680)),s.debug.add(new e.ArrowHelper(b,m,o,65280)));var f=-s.radius*Math.cos(a),y=s.radius*Math.sin(a);m.x+=f*p.x+y*b.x,m.y+=f*p.y+y*b.y,m.z+=f*p.z+y*b.z,r.copy(m)};e.ParametricGeometry.call(this,d,n,a)},e.ParametricGeometries.TubeGeometry.prototype=Object.create(e.Geometry.prototype),e.ParametricGeometries.TubeGeometry.prototype.constructor=e.ParametricGeometries.TubeGeometry,e.ParametricGeometries.TorusKnotGeometry=function(t,n,o,a,r,i){function s(){e.Curve.call(this)}this.radius=t||200,this.tube=n||40,this.segmentsT=o||64,this.segmentsR=a||8,this.p=r||2,this.q=i||3,s.prototype=Object.create(e.Curve.prototype),s.prototype.constructor=s,s.prototype.getPoint=function(n,o){var a=o||new e.Vector3;n*=2*Math.PI;var s=.5,c=(1+s*Math.cos(i*n))*Math.cos(r*n),m=(1+s*Math.cos(i*n))*Math.sin(r*n),u=s*Math.sin(i*n);return a.set(c,m,u).multiplyScalar(t)};var c=o,m=a,u=new s;e.ParametricGeometries.TubeGeometry.call(this,u,c,n,m,!0,!1)},e.ParametricGeometries.TorusKnotGeometry.prototype=Object.create(e.Geometry.prototype),e.ParametricGeometries.TorusKnotGeometry.prototype.constructor=e.ParametricGeometries.TorusKnotGeometry,e.ParametricGeometries.SphereGeometry=function(t,n,o){function a(e,n,o){e*=Math.PI,n*=2*Math.PI;var a=t*Math.sin(e)*Math.cos(n),r=t*Math.sin(e)*Math.sin(n),i=t*Math.cos(e);o.set(a,r,i)}e.ParametricGeometry.call(this,a,n,o)},e.ParametricGeometries.SphereGeometry.prototype=Object.create(e.Geometry.prototype),e.ParametricGeometries.SphereGeometry.prototype.constructor=e.ParametricGeometries.SphereGeometry,e.ParametricGeometries.PlaneGeometry=function(t,n,o,a){function r(e,o,a){var r=e*t,i=0,s=o*n;a.set(r,i,s)}e.ParametricGeometry.call(this,r,o,a)},e.ParametricGeometries.PlaneGeometry.prototype=Object.create(e.Geometry.prototype),e.ParametricGeometries.PlaneGeometry.prototype.constructor=e.ParametricGeometries.PlaneGeometry}).call(this,n("5a89"))},"17c2":function(e,t,n){"use strict";var o=n("b727").forEach,a=n("a640"),r=n("ae40"),i=a("forEach"),s=r("forEach");e.exports=i&&s?[].forEach:function(e){return o(this,e,arguments.length>1?arguments[1]:void 0)}},4160:function(e,t,n){"use strict";var o=n("23e7"),a=n("17c2");o({target:"Array",proto:!0,forced:[].forEach!=a},{forEach:a})},"977d":function(e,t,n){"use strict";(function(e){n("4160"),n("b0c0"),n("af90"),n("0b60");function o(t){var n=new e.WebGLRenderer,o=new e.PerspectiveCamera(75,window.innerWidth/window.innerHeight,.1,50),a=new e.Scene;n.setPixelRatio(window.devicePixelRatio),n.setSize(window.innerWidth,window.innerHeight),n.setClearColor(0,1);var r=new e.OrbitControls(o,n.domElement);r.enableZoom=!1;var i=[];i[0]=new e.PointLight(16777215,1,0),i[1]=new e.PointLight(16777215,1,0),i[2]=new e.PointLight(16777215,1,0),i[0].position.set(0,200,0),i[1].position.set(100,200,100),i[2].position.set(-100,-200,-100),i.forEach((function(e){return e.name="light"})),a.add(i[0]),a.add(i[1]),a.add(i[2]);var s=new e.Object3D,c=new e.LineSegments(new e.BoxGeometry(2,2,2),new e.LineBasicMaterial({color:16777215,transparent:!0,opacity:.5}));c.name="line",s.add(c);var m=new e.Mesh(new e.BoxGeometry,new e.MeshPhongMaterial({color:1401481,emissive:468276,side:e.DoubleSide}));function u(){window.requestAnimationFrame(u),s.rotation.x+=.005,s.rotation.y+=.005,n.render(a,o)}m.name="mesh",m.FlatShading=!0,t.appendChild(n.domElement),s.add(m),a.add(o),o.position.z=3,window.THREE=e,window.scene=a,a.add(s),window.addEventListener("resize",(function(){o.aspect=window.innerWidth/window.innerHeight,o.updateProjectionMatrix(),n.setSize(window.innerWidth,window.innerHeight)}),!1),u()}t["a"]={mounted:function(){o(this.$el)}}}).call(this,n("5a89"))},a640:function(e,t,n){"use strict";var o=n("d039");e.exports=function(e,t){var n=[][e];return!!n&&o((function(){n.call(null,t||function(){throw 1},1)}))}},af90:function(e,t,n){(function(e){e.OrbitControls=function(t,n){this.object=t,this.domElement=void 0!==n?n:document,this.enabled=!0,this.target=new e.Vector3,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.25,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!1,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.enableKeys=!0,this.keys={LEFT:37,UP:38,RIGHT:39,BOTTOM:40},this.mouseButtons={LEFT:e.MOUSE.LEFT,MIDDLE:e.MOUSE.MIDDLE,RIGHT:e.MOUSE.RIGHT},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this.getPolarAngle=function(){return u.phi},this.getAzimuthalAngle=function(){return u.theta},this.saveState=function(){o.target0.copy(o.target),o.position0.copy(o.object.position),o.zoom0=o.object.zoom},this.reset=function(){o.target.copy(o.target0),o.object.position.copy(o.position0),o.object.zoom=o.zoom0,o.object.updateProjectionMatrix(),o.dispatchEvent(a),o.update(),c=s.NONE},this.update=function(){var n=new e.Vector3,r=(new e.Quaternion).setFromUnitVectors(t.up,new e.Vector3(0,1,0)),i=r.clone().inverse(),b=new e.Vector3,f=new e.Quaternion;return function(){var e=o.object.position;return n.copy(e).sub(o.target),n.applyQuaternion(r),u.setFromVector3(n),o.autoRotate&&c===s.NONE&&j(O()),u.theta+=h.theta,u.phi+=h.phi,u.theta=Math.max(o.minAzimuthAngle,Math.min(o.maxAzimuthAngle,u.theta)),u.phi=Math.max(o.minPolarAngle,Math.min(o.maxPolarAngle,u.phi)),u.makeSafe(),u.radius*=l,u.radius=Math.max(o.minDistance,Math.min(o.maxDistance,u.radius)),o.target.add(d),n.setFromSpherical(u),n.applyQuaternion(i),e.copy(o.target).add(n),o.object.lookAt(o.target),!0===o.enableDamping?(h.theta*=1-o.dampingFactor,h.phi*=1-o.dampingFactor,d.multiplyScalar(1-o.dampingFactor)):(h.set(0,0,0),d.set(0,0,0)),l=1,!!(p||b.distanceToSquared(o.object.position)>m||8*(1-f.dot(o.object.quaternion))>m)&&(o.dispatchEvent(a),b.copy(o.object.position),f.copy(o.object.quaternion),p=!1,!0)}}(),this.dispose=function(){o.domElement.removeEventListener("contextmenu",te,!1),o.domElement.removeEventListener("mousedown",_,!1),o.domElement.removeEventListener("wheel",q,!1),o.domElement.removeEventListener("touchstart",J,!1),o.domElement.removeEventListener("touchend",ee,!1),o.domElement.removeEventListener("touchmove",$,!1),document.removeEventListener("mousemove",B,!1),document.removeEventListener("mouseup",W,!1),window.removeEventListener("keydown",Q,!1)};var o=this,a={type:"change"},r={type:"start"},i={type:"end"},s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_DOLLY_PAN:4},c=s.NONE,m=1e-6,u=new e.Spherical,h=new e.Spherical,l=1,d=new e.Vector3,p=!1,b=new e.Vector2,f=new e.Vector2,y=new e.Vector2,g=new e.Vector2,E=new e.Vector2,w=new e.Vector2,v=new e.Vector2,P=new e.Vector2,M=new e.Vector2;function O(){return 2*Math.PI/60/60*o.autoRotateSpeed}function T(){return Math.pow(.95,o.zoomSpeed)}function j(e){h.theta-=e}function G(e){h.phi-=e}var R=function(){var t=new e.Vector3;return function(e,n){t.setFromMatrixColumn(n,0),t.multiplyScalar(-e),d.add(t)}}(),L=function(){var t=new e.Vector3;return function(e,n){!0===o.screenSpacePanning?t.setFromMatrixColumn(n,1):(t.setFromMatrixColumn(n,0),t.crossVectors(o.object.up,t)),t.multiplyScalar(e),d.add(t)}}(),S=function(){var t=new e.Vector3;return function(e,n){var a=o.domElement===document?o.domElement.body:o.domElement;if(o.object.isPerspectiveCamera){var r=o.object.position;t.copy(r).sub(o.target);var i=t.length();i*=Math.tan(o.object.fov/2*Math.PI/180),R(2*e*i/a.clientHeight,o.object.matrix),L(2*n*i/a.clientHeight,o.object.matrix)}else o.object.isOrthographicCamera?(R(e*(o.object.right-o.object.left)/o.object.zoom/a.clientWidth,o.object.matrix),L(n*(o.object.top-o.object.bottom)/o.object.zoom/a.clientHeight,o.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),o.enablePan=!1)}}();function C(e){o.object.isPerspectiveCamera?l/=e:o.object.isOrthographicCamera?(o.object.zoom=Math.max(o.minZoom,Math.min(o.maxZoom,o.object.zoom*e)),o.object.updateProjectionMatrix(),p=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),o.enableZoom=!1)}function x(e){o.object.isPerspectiveCamera?l*=e:o.object.isOrthographicCamera?(o.object.zoom=Math.max(o.minZoom,Math.min(o.maxZoom,o.object.zoom/e)),o.object.updateProjectionMatrix(),p=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),o.enableZoom=!1)}function A(e){b.set(e.clientX,e.clientY)}function H(e){v.set(e.clientX,e.clientY)}function k(e){g.set(e.clientX,e.clientY)}function D(e){f.set(e.clientX,e.clientY),y.subVectors(f,b).multiplyScalar(o.rotateSpeed);var t=o.domElement===document?o.domElement.body:o.domElement;j(2*Math.PI*y.x/t.clientHeight),G(2*Math.PI*y.y/t.clientHeight),b.copy(f),o.update()}function N(e){P.set(e.clientX,e.clientY),M.subVectors(P,v),M.y>0?C(T()):M.y<0&&x(T()),v.copy(P),o.update()}function z(e){E.set(e.clientX,e.clientY),w.subVectors(E,g).multiplyScalar(o.panSpeed),S(w.x,w.y),g.copy(E),o.update()}function I(e){}function F(e){e.deltaY<0?x(T()):e.deltaY>0&&C(T()),o.update()}function V(e){var t=!1;switch(e.keyCode){case o.keys.UP:S(0,o.keyPanSpeed),t=!0;break;case o.keys.BOTTOM:S(0,-o.keyPanSpeed),t=!0;break;case o.keys.LEFT:S(o.keyPanSpeed,0),t=!0;break;case o.keys.RIGHT:S(-o.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),o.update())}function U(e){b.set(e.touches[0].pageX,e.touches[0].pageY)}function Y(e){if(o.enableZoom){var t=e.touches[0].pageX-e.touches[1].pageX,n=e.touches[0].pageY-e.touches[1].pageY,a=Math.sqrt(t*t+n*n);v.set(0,a)}if(o.enablePan){var r=.5*(e.touches[0].pageX+e.touches[1].pageX),i=.5*(e.touches[0].pageY+e.touches[1].pageY);g.set(r,i)}}function Z(e){f.set(e.touches[0].pageX,e.touches[0].pageY),y.subVectors(f,b).multiplyScalar(o.rotateSpeed);var t=o.domElement===document?o.domElement.body:o.domElement;j(2*Math.PI*y.x/t.clientHeight),G(2*Math.PI*y.y/t.clientHeight),b.copy(f),o.update()}function K(e){if(o.enableZoom){var t=e.touches[0].pageX-e.touches[1].pageX,n=e.touches[0].pageY-e.touches[1].pageY,a=Math.sqrt(t*t+n*n);P.set(0,a),M.set(0,Math.pow(P.y/v.y,o.zoomSpeed)),C(M.y),v.copy(P)}if(o.enablePan){var r=.5*(e.touches[0].pageX+e.touches[1].pageX),i=.5*(e.touches[0].pageY+e.touches[1].pageY);E.set(r,i),w.subVectors(E,g).multiplyScalar(o.panSpeed),S(w.x,w.y),g.copy(E)}o.update()}function X(e){}function _(e){if(!1!==o.enabled){switch(e.preventDefault(),o.domElement.focus?o.domElement.focus():window.focus(),e.button){case o.mouseButtons.LEFT:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===o.enablePan)return;k(e),c=s.PAN}else{if(!1===o.enableRotate)return;A(e),c=s.ROTATE}break;case o.mouseButtons.MIDDLE:if(!1===o.enableZoom)return;H(e),c=s.DOLLY;break;case o.mouseButtons.RIGHT:if(!1===o.enablePan)return;k(e),c=s.PAN;break}c!==s.NONE&&(document.addEventListener("mousemove",B,!1),document.addEventListener("mouseup",W,!1),o.dispatchEvent(r))}}function B(e){if(!1!==o.enabled)switch(e.preventDefault(),c){case s.ROTATE:if(!1===o.enableRotate)return;D(e);break;case s.DOLLY:if(!1===o.enableZoom)return;N(e);break;case s.PAN:if(!1===o.enablePan)return;z(e);break}}function W(e){!1!==o.enabled&&(I(e),document.removeEventListener("mousemove",B,!1),document.removeEventListener("mouseup",W,!1),o.dispatchEvent(i),c=s.NONE)}function q(e){!1===o.enabled||!1===o.enableZoom||c!==s.NONE&&c!==s.ROTATE||(e.preventDefault(),e.stopPropagation(),o.dispatchEvent(r),F(e),o.dispatchEvent(i))}function Q(e){!1!==o.enabled&&!1!==o.enableKeys&&!1!==o.enablePan&&V(e)}function J(e){if(!1!==o.enabled){switch(e.preventDefault(),e.touches.length){case 1:if(!1===o.enableRotate)return;U(e),c=s.TOUCH_ROTATE;break;case 2:if(!1===o.enableZoom&&!1===o.enablePan)return;Y(e),c=s.TOUCH_DOLLY_PAN;break;default:c=s.NONE}c!==s.NONE&&o.dispatchEvent(r)}}function $(e){if(!1!==o.enabled)switch(e.preventDefault(),e.stopPropagation(),e.touches.length){case 1:if(!1===o.enableRotate)return;if(c!==s.TOUCH_ROTATE)return;Z(e);break;case 2:if(!1===o.enableZoom&&!1===o.enablePan)return;if(c!==s.TOUCH_DOLLY_PAN)return;K(e);break;default:c=s.NONE}}function ee(e){!1!==o.enabled&&(X(e),o.dispatchEvent(i),c=s.NONE)}function te(e){!1!==o.enabled&&e.preventDefault()}o.domElement.addEventListener("contextmenu",te,!1),o.domElement.addEventListener("mousedown",_,!1),o.domElement.addEventListener("wheel",q,!1),o.domElement.addEventListener("touchstart",J,!1),o.domElement.addEventListener("touchend",ee,!1),o.domElement.addEventListener("touchmove",$,!1),window.addEventListener("keydown",Q,!1),this.update()},e.OrbitControls.prototype=Object.create(e.EventDispatcher.prototype),e.OrbitControls.prototype.constructor=e.OrbitControls,Object.defineProperties(e.OrbitControls.prototype,{center:{get:function(){return console.warn("THREE.OrbitControls: .center has been renamed to .target"),this.target}},noZoom:{get:function(){return console.warn("THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead."),!this.enableZoom},set:function(e){console.warn("THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead."),this.enableZoom=!e}},noRotate:{get:function(){return console.warn("THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead."),!this.enableRotate},set:function(e){console.warn("THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead."),this.enableRotate=!e}},noPan:{get:function(){return console.warn("THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead."),!this.enablePan},set:function(e){console.warn("THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead."),this.enablePan=!e}},noKeys:{get:function(){return console.warn("THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead."),!this.enableKeys},set:function(e){console.warn("THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead."),this.enableKeys=!e}},staticMoving:{get:function(){return console.warn("THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead."),!this.enableDamping},set:function(e){console.warn("THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead."),this.enableDamping=!e}},dynamicDampingFactor:{get:function(){return console.warn("THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead."),this.dampingFactor},set:function(e){console.warn("THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead."),this.dampingFactor=e}}})}).call(this,n("5a89"))},b0c0:function(e,t,n){var o=n("83ab"),a=n("9bf2").f,r=Function.prototype,i=r.toString,s=/^\s*function ([^ (]*)/,c="name";o&&!(c in r)&&a(r,c,{configurable:!0,get:function(){try{return i.call(this).match(s)[1]}catch(e){return""}}})},b101:function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div")},a=[],r=n("977d"),i=r["a"],s=n("2877"),c=Object(s["a"])(i,o,a,!1,null,null,null);t["default"]=c.exports}}]);
//# sourceMappingURL=chunk-2b455858.fc3f61cd.js.map