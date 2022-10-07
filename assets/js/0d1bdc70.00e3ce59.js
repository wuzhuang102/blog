"use strict";(self.webpackChunkwz_blog=self.webpackChunkwz_blog||[]).push([[3416],{9613:function(e,n,t){t.d(n,{Zo:function(){return s},kt:function(){return k}});var r=t(9496);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function p(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var o=r.createContext({}),u=function(e){var n=r.useContext(o),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},s=function(e){var n=u(e.components);return r.createElement(o.Provider,{value:n},e.children)},c={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,l=e.originalType,o=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),m=u(t),k=a,d=m["".concat(o,".").concat(k)]||m[k]||c[k]||l;return t?r.createElement(d,i(i({ref:n},s),{},{components:t})):r.createElement(d,i({ref:n},s))}));function k(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var l=t.length,i=new Array(l);i[0]=m;var p={};for(var o in n)hasOwnProperty.call(n,o)&&(p[o]=n[o]);p.originalType=e,p.mdxType="string"==typeof e?e:a,i[1]=p;for(var u=2;u<l;u++)i[u]=t[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},6915:function(e,n,t){t.r(n),t.d(n,{assets:function(){return s},contentTitle:function(){return o},default:function(){return k},frontMatter:function(){return p},metadata:function(){return u},toc:function(){return c}});var r=t(2182),a=t(9028),l=(t(9496),t(9613)),i=["components"],p={},o="Lerna",u={unversionedId:"node/npm/lerna",id:"node/npm/lerna",title:"Lerna",description:"\u4f7f\u7528\u65b9\u6cd5",source:"@site/packages/docs/node/npm/lerna.md",sourceDirName:"node/npm",slug:"/node/npm/lerna",permalink:"/blog/docs/node/npm/lerna",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"\u5305\u7ba1\u7406\u5668",permalink:"/blog/docs/node/npm/"},next:{title:"Node \u5de5\u5177\u5305\u5408\u96c6",permalink:"/blog/docs/node/node-package"}},s={},c=[{value:"\u4f7f\u7528\u65b9\u6cd5",id:"\u4f7f\u7528\u65b9\u6cd5",level:2},{value:"\u57fa\u7840\u547d\u4ee4",id:"\u57fa\u7840\u547d\u4ee4",level:2},{value:"1. lerna publish",id:"1-lerna-publish",level:3},{value:"\u4f7f\u7528",id:"\u4f7f\u7528",level:4},{value:"lerna publish \u751f\u547d\u5468\u671f",id:"lerna-publish-\u751f\u547d\u5468\u671f",level:4},{value:"2. learn version",id:"2-learn-version",level:3},{value:"\u6ce8\u610f\u4e8b\u9879",id:"\u6ce8\u610f\u4e8b\u9879",level:2},{value:"1. You must sign up for private packages",id:"1-you-must-sign-up-for-private-packages",level:3},{value:"2. learn \u53d1\u5e03\u5931\u8d25\u4e4b\u540e\u7684\u89e3\u51b3\u65b9\u6848",id:"2-learn-\u53d1\u5e03\u5931\u8d25\u4e4b\u540e\u7684\u89e3\u51b3\u65b9\u6848",level:3}],m={toc:c};function k(e){var n=e.components,t=(0,a.Z)(e,i);return(0,l.kt)("wrapper",(0,r.Z)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"lerna"},"Lerna"),(0,l.kt)("h2",{id:"\u4f7f\u7528\u65b9\u6cd5"},"\u4f7f\u7528\u65b9\u6cd5"),(0,l.kt)("h2",{id:"\u57fa\u7840\u547d\u4ee4"},"\u57fa\u7840\u547d\u4ee4"),(0,l.kt)("h3",{id:"1-lerna-publish"},"1. ",(0,l.kt)("a",{parentName:"h3",href:"https://github.com/lerna/lerna/tree/main/commands/publish"},"lerna publish")),(0,l.kt)("p",null,"lerna \u4e0d\u4f1a\u53d1\u5e03 package.json \u4e2d private \u4e3a true \u7684\u5305"),(0,l.kt)("h4",{id:"\u4f7f\u7528"},"\u4f7f\u7528"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"learn publish\uff1a\u53d1\u5e03\u6709\u6539\u52a8\u7684\u5305"),(0,l.kt)("li",{parentName:"ul"},"learn publish from-git\uff1a \u53d1\u5e03\u5df2\u7ecf\u6253\u4e86 tag \u7684\u5305\uff0c\u914d\u5408 lerna version \u4f7f\u7528"),(0,l.kt)("li",{parentName:"ul"},"learn publish from-package\uff1a\u53d1\u5e03 npm registry \u4e0d\u5b58\u5728\u7684\u5305")),(0,l.kt)("h4",{id:"lerna-publish-\u751f\u547d\u5468\u671f"},"lerna publish ",(0,l.kt)("a",{parentName:"h4",href:"https://github.com/lerna/lerna/tree/main/commands/publish#lifecycle-scripts"},"\u751f\u547d\u5468\u671f")),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"root ",(0,l.kt)("inlineCode",{parentName:"li"},"prepublish")),(0,l.kt)("li",{parentName:"ol"},"root ",(0,l.kt)("inlineCode",{parentName:"li"},"prepare")),(0,l.kt)("li",{parentName:"ol"},"root ",(0,l.kt)("inlineCode",{parentName:"li"},"prepublishOnly")),(0,l.kt)("li",{parentName:"ol"},"root ",(0,l.kt)("inlineCode",{parentName:"li"},"prepack")),(0,l.kt)("li",{parentName:"ol"},"For each changed package",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"i. ",(0,l.kt)("inlineCode",{parentName:"li"},"prepublish")),(0,l.kt)("li",{parentName:"ul"},"ii. ",(0,l.kt)("inlineCode",{parentName:"li"},"prepare")),(0,l.kt)("li",{parentName:"ul"},"iii. ",(0,l.kt)("inlineCode",{parentName:"li"},"prepublishOnly")),(0,l.kt)("li",{parentName:"ul"},"iv. ",(0,l.kt)("inlineCode",{parentName:"li"},"prepack")),(0,l.kt)("li",{parentName:"ul"},"v. Create package tarball in temp directory"),(0,l.kt)("li",{parentName:"ul"},"vi. ",(0,l.kt)("inlineCode",{parentName:"li"},"postpack")))),(0,l.kt)("li",{parentName:"ol"},"root ",(0,l.kt)("inlineCode",{parentName:"li"},"postpack")),(0,l.kt)("li",{parentName:"ol"},"For each changed package",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"i. publish package to configured registry"),(0,l.kt)("li",{parentName:"ul"},"ii. ",(0,l.kt)("inlineCode",{parentName:"li"},"publish")),(0,l.kt)("li",{parentName:"ul"},"iii. ",(0,l.kt)("inlineCode",{parentName:"li"},"postpublish")))),(0,l.kt)("li",{parentName:"ol"},"root ",(0,l.kt)("inlineCode",{parentName:"li"},"publish")),(0,l.kt)("li",{parentName:"ol"},"root ",(0,l.kt)("inlineCode",{parentName:"li"},"postpublish")),(0,l.kt)("li",{parentName:"ol"},"update dist-tag to latest")),(0,l.kt)("h3",{id:"2-learn-version"},"2. ",(0,l.kt)("a",{parentName:"h3",href:"https://github.com/lerna/lerna/tree/main/commands/version"},"learn version")),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"\u6807\u8bb0\u4ece\u4e0a\u6b21\u53d1\u5e03\u81f3\u4eca\u66f4\u65b0\u7684 packages"),(0,l.kt)("li",{parentName:"ol"},"\u65b0\u7248\u672c\u63d0\u793a"),(0,l.kt)("li",{parentName:"ol"},"\u4fee\u6539\u5305\u7684\u5143\u6570\u636e\u548c\u6620\u5c04\u7248\u672c\uff0c\u5728\u6839\u76ee\u5f55\u548c\u5305\u76ee\u5f55\u4e2d\u8fd0\u884c\u9002\u5f53\u7684\u751f\u547d\u5468\u671f\u811a\u672c"),(0,l.kt)("li",{parentName:"ol"},"\u63d0\u4ea4\u6539\u52a8\u5e76\u6253 tag"),(0,l.kt)("li",{parentName:"ol"},"\u63a8\u9001\u5230\u8fdc\u7aef")),(0,l.kt)("h2",{id:"\u6ce8\u610f\u4e8b\u9879"},"\u6ce8\u610f\u4e8b\u9879"),(0,l.kt)("h3",{id:"1-you-must-sign-up-for-private-packages"},"1. You must sign up for private packages"),(0,l.kt)("p",null,"lerna publish \u65f6\uff0c\u82e5\u5305\u540d\u4e2d\u5e26 @\uff0c\u9ed8\u8ba4\u53d1\u5e03\u7684\u662f\u79c1\u5305\uff0c\u5c31\u4f1a\u51fa\u73b0\u6b64\u95ee\u9898"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("strong",{parentName:"p"},"npm")," \u53ef\u4ee5\u901a\u8fc7 ",(0,l.kt)("inlineCode",{parentName:"p"},"npm publish --access=public")," \u89e3\u51b3")),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("strong",{parentName:"p"},"lerna")," \u4e2d\u80fd\u901a\u8fc7\u914d\u7f6e\u6587\u4ef6\u89e3\u51b3"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-json"},'// package.json \u8ffd\u52a0\u914d\u7f6e\n{\n  "name": "@feu/tools",\n  "publishConfig": {\n    // \u5982\u679c\u8be5\u6a21\u5757\u9700\u8981\u53d1\u5e03\uff0c\u5bf9\u4e8escope\u6a21\u5757\uff0c\u9700\u8981\u8bbe\u7f6e\u4e3apublish\uff0c\u5426\u5219\u9700\u8981\u6743\u9650\u9a8c\u8bc1\n    "access": "publish"\n  }\n}\n')))),(0,l.kt)("h3",{id:"2-learn-\u53d1\u5e03\u5931\u8d25\u4e4b\u540e\u7684\u89e3\u51b3\u65b9\u6848"},"2. learn \u53d1\u5e03\u5931\u8d25\u4e4b\u540e\u7684\u89e3\u51b3\u65b9\u6848"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"lerna publish")," \u672c\u8d28\u662f\u4ece\u672c\u5730\u63d0\u4ea4\u4ee3\u7801\u3001\u6253 tag\u3001\u7136\u540e ",(0,l.kt)("inlineCode",{parentName:"p"},"npm publish"),"\uff0c\u51fa\u95ee\u9898\u5f80\u5f80\u5728\u6700\u540e\u4e00\u6b65\uff0c\u4e4b\u540e\u60f3\u518d publish \u603b\u662f\u4f1a\u63d0\u793a ",(0,l.kt)("inlineCode",{parentName:"p"},"No changed packages to publish")),(0,l.kt)("p",null,"\u4ece git \u63d0\u4ea4\u4e2d\u53d1\u5e03\u65b0\u5305"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"lerna publish form-git\n")))}k.isMDXComponent=!0}}]);