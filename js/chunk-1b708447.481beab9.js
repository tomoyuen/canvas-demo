(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1b708447"],{"057f":function(t,e,n){var r=n("fc6a"),i=n("241c").f,o={}.toString,a="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],c=function(t){try{return i(t)}catch(e){return a.slice()}};t.exports.f=function(t){return a&&"[object Window]"==o.call(t)?c(t):i(r(t))}},"06c7":function(t,e,n){"use strict";n.r(e);var r,i,o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("form",{staticClass:"input-block",on:{submit:function(e){return e.preventDefault(),t.repaint(e)}}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.text,expression:"text"}],staticClass:"word",attrs:{type:"text",placeholder:"输入发射文字···"},domProps:{value:t.text},on:{input:function(e){e.target.composing||(t.text=e.target.value)}}}),n("button",{staticClass:"btn",attrs:{type:"sumbit"}},[t._v("发射")])]),n("canvas",{ref:"canvas",staticClass:"canvas"})])},a=[],c=(n("a4d3"),n("e01a"),n("d28b"),n("99af"),n("cb29"),n("d3b7"),n("3ca3"),n("ddb0"),n("276c")),f=[],u=0,s=null,l=500,d="Helvetica Neue, Helvetica, Arial, sans-serif",h=function t(e,n,r){Object(c["a"])(this,t),this.x=e,this.y=n,this.radius=r,this.frameNum=0,this.frameCount=Math.ceil(3e3/16.66),this.sx=1e3,this.sy=900,this.delay=this.frameCount*Math.random(),this.delayCount=0};function v(t){i.font="".concat(t,"px ").concat(d)}function b(t){return!isNaN(parseFloat(t))&&isFinite(t)}function g(){f=[];for(var t=i.getImageData(0,0,r.width,r.height),e=0;e<t.width;e+=6)for(var n=0;n<t.height;n+=6){var o=4*(n*t.width+e);if(t.data[o+3]>128&&t.data[o]<100){var a=new h(e,n,2);f.push(a)}}}function p(t,e,n,r){return t/=r/2,t<1?n/2*t*t*t+e:(t-=2,n/2*(t*t*t+2)+e)}function m(){var t,e;s=window.requestAnimationFrame(m),i.clearRect(0,0,r.width,r.height),i.fillStyle="#000",u=0;var n=!0,o=!1,a=void 0;try{for(var c,l=f[Symbol.iterator]();!(n=(c=l.next()).done);n=!0){var d=c.value;if(d.delayCount<d.delay)d.delayCount+=1;else if(i.save(),i.beginPath(),d.frameNum<d.frameCount?(t=p(d.frameNum,d.sx,d.x-d.sx,d.frameCount),e=p(d.frameNum,d.sy,d.y-d.sy,d.frameCount),i.arc(t,e,d.radius,0,2*Math.PI),d.frameNum+=1):(i.arc(d.x,d.y,d.radius,0,2*Math.PI),u+=1),i.fill(),i.restore(),u>=f.length)return void window.cancelAnimationFrame(s)}}catch(h){o=!0,a=h}finally{try{n||null==l.return||l.return()}finally{if(o)throw a}}}function y(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"beta",e=0;i.clearRect(0,0,r.width,r.height),s&&window.cancelAnimationFrame(s),e=Math.min(l,r.width/i.measureText(t).width*.8*l,r.height/l*(b(t)?1:.5)*l),v(e),i.textBaseline="top",i.fillText(t,10,0),g(),i.clearRect(0,0,r.width,r.height),m()}var w={data:function(){return{text:""}},mounted:function(){r=this.$refs.canvas,i=r.getContext("2d"),r.width=window.innerWidth,r.height=window.innerHeight,y()},methods:{repaint:function(){y(this.text)}}},S=w,x=(n("a75f"),n("2877")),L=Object(x["a"])(S,o,a,!1,null,"32055dc4",null);e["default"]=L.exports},"276c":function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}n.d(e,"a",(function(){return r}))},"3ca3":function(t,e,n){"use strict";var r=n("6547").charAt,i=n("69f3"),o=n("7dd0"),a="String Iterator",c=i.set,f=i.getterFor(a);o(String,"String",(function(t){c(this,{type:a,string:String(t),index:0})}),(function(){var t,e=f(this),n=e.string,i=e.index;return i>=n.length?{value:void 0,done:!0}:(t=r(n,i),e.index+=t.length,{value:t,done:!1})}))},"5a0b":function(t,e,n){},6547:function(t,e,n){var r=n("a691"),i=n("1d80"),o=function(t){return function(e,n){var o,a,c=String(i(e)),f=r(n),u=c.length;return f<0||f>=u?t?"":void 0:(o=c.charCodeAt(f),o<55296||o>56319||f+1===u||(a=c.charCodeAt(f+1))<56320||a>57343?t?c.charAt(f):o:t?c.slice(f,f+2):a-56320+(o-55296<<10)+65536)}};t.exports={codeAt:o(!1),charAt:o(!0)}},"746f":function(t,e,n){var r=n("428f"),i=n("5135"),o=n("e538"),a=n("9bf2").f;t.exports=function(t){var e=r.Symbol||(r.Symbol={});i(e,t)||a(e,t,{value:o.f(t)})}},"81d5":function(t,e,n){"use strict";var r=n("7b0b"),i=n("23cb"),o=n("50c4");t.exports=function(t){var e=r(this),n=o(e.length),a=arguments.length,c=i(a>1?arguments[1]:void 0,n),f=a>2?arguments[2]:void 0,u=void 0===f?n:i(f,n);while(u>c)e[c++]=t;return e}},8418:function(t,e,n){"use strict";var r=n("c04e"),i=n("9bf2"),o=n("5c6c");t.exports=function(t,e,n){var a=r(e);a in t?i.f(t,a,o(0,n)):t[a]=n}},"99af":function(t,e,n){"use strict";var r=n("23e7"),i=n("d039"),o=n("e8b5"),a=n("861d"),c=n("7b0b"),f=n("50c4"),u=n("8418"),s=n("65f0"),l=n("1dde"),d=n("b622"),h=n("2d00"),v=d("isConcatSpreadable"),b=9007199254740991,g="Maximum allowed index exceeded",p=h>=51||!i((function(){var t=[];return t[v]=!1,t.concat()[0]!==t})),m=l("concat"),y=function(t){if(!a(t))return!1;var e=t[v];return void 0!==e?!!e:o(t)},w=!p||!m;r({target:"Array",proto:!0,forced:w},{concat:function(t){var e,n,r,i,o,a=c(this),l=s(a,0),d=0;for(e=-1,r=arguments.length;e<r;e++)if(o=-1===e?a:arguments[e],y(o)){if(i=f(o.length),d+i>b)throw TypeError(g);for(n=0;n<i;n++,d++)n in o&&u(l,d,o[n])}else{if(d>=b)throw TypeError(g);u(l,d++,o)}return l.length=d,l}})},a4d3:function(t,e,n){"use strict";var r=n("23e7"),i=n("da84"),o=n("d066"),a=n("c430"),c=n("83ab"),f=n("4930"),u=n("fdbf"),s=n("d039"),l=n("5135"),d=n("e8b5"),h=n("861d"),v=n("825a"),b=n("7b0b"),g=n("fc6a"),p=n("c04e"),m=n("5c6c"),y=n("7c73"),w=n("df75"),S=n("241c"),x=n("057f"),L=n("7418"),C=n("06cf"),O=n("9bf2"),T=n("d1e7"),N=n("9112"),P=n("6eeb"),M=n("5692"),A=n("f772"),j=n("d012"),E=n("90e3"),F=n("b622"),k=n("e538"),D=n("746f"),H=n("d44e"),R=n("69f3"),V=n("b727").forEach,G=A("hidden"),I="Symbol",J="prototype",$=F("toPrimitive"),_=R.set,q=R.getterFor(I),B=Object[J],W=i.Symbol,Q=o("JSON","stringify"),z=C.f,K=O.f,U=x.f,X=T.f,Y=M("symbols"),Z=M("op-symbols"),tt=M("string-to-symbol-registry"),et=M("symbol-to-string-registry"),nt=M("wks"),rt=i.QObject,it=!rt||!rt[J]||!rt[J].findChild,ot=c&&s((function(){return 7!=y(K({},"a",{get:function(){return K(this,"a",{value:7}).a}})).a}))?function(t,e,n){var r=z(B,e);r&&delete B[e],K(t,e,n),r&&t!==B&&K(B,e,r)}:K,at=function(t,e){var n=Y[t]=y(W[J]);return _(n,{type:I,tag:t,description:e}),c||(n.description=e),n},ct=u?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof W},ft=function(t,e,n){t===B&&ft(Z,e,n),v(t);var r=p(e,!0);return v(n),l(Y,r)?(n.enumerable?(l(t,G)&&t[G][r]&&(t[G][r]=!1),n=y(n,{enumerable:m(0,!1)})):(l(t,G)||K(t,G,m(1,{})),t[G][r]=!0),ot(t,r,n)):K(t,r,n)},ut=function(t,e){v(t);var n=g(e),r=w(n).concat(vt(n));return V(r,(function(e){c&&!lt.call(n,e)||ft(t,e,n[e])})),t},st=function(t,e){return void 0===e?y(t):ut(y(t),e)},lt=function(t){var e=p(t,!0),n=X.call(this,e);return!(this===B&&l(Y,e)&&!l(Z,e))&&(!(n||!l(this,e)||!l(Y,e)||l(this,G)&&this[G][e])||n)},dt=function(t,e){var n=g(t),r=p(e,!0);if(n!==B||!l(Y,r)||l(Z,r)){var i=z(n,r);return!i||!l(Y,r)||l(n,G)&&n[G][r]||(i.enumerable=!0),i}},ht=function(t){var e=U(g(t)),n=[];return V(e,(function(t){l(Y,t)||l(j,t)||n.push(t)})),n},vt=function(t){var e=t===B,n=U(e?Z:g(t)),r=[];return V(n,(function(t){!l(Y,t)||e&&!l(B,t)||r.push(Y[t])})),r};if(f||(W=function(){if(this instanceof W)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,e=E(t),n=function(t){this===B&&n.call(Z,t),l(this,G)&&l(this[G],e)&&(this[G][e]=!1),ot(this,e,m(1,t))};return c&&it&&ot(B,e,{configurable:!0,set:n}),at(e,t)},P(W[J],"toString",(function(){return q(this).tag})),P(W,"withoutSetter",(function(t){return at(E(t),t)})),T.f=lt,O.f=ft,C.f=dt,S.f=x.f=ht,L.f=vt,k.f=function(t){return at(F(t),t)},c&&(K(W[J],"description",{configurable:!0,get:function(){return q(this).description}}),a||P(B,"propertyIsEnumerable",lt,{unsafe:!0}))),r({global:!0,wrap:!0,forced:!f,sham:!f},{Symbol:W}),V(w(nt),(function(t){D(t)})),r({target:I,stat:!0,forced:!f},{for:function(t){var e=String(t);if(l(tt,e))return tt[e];var n=W(e);return tt[e]=n,et[n]=e,n},keyFor:function(t){if(!ct(t))throw TypeError(t+" is not a symbol");if(l(et,t))return et[t]},useSetter:function(){it=!0},useSimple:function(){it=!1}}),r({target:"Object",stat:!0,forced:!f,sham:!c},{create:st,defineProperty:ft,defineProperties:ut,getOwnPropertyDescriptor:dt}),r({target:"Object",stat:!0,forced:!f},{getOwnPropertyNames:ht,getOwnPropertySymbols:vt}),r({target:"Object",stat:!0,forced:s((function(){L.f(1)}))},{getOwnPropertySymbols:function(t){return L.f(b(t))}}),Q){var bt=!f||s((function(){var t=W();return"[null]"!=Q([t])||"{}"!=Q({a:t})||"{}"!=Q(Object(t))}));r({target:"JSON",stat:!0,forced:bt},{stringify:function(t,e,n){var r,i=[t],o=1;while(arguments.length>o)i.push(arguments[o++]);if(r=e,(h(e)||void 0!==t)&&!ct(t))return d(e)||(e=function(t,e){if("function"==typeof r&&(e=r.call(this,t,e)),!ct(e))return e}),i[1]=e,Q.apply(null,i)}})}W[J][$]||N(W[J],$,W[J].valueOf),H(W,I),j[G]=!0},a75f:function(t,e,n){"use strict";var r=n("5a0b"),i=n.n(r);i.a},cb29:function(t,e,n){var r=n("23e7"),i=n("81d5"),o=n("44d2");r({target:"Array",proto:!0},{fill:i}),o("fill")},d28b:function(t,e,n){var r=n("746f");r("iterator")},ddb0:function(t,e,n){var r=n("da84"),i=n("fdbc"),o=n("e260"),a=n("9112"),c=n("b622"),f=c("iterator"),u=c("toStringTag"),s=o.values;for(var l in i){var d=r[l],h=d&&d.prototype;if(h){if(h[f]!==s)try{a(h,f,s)}catch(b){h[f]=s}if(h[u]||a(h,u,l),i[l])for(var v in o)if(h[v]!==o[v])try{a(h,v,o[v])}catch(b){h[v]=o[v]}}}},e01a:function(t,e,n){"use strict";var r=n("23e7"),i=n("83ab"),o=n("da84"),a=n("5135"),c=n("861d"),f=n("9bf2").f,u=n("e893"),s=o.Symbol;if(i&&"function"==typeof s&&(!("description"in s.prototype)||void 0!==s().description)){var l={},d=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),e=this instanceof d?new s(t):void 0===t?s():s(t);return""===t&&(l[e]=!0),e};u(d,s);var h=d.prototype=s.prototype;h.constructor=d;var v=h.toString,b="Symbol(test)"==String(s("test")),g=/^Symbol\((.*)\)[^)]+$/;f(h,"description",{configurable:!0,get:function(){var t=c(this)?this.valueOf():this,e=v.call(t);if(a(l,t))return"";var n=b?e.slice(7,-1):e.replace(g,"$1");return""===n?void 0:n}}),r({global:!0,forced:!0},{Symbol:d})}},e538:function(t,e,n){var r=n("b622");e.f=r},fdbc:function(t,e){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}}}]);
//# sourceMappingURL=chunk-1b708447.481beab9.js.map