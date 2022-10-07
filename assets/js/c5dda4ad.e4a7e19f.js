"use strict";(self.webpackChunkwz_blog=self.webpackChunkwz_blog||[]).push([[6880],{9613:function(e,r,n){n.d(r,{Zo:function(){return s},kt:function(){return m}});var t=n(9496);function o(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function a(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,t)}return n}function c(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?a(Object(n),!0).forEach((function(r){o(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}function l(e,r){if(null==e)return{};var n,t,o=function(e,r){if(null==e)return{};var n,t,o={},a=Object.keys(e);for(t=0;t<a.length;t++)n=a[t],r.indexOf(n)>=0||(o[n]=e[n]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(t=0;t<a.length;t++)n=a[t],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var i=t.createContext({}),p=function(e){var r=t.useContext(i),n=r;return e&&(n="function"==typeof e?e(r):c(c({},r),e)),n},s=function(e){var r=p(e.components);return t.createElement(i.Provider,{value:r},e.children)},u={inlineCode:"code",wrapper:function(e){var r=e.children;return t.createElement(t.Fragment,{},r)}},d=t.forwardRef((function(e,r){var n=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),d=p(n),m=o,k=d["".concat(i,".").concat(m)]||d[m]||u[m]||a;return n?t.createElement(k,c(c({ref:r},s),{},{components:n})):t.createElement(k,c({ref:r},s))}));function m(e,r){var n=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var a=n.length,c=new Array(a);c[0]=d;var l={};for(var i in r)hasOwnProperty.call(r,i)&&(l[i]=r[i]);l.originalType=e,l.mdxType="string"==typeof e?e:o,c[1]=l;for(var p=2;p<a;p++)c[p]=n[p];return t.createElement.apply(null,c)}return t.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9429:function(e,r,n){n.r(r),n.d(r,{assets:function(){return s},contentTitle:function(){return i},default:function(){return m},frontMatter:function(){return l},metadata:function(){return p},toc:function(){return u}});var t=n(2182),o=n(9028),a=(n(9496),n(9613)),c=["components"],l={},i="Docker",p={unversionedId:"tool/docker",id:"tool/docker",title:"Docker",description:"Docker \u5b98\u65b9\u624b\u518c",source:"@site/packages/docs/tool/docker.mdx",sourceDirName:"tool",slug:"/tool/docker",permalink:"/blog/docs/tool/docker",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Git",permalink:"/blog/docs/tool/git"},next:{title:"\u5176\u4ed6\u6280\u672f\u5de5\u5177",permalink:"/blog/docs/tool/other"}},s={},u=[{value:"1. \u57fa\u7840\u547d\u4ee4",id:"1-\u57fa\u7840\u547d\u4ee4",level:2},{value:"\u955c\u50cf\uff08images\uff09",id:"\u955c\u50cfimages",level:3},{value:"\u5bb9\u5668\uff08container\uff09",id:"\u5bb9\u5668container",level:3},{value:"2. \u5e38\u7528\u8f6f\u4ef6\u5b89\u88c5",id:"2-\u5e38\u7528\u8f6f\u4ef6\u5b89\u88c5",level:2},{value:"mysql",id:"mysql",level:3}],d={toc:u};function m(e){var r=e.components,n=(0,o.Z)(e,c);return(0,a.kt)("wrapper",(0,t.Z)({},d,n,{components:r,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"docker"},"Docker"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://docs.docker.com/get-docker/"},"Docker \u5b98\u65b9\u624b\u518c")),(0,a.kt)("h2",{id:"1-\u57fa\u7840\u547d\u4ee4"},"1. \u57fa\u7840\u547d\u4ee4"),(0,a.kt)("p",null,"\u4e3b\u8981\u8bb2\u89e3 docker --help \u4e0b\u5e38\u7528\u547d\u4ee4\u7684\u4f7f\u7528"),(0,a.kt)("h3",{id:"\u955c\u50cfimages"},"\u955c\u50cf\uff08images\uff09"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"docker images                       # \u955c\u50cf\u5217\u8868\ndocker search [param]               # \u955c\u50cf\u641c\u7d22\ndocker pull [image]:[version]       # \u8fdc\u7a0b\u955c\u50cf\u62c9\u81f3\u672c\u5730\ndocker rmi [image]                  # \u5220\u9664\u955c\u50cf\n")),(0,a.kt)("h3",{id:"\u5bb9\u5668container"},"\u5bb9\u5668\uff08container\uff09"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://docs.docker.com/engine/reference/commandline/run/"},"docker run"),"\uff0c\n",(0,a.kt)("a",{parentName:"p",href:"https://docs.docker.com/engine/reference/commandline/exec/"},"docker exec")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"docker run --name [name] [option] [image]           # \u8fd0\u884c\u4e00\u4e2a\u5bb9\u5668\n    # - [option] \u6709\u8bb8\u591a\u53c2\u6570\uff0c\u5177\u4f53\u67e5\u770b docker run --help\n    # - [option] \u5e38\u7528\u7684\u6709\uff1a -d \u540e\u53f0\u8fd0\u884c\n    #                       -it \u8fd0\u884c\u5e76\u8fdb\u5165\u5bb9\u5668\ndocker exec -it [container] bash                    # \u8fdb\u5165\u4e00\u4e2a\u5bb9\u5668\ndocker ps                                           # \u8fd0\u884c\u4e2d\u7684\u5bb9\u5668\ndocker ps -a                                        # \u6240\u6709\u5bb9\u5668\uff0c\u5305\u62ec\u505c\u6b62\u7684\ndocker pause [container]                            # \u6682\u505c\u5bb9\u5668\ndocker unpause [container]                          # \u5f00\u59cb\u4e00\u4e2a\u6682\u505c\u7684\u5bb9\u5668\ndocker stop [container]                             # \u505c\u6b62\u5bb9\u5668\ndocker start [container]                            # \u91cd\u65b0\u542f\u52a8\u5bb9\u5668\ndocker rm [container]                               # \u5220\u9664\u4e00\u4e2a\u505c\u6b62\u8fd0\u884c\u7684\u5bb9\u5668\n")),(0,a.kt)("h2",{id:"2-\u5e38\u7528\u8f6f\u4ef6\u5b89\u88c5"},"2. \u5e38\u7528\u8f6f\u4ef6\u5b89\u88c5"),(0,a.kt)("h3",{id:"mysql"},"mysql"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'docker run -p 3306:3306  --restart=always  --privileged=true --name mysql  -e MYSQL_ROOT_PASSWORD="password" -d mysql\n')),(0,a.kt)("p",null,"docker \u4e2d mysql \u53ef\u80fd\u6709 ",(0,a.kt)("inlineCode",{parentName:"p"},"Client does not support authentication protocol requested by server; consider upgrading MySQL client")," \u95ee\u9898\uff0c\u6267\u884c\u4e0b\u9762\u547d\u4ee4\u89e3\u51b3\u3002\u8fd9\u79cd\u95ee\u9898\u4e3b\u8981\u51fa\u73b0\u5728 node \u8fde\u63a5 mysql \u65f6"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"mysql> ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';\nmysql> flush privileges;\n")))}m.isMDXComponent=!0}}]);