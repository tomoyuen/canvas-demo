(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-bada620c"],{"0b9f":function(e,r,t){"use strict";(function(e){t("6482");var n,i,o,a,l,s,c=t("3191"),p=t.n(c),d=0,u=0,f=window.innerWidth/2,h=window.innerHeight/2;function m(){f=window.innerWidth/2,h=window.innerHeight/2,i.aspect=window.innerWidth/window.innerHeight,i.updateProjectionMatrix(),a.setSize(window.innerWidth,window.innerHeight)}function v(e){d=10*(e.clientX-f),u=10*(e.clientY-h)}function x(){i.position.x+=.05*(d-i.position.x),i.position.y+=.05*(-u-i.position.y),i.lookAt(o.position);var e=Date.now();s.rotation.x=.5*Math.sin(7e-4*e),s.rotation.y=.5*Math.sin(3e-4*e),s.rotation.z=.5*Math.sin(2e-4*e),a.render(o,i)}function y(){window.requestAnimationFrame(y),x(),n.update()}function w(r){i=new e.PerspectiveCamera(60,window.innerWidth/window.innerHeight,1,1e4),i.position.z=500,o=new e.Scene,l=new e.BoxGeometry(100,100,100);var t=new e.MeshNormalMaterial;s=new e.Group;for(var c=0;c<200;c++){var d=new e.Mesh(l,t);d.position.x=2e3*Math.random()-1e3,d.position.y=2e3*Math.random()-1e3,d.position.z=2e3*Math.random()-1e3,d.rotation.x=2*Math.random()*Math.PI,d.rotation.y=2*Math.random()*Math.PI,d.matrixAutoUpdate=!1,d.updateMatrix(),s.add(d)}o.add(s),a=new e.WebGLRenderer,a.setClearColor(16777215),a.setPixelRatio(window.devicePixelRatio),a.setSize(window.innerWidth,window.innerHeight),r.appendChild(a.domElement),n=new p.a,r.appendChild(n.dom),document.addEventListener("mousemove",v,!1),window.addEventListener("resize",m,!1)}r["a"]={mounted:function(){w(this.$el),y()}}}).call(this,t("5a89"))},"2a34":function(e,r,t){"use strict";t.r(r);var n=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div")},i=[],o=t("0b9f"),a=o["a"],l=t("2877"),s=Object(l["a"])(a,n,i,!1,null,null,null);r["default"]=s.exports},3191:function(e,r,t){(function(r,t){e.exports=t()})(0,(function(){var e=function(){function r(e){return i.appendChild(e.dom),e}function t(e){for(var r=0;r<i.children.length;r++)i.children[r].style.display=r===e?"block":"none";n=e}var n=0,i=document.createElement("div");i.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",i.addEventListener("click",(function(e){e.preventDefault(),t(++n%i.children.length)}),!1);var o=(performance||Date).now(),a=o,l=0,s=r(new e.Panel("FPS","#0ff","#002")),c=r(new e.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var p=r(new e.Panel("MB","#f08","#201"));return t(0),{REVISION:16,dom:i,addPanel:r,showPanel:t,begin:function(){o=(performance||Date).now()},end:function(){l++;var e=(performance||Date).now();if(c.update(e-o,200),e>a+1e3&&(s.update(1e3*l/(e-a),100),a=e,l=0,p)){var r=performance.memory;p.update(r.usedJSHeapSize/1048576,r.jsHeapSizeLimit/1048576)}return e},update:function(){o=this.end()},domElement:i,setMode:t}};return e.Panel=function(e,r,t){var n=1/0,i=0,o=Math.round,a=o(window.devicePixelRatio||1),l=80*a,s=48*a,c=3*a,p=2*a,d=3*a,u=15*a,f=74*a,h=30*a,m=document.createElement("canvas");m.width=l,m.height=s,m.style.cssText="width:80px;height:48px";var v=m.getContext("2d");return v.font="bold "+9*a+"px Helvetica,Arial,sans-serif",v.textBaseline="top",v.fillStyle=t,v.fillRect(0,0,l,s),v.fillStyle=r,v.fillText(e,c,p),v.fillRect(d,u,f,h),v.fillStyle=t,v.globalAlpha=.9,v.fillRect(d,u,f,h),{dom:m,update:function(s,x){n=Math.min(n,s),i=Math.max(i,s),v.fillStyle=t,v.globalAlpha=1,v.fillRect(0,0,l,u),v.fillStyle=r,v.fillText(o(s)+" "+e+" ("+o(n)+"-"+o(i)+")",c,p),v.drawImage(m,d+a,u,f-a,h,d,u,f-a,h),v.fillRect(d+f-a,u,a,h),v.fillStyle=t,v.globalAlpha=.9,v.fillRect(d+f-a,u,a,o((1-s/x)*h))}}},e}))},6482:function(e,r,t){(function(e){e.RenderableObject=function(){this.id=0,this.object=null,this.z=0,this.renderOrder=0},e.RenderableFace=function(){this.id=0,this.v1=new e.RenderableVertex,this.v2=new e.RenderableVertex,this.v3=new e.RenderableVertex,this.normalModel=new e.Vector3,this.vertexNormalsModel=[new e.Vector3,new e.Vector3,new e.Vector3],this.vertexNormalsLength=0,this.color=new e.Color,this.material=null,this.uvs=[new e.Vector2,new e.Vector2,new e.Vector2],this.z=0,this.renderOrder=0},e.RenderableVertex=function(){this.position=new e.Vector3,this.positionWorld=new e.Vector3,this.positionScreen=new e.Vector4,this.visible=!0},e.RenderableVertex.prototype.copy=function(e){this.positionWorld.copy(e.positionWorld),this.positionScreen.copy(e.positionScreen)},e.RenderableLine=function(){this.id=0,this.v1=new e.RenderableVertex,this.v2=new e.RenderableVertex,this.vertexColors=[new e.Color,new e.Color],this.material=null,this.z=0,this.renderOrder=0},e.RenderableSprite=function(){this.id=0,this.object=null,this.x=0,this.y=0,this.z=0,this.rotation=0,this.scale=new e.Vector2,this.material=null,this.renderOrder=0},e.Projector=function(){var r,t,n,i,o,a,l,s,c,p,d,u=[],f=0,h=[],m=0,v=[],x=0,y=[],w=0,g=[],M=0,S={objects:[],lights:[],elements:[]},b=new e.Vector3,z=new e.Vector4,V=new e.Box3(new e.Vector3(-1,-1,-1),new e.Vector3(1,1,1)),j=new e.Box3,R=new Array(3),C=new e.Matrix4,O=new e.Matrix4,P=new e.Matrix4,T=new e.Matrix3,W=new e.Frustum,A=new e.Vector4,L=new e.Vector4;this.projectVector=function(e,r){console.warn("THREE.Projector: .projectVector() is now vector.project()."),e.project(r)},this.unprojectVector=function(e,r){console.warn("THREE.Projector: .unprojectVector() is now vector.unproject()."),e.unproject(r)},this.pickingRay=function(){console.error("THREE.Projector: .pickingRay() is now raycaster.setFromCamera().")};var k=function(){var r=[],t=[],i=[],a=null,s=new e.Matrix3;function c(e){a=e,a.material,s.getNormalMatrix(a.matrixWorld),r.length=0,t.length=0,i.length=0}function p(e){var r=e.position,t=e.positionWorld,n=e.positionScreen;t.copy(r).applyMatrix4(d),n.copy(t).applyMatrix4(O);var i=1/n.w;n.x*=i,n.y*=i,n.z*=i,e.visible=n.x>=-1&&n.x<=1&&n.y>=-1&&n.y<=1&&n.z>=-1&&n.z<=1}function u(e,r,t){n=F(),n.position.set(e,r,t),p(n)}function f(e,t,n){r.push(e,t,n)}function m(e,r,n){t.push(e,r,n)}function v(e,r){i.push(e,r)}function x(e,r,t){return!0===e.visible||!0===r.visible||!0===t.visible||(R[0]=e.positionScreen,R[1]=r.positionScreen,R[2]=t.positionScreen,V.intersectsBox(j.setFromPoints(R)))}function y(e,r,t){return(t.positionScreen.x-e.positionScreen.x)*(r.positionScreen.y-e.positionScreen.y)-(t.positionScreen.y-e.positionScreen.y)*(r.positionScreen.x-e.positionScreen.x)<0}function w(r,n){var i=h[r],o=h[n];i.positionScreen.copy(i.position).applyMatrix4(P),o.positionScreen.copy(o.position).applyMatrix4(P),!0===X(i.positionScreen,o.positionScreen)&&(i.positionScreen.multiplyScalar(1/i.positionScreen.w),o.positionScreen.multiplyScalar(1/o.positionScreen.w),l=G(),l.id=a.id,l.v1.copy(i),l.v2.copy(o),l.z=Math.max(i.positionScreen.z,o.positionScreen.z),l.renderOrder=a.renderOrder,l.material=a.material,a.material.vertexColors===e.VertexColors&&(l.vertexColors[0].fromArray(t,3*r),l.vertexColors[1].fromArray(t,3*n)),S.elements.push(l))}function g(n,l,c,p){var d=h[n],u=h[l],f=h[c];if(!1!==x(d,u,f)&&(p.side===e.DoubleSide||!0===y(d,u,f))){o=D(),o.id=a.id,o.v1.copy(d),o.v2.copy(u),o.v3.copy(f),o.z=(d.positionScreen.z+u.positionScreen.z+f.positionScreen.z)/3,o.renderOrder=a.renderOrder,b.subVectors(f.position,u.position),z.subVectors(d.position,u.position),b.cross(z),o.normalModel.copy(b),o.normalModel.applyMatrix3(s).normalize();for(var m=0;m<3;m++){var v=o.vertexNormalsModel[m];v.fromArray(r,3*arguments[m]),v.applyMatrix3(s).normalize();var w=o.uvs[m];w.fromArray(i,2*arguments[m])}o.vertexNormalsLength=3,o.material=p,p.vertexColors!==e.FaceColors&&p.vertexColors!==e.VertexColors||o.color.fromArray(t,3*n),S.elements.push(o)}}return{setObject:c,projectVertex:p,checkTriangleVisibility:x,checkBackfaceCulling:y,pushVertex:u,pushNormal:f,pushColor:m,pushUv:v,pushLine:w,pushTriangle:g}},E=new k;function B(r){if(!1!==r.visible){if(r instanceof e.Light)S.lights.push(r);else if(r instanceof e.Mesh||r instanceof e.Line||r instanceof e.Points){if(!1===r.material.visible)return;if(!0===r.frustumCulled&&!1===W.intersectsObject(r))return;N(r)}else if(r instanceof e.Sprite){if(!1===r.material.visible)return;if(!0===r.frustumCulled&&!1===W.intersectsSprite(r))return;N(r)}for(var t=r.children,n=0,i=t.length;n<i;n++)B(t[n])}}function N(e){r=I(),r.id=e.id,r.object=e,b.setFromMatrixPosition(e.matrixWorld),b.applyMatrix4(O),r.z=b.z,r.renderOrder=e.renderOrder,S.objects.push(r)}function H(e,r,t){var n=1/e.w;e.z*=n,e.z>=-1&&e.z<=1&&(c=U(),c.id=r.id,c.x=e.x*n,c.y=e.y*n,c.z=e.z,c.renderOrder=r.renderOrder,c.object=r,c.rotation=r.rotation,c.scale.x=r.scale.x*Math.abs(c.x-(e.x+t.projectionMatrix.elements[0])/(e.w+t.projectionMatrix.elements[12])),c.scale.y=r.scale.y*Math.abs(c.y-(e.y+t.projectionMatrix.elements[5])/(e.w+t.projectionMatrix.elements[13])),c.material=r.material,S.elements.push(c))}function I(){if(t===f){var r=new e.RenderableObject;return u.push(r),f++,t++,r}return u[t++]}function F(){if(i===m){var r=new e.RenderableVertex;return h.push(r),m++,i++,r}return h[i++]}function D(){if(a===x){var r=new e.RenderableFace;return v.push(r),x++,a++,r}return v[a++]}function G(){if(s===w){var r=new e.RenderableLine;return y.push(r),w++,s++,r}return y[s++]}function U(){if(p===M){var r=new e.RenderableSprite;return g.push(r),M++,p++,r}return g[p++]}function J(e,r){return e.renderOrder!==r.renderOrder?e.renderOrder-r.renderOrder:e.z!==r.z?r.z-e.z:e.id!==r.id?e.id-r.id:0}function X(e,r){var t=0,n=1,i=e.z+e.w,o=r.z+r.w,a=-e.z+e.w,l=-r.z+r.w;return i>=0&&o>=0&&a>=0&&l>=0||!(i<0&&o<0||a<0&&l<0)&&(i<0?t=Math.max(t,i/(i-o)):o<0&&(n=Math.min(n,i/(i-o))),a<0?t=Math.max(t,a/(a-l)):l<0&&(n=Math.min(n,a/(a-l))),!(n<t)&&(e.lerp(r,t),r.lerp(e,1-n),!0))}this.projectScene=function(r,n,c,u){a=0,s=0,p=0,S.elements.length=0,!0===r.autoUpdate&&r.updateMatrixWorld(),null===n.parent&&n.updateMatrixWorld(),C.copy(n.matrixWorldInverse),O.multiplyMatrices(n.projectionMatrix,C),W.setFromMatrix(O),t=0,S.objects.length=0,S.lights.length=0,B(r),!0===c&&S.objects.sort(J);for(var f=S.objects,m=0,v=f.length;m<v;m++){var x=f[m].object,y=x.geometry;if(E.setObject(x),d=x.matrixWorld,i=0,x instanceof e.Mesh){if(y instanceof e.BufferGeometry){var w=x.material,g=Array.isArray(w),M=y.attributes,V=y.groups;if(void 0===M.position)continue;for(var j=M.position.array,R=0,k=j.length;R<k;R+=3){var N=j[R],I=j[R+1],U=j[R+2];if(!0===w.morphTargets)for(var Y=y.morphAttributes.position,$=x.morphTargetInfluences,_=0,q=Y.length;_<q;_++){var Z=$[_];if(0!==Z){var K=Y[_];N+=(K.getX(R/3)-j[R])*Z,I+=(K.getY(R/3)-j[R+1])*Z,U+=(K.getZ(R/3)-j[R+2])*Z}}E.pushVertex(N,I,U)}if(void 0!==M.normal){var Q=M.normal.array;for(R=0,k=Q.length;R<k;R+=3)E.pushNormal(Q[R],Q[R+1],Q[R+2])}if(void 0!==M.color){var ee=M.color.array;for(R=0,k=ee.length;R<k;R+=3)E.pushColor(ee[R],ee[R+1],ee[R+2])}if(void 0!==M.uv){var re=M.uv.array;for(R=0,k=re.length;R<k;R+=2)E.pushUv(re[R],re[R+1])}if(null!==y.index){var te=y.index.array;if(V.length>0)for(var ne=0;ne<V.length;ne++){var ie=V[ne];if(w=!0===g?x.material[ie.materialIndex]:x.material,void 0!==w)for(R=ie.start,k=ie.start+ie.count;R<k;R+=3)E.pushTriangle(te[R],te[R+1],te[R+2],w)}else for(R=0,k=te.length;R<k;R+=3)E.pushTriangle(te[R],te[R+1],te[R+2],w)}else if(V.length>0)for(ne=0;ne<V.length;ne++){ie=V[ne];if(w=!0===g?x.material[ie.materialIndex]:x.material,void 0!==w)for(R=ie.start,k=ie.start+ie.count;R<k;R+=3)E.pushTriangle(R,R+1,R+2,w)}else for(R=0,k=j.length/3;R<k;R+=3)E.pushTriangle(R,R+1,R+2,w)}else if(y instanceof e.Geometry){var oe=y.vertices,ae=y.faces,le=y.faceVertexUvs[0];T.getNormalMatrix(d);w=x.material,g=Array.isArray(w);for(var se=0,ce=oe.length;se<ce;se++){var pe=oe[se];if(b.copy(pe),!0===w.morphTargets)for(Y=y.morphTargets,$=x.morphTargetInfluences,_=0,q=Y.length;_<q;_++){Z=$[_];if(0!==Z){K=Y[_];var de=K.vertices[se];b.x+=(de.x-pe.x)*Z,b.y+=(de.y-pe.y)*Z,b.z+=(de.z-pe.z)*Z}}E.pushVertex(b.x,b.y,b.z)}for(var ue=0,fe=ae.length;ue<fe;ue++){var he=ae[ue];if(w=!0===g?x.material[he.materialIndex]:x.material,void 0!==w){var me=w.side,ve=h[he.a],xe=h[he.b],ye=h[he.c];if(!1!==E.checkTriangleVisibility(ve,xe,ye)){var we=E.checkBackfaceCulling(ve,xe,ye);if(me!==e.DoubleSide){if(me===e.FrontSide&&!1===we)continue;if(me===e.BackSide&&!0===we)continue}o=D(),o.id=x.id,o.v1.copy(ve),o.v2.copy(xe),o.v3.copy(ye),o.normalModel.copy(he.normal),!1!==we||me!==e.BackSide&&me!==e.DoubleSide||o.normalModel.negate(),o.normalModel.applyMatrix3(T).normalize();for(var ge=he.vertexNormals,Me=0,Se=Math.min(ge.length,3);Me<Se;Me++){var be=o.vertexNormalsModel[Me];be.copy(ge[Me]),!1!==we||me!==e.BackSide&&me!==e.DoubleSide||be.negate(),be.applyMatrix3(T).normalize()}o.vertexNormalsLength=ge.length;var ze=le[ue];if(void 0!==ze)for(var Ve=0;Ve<3;Ve++)o.uvs[Ve].copy(ze[Ve]);o.color=he.color,o.material=w,o.z=(ve.positionScreen.z+xe.positionScreen.z+ye.positionScreen.z)/3,o.renderOrder=x.renderOrder,S.elements.push(o)}}}}}else if(x instanceof e.Line){if(P.multiplyMatrices(O,d),y instanceof e.BufferGeometry){M=y.attributes;if(void 0!==M.position){for(j=M.position.array,R=0,k=j.length;R<k;R+=3)E.pushVertex(j[R],j[R+1],j[R+2]);if(void 0!==M.color)for(ee=M.color.array,R=0,k=ee.length;R<k;R+=3)E.pushColor(ee[R],ee[R+1],ee[R+2]);if(null!==y.index)for(te=y.index.array,R=0,k=te.length;R<k;R+=2)E.pushLine(te[R],te[R+1]);else{var je=x instanceof e.LineSegments?2:1;for(R=0,k=j.length/3-1;R<k;R+=je)E.pushLine(R,R+1)}}}else if(y instanceof e.Geometry){oe=x.geometry.vertices;if(0===oe.length)continue;ve=F(),ve.positionScreen.copy(oe[0]).applyMatrix4(P);for(je=x instanceof e.LineSegments?2:1,se=1,ce=oe.length;se<ce;se++)ve=F(),ve.positionScreen.copy(oe[se]).applyMatrix4(P),(se+1)%je>0||(xe=h[i-2],A.copy(ve.positionScreen),L.copy(xe.positionScreen),!0===X(A,L)&&(A.multiplyScalar(1/A.w),L.multiplyScalar(1/L.w),l=G(),l.id=x.id,l.v1.positionScreen.copy(A),l.v2.positionScreen.copy(L),l.z=Math.max(A.z,L.z),l.renderOrder=x.renderOrder,l.material=x.material,x.material.vertexColors===e.VertexColors&&(l.vertexColors[0].copy(x.geometry.colors[se]),l.vertexColors[1].copy(x.geometry.colors[se-1])),S.elements.push(l)))}}else if(x instanceof e.Points){if(P.multiplyMatrices(O,d),y instanceof e.Geometry)for(oe=x.geometry.vertices,se=0,ce=oe.length;se<ce;se++){pe=oe[se];z.set(pe.x,pe.y,pe.z,1),z.applyMatrix4(P),H(z,x,n)}else if(y instanceof e.BufferGeometry){M=y.attributes;if(void 0!==M.position)for(j=M.position.array,R=0,k=j.length;R<k;R+=3)z.set(j[R],j[R+1],j[R+2],1),z.applyMatrix4(P),H(z,x,n)}}else x instanceof e.Sprite&&(x.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,x.matrixWorld),z.set(d.elements[12],d.elements[13],d.elements[14],1),z.applyMatrix4(O),H(z,x,n))}return!0===u&&S.elements.sort(J),S}}}).call(this,t("5a89"))}}]);
//# sourceMappingURL=chunk-bada620c.1e660416.js.map