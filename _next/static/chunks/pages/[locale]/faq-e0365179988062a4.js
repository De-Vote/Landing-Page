(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[222],{208:function(a,b,c){(window.__NEXT_P=window.__NEXT_P||[]).push(["/[locale]/faq",function(){return c(590)}])},1407:function(e,b,a){"use strict";a.d(b,{Z:function(){return u}});var f=a(5893);a(7294);var g=a(6031),h=a(682),i=a(8819),j=a(1244),k=a(6957),l=a(4373),m=a(1163),n=a(4725),o=a(9534),p=a(556),c=a(1664),q=a.n(c),r=a(3454),s=function(d){var a=d.locale,b=(0,o.Z)(d,["locale"]),c=(0,m.useRouter)(),e=b.href||c.asPath,g=c.pathname;return Object.keys(c.query).forEach(function(b){if("locale"===b){g=g.replace("[".concat(b,"]"),a);return}g=g.replace("[".concat(b,"]"),c.query[b])}),a&&(e=b.href?"/".concat(r.env.GHPAGE_ROUTE,"/").concat(a).concat(b.href):g),(0,f.jsx)(q(),{href:e,onClick:function(){return p.Z.cache(a)},children:(0,f.jsx)("button",{style:{all:"unset"},children:a})})},d=a(3273),t=a.n(d);function u(e){var a=(0,n.$G)("common").t;(0,m.useRouter)();var b=(0,m.useRouter)(),c=b.query,d=b.locale;return b.asPath,c.slug,(0,f.jsx)(f.Fragment,{children:(0,f.jsx)(g.Z,{bg:"light",expand:"md",sticky:"top",children:(0,f.jsxs)(h.Z,{children:[(0,f.jsx)("img",{alt:"",src:"/favicon-192.png",width:"30",height:"30",className:"d-inline-block align-top"})," ",(0,f.jsx)(g.Z.Brand,{className:"logo-text",children:"De.Vote"}),(0,f.jsx)(g.Z.Toggle,{}),(0,f.jsx)(g.Z.Collapse,{children:(0,f.jsxs)(i.Z,{className:"ml-auto",children:[(0,f.jsx)(j.Z,{className:"nav-link",style:{marginRight:"1%"},children:(0,f.jsx)(l.Z,{href:"/#",as:"/#",children:"zh_hant"==d?"\u4E3B\u9801":"Home"})}),(0,f.jsx)(j.Z,{className:"nav-link",style:{marginRight:"1%"},children:(0,f.jsx)(l.Z,{href:"/#feature",as:"/#feature",children:a("nav.Feature")})}),(0,f.jsx)(j.Z,{className:"nav-link",style:{marginRight:"1%"},children:(0,f.jsx)(l.Z,{href:"/#about",as:"/#about",children:a("nav.About")})}),(0,f.jsx)(j.Z,{className:"nav-link",style:{marginRight:"3%"},children:(0,f.jsx)(l.Z,{href:"/privacy",as:"/privacy",children:a("nav.Privacy")})}),(0,f.jsx)(j.Z,{className:"nav-link",style:{marginRight:"3%"},children:(0,f.jsx)(l.Z,{href:"/faq",as:"/faq",children:a("nav.FAQs")})}),(0,f.jsx)(k.Z,{title:a("nav.Language"),style:{padding:0},children:t().i18n.locales.map(function(a){return(0,f.jsx)(k.Z.Item,{style:{textAlign:"center",padding:0},children:(0,f.jsx)(s,{locale:a})},a)})})]})})]})})})}},5789:function(d,b,a){"use strict";var e=a(5893);a(7294);var c=a(9008),f=a.n(c);b.Z=function(a){return(0,e.jsxs)("div",{children:[(0,e.jsxs)(f(),{children:[(0,e.jsx)("title",{children:"De.Vote \u584A\u5340\u6295\u79D1\u6280\u80A1\u4EFD\u6709\u9650\u516C\u53F8"}),(0,e.jsx)("meta",{charSet:"UTF-8"}),(0,e.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),(0,e.jsx)("meta",{httpEquiv:"X-UA-Compatible",content:"ie=edge"})]}),(0,e.jsx)("div",{children:a.children})]})}},4373:function(d,b,a){"use strict";var e=a(1799),f=a(9396),g=a(9534),h=a(5893);a(7294);var c=a(1664),i=a.n(c),j=a(1163),k=a(3454);b.Z=function(b){var n=b.children,m=b.skipLocaleHandling,c=(0,g.Z)(b,["children","skipLocaleHandling"]),d=(0,j.useRouter)(),l=c.locale||d.query.locale||"",a=c.href||d.asPath;return 0===a.indexOf("http")&&(m=!0),l&&!m&&(a=a?"/".concat(k.env.GHPAGE_ROUTE,"/").concat(l).concat(a):d.pathname.replace("[locale]",l)),(0,h.jsx)(h.Fragment,{children:(0,h.jsx)(i(),{href:a,children:(0,h.jsx)("a",(0,f.Z)((0,e.Z)({},c),{children:n}))})})}},556:function(f,c,a){"use strict";var d=a(9515),e=a(3273),b=a.n(e);c.Z=(0,d.Z)({supportedLngs:b().i18n.locales,fallbackLng:b().i18n.defaultLocale})},3273:function(a){"use strict";a.exports={i18n:{defaultLocale:"en",locales:["en","zh_hant"]}}},590:function(j,c,a){"use strict";a.r(c),a.d(c,{"__N_SSG":function(){return H},default:function(){return I}});var k=a(7568),g=a(4051),l=a.n(g),m=a(5893),n=a(5789),o=a(1407),p=a(682),q=a(7294),h=a(5697),b=a.n(h);function r(a,b){if(!(a instanceof b))throw TypeError("Cannot call a class as a function")}function s(d,c){for(var b=0;b<c.length;b++){var a=c[b];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(d,a.key,a)}}function t(a,b,c){return b&&s(a.prototype,b),c&&s(a,c),a}function d(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function u(){return(u=Object.assign||function(d){for(var a=1;a<arguments.length;a++){var b=arguments[a];for(var c in b)Object.prototype.hasOwnProperty.call(b,c)&&(d[c]=b[c])}return d}).apply(this,arguments)}function v(c,d){var a=Object.keys(c);if(Object.getOwnPropertySymbols){var b=Object.getOwnPropertySymbols(c);d&&(b=b.filter(function(a){return Object.getOwnPropertyDescriptor(c,a).enumerable})),a.push.apply(a,b)}return a}function w(b,a){if("function"!=typeof a&&null!==a)throw TypeError("Super expression must either be null or a function");b.prototype=Object.create(a&&a.prototype,{constructor:{value:b,writable:!0,configurable:!0}}),a&&y(b,a)}function x(a){return(x=Object.setPrototypeOf?Object.getPrototypeOf:function(a){return a.__proto__||Object.getPrototypeOf(a)})(a)}function y(a,b){return(y=Object.setPrototypeOf||function(a,b){return a.__proto__=b,a})(a,b)}function z(a){if(void 0===a)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return a}function A(a){var b=function(){if("undefined"==typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(a){return!1}}();return function(){var e,c,d,f=x(a);if(b){var g=x(this).constructor;d=Reflect.construct(f,arguments,g)}else d=f.apply(this,arguments);return e=this,(c=d)&&("object"==typeof c||"function"==typeof c)?c:z(e)}}var e={return:13,arrowLeft:37,arrowUp:38,arrowRight:39,arrowDown:40,space:32};e.keyCodes=Object.keys(e).reduce(function(a,b){return a[e[b]]=b,a},{});var B={"faq-row-wrapper":"styles_faq-row-wrapper__3vA1D","faq-row":"styles_faq-row__2YF3c","row-body":"styles_row-body__1NvUo","row-title":"styles_row-title__1YiiY","no-tabfocus":"styles_no-tabfocus__1HmyD","row-title-text":"styles_row-title-text__1MuhU","icon-wrapper":"styles_icon-wrapper__2cftw",closed:"styles_closed__39w54","row-content":"styles_row-content__QOGZd",animate:"styles_animate__3ecdr",static:"styles_static__3chYW",expanded:"styles_expanded__3elPy",expanding:"styles_expanding__2OAFB","row-content-text":"styles_row-content-text__2sgAB"};!function(c,d){void 0===d&&(d={});var e=d.insertAt;if(c&&"undefined"!=typeof document){var b=document.head||document.getElementsByTagName("head")[0],a=document.createElement("style");a.type="text/css","top"===e&&b.firstChild?b.insertBefore(a,b.firstChild):b.appendChild(a),a.styleSheet?a.styleSheet.cssText=c:a.appendChild(document.createTextNode(c))}}(".styles_faq-row-wrapper__3vA1D {\n  background-color: var(--faq-bg-color, white); }\n  .styles_faq-row-wrapper__3vA1D h2 {\n    margin: 0;\n    color: var(--title-text-color, black);\n    font-size: var(--title-text-size, 30px); }\n  .styles_faq-row-wrapper__3vA1D .styles_faq-row__2YF3c {\n    display: flex;\n    justify-content: space-between;\n    padding: 5px 0;\n    border-bottom: 1px solid #ccc; }\n  .styles_faq-row-wrapper__3vA1D .styles_row-body__1NvUo .styles_faq-row__2YF3c {\n    flex-direction: column;\n    position: relative; }\n    .styles_faq-row-wrapper__3vA1D .styles_row-body__1NvUo .styles_faq-row__2YF3c .styles_row-title__1YiiY {\n      padding: 10px 0;\n      display: flex;\n      justify-content: space-between;\n      color: var(--row-title-color, black);\n      font-size: var(--row-title-text-size, large);\n      cursor: pointer;\n      align-items: center; }\n      .styles_faq-row-wrapper__3vA1D .styles_row-body__1NvUo .styles_faq-row__2YF3c .styles_row-title__1YiiY.styles_no-tabfocus__1HmyD {\n        outline: none; }\n      .styles_faq-row-wrapper__3vA1D .styles_row-body__1NvUo .styles_faq-row__2YF3c .styles_row-title__1YiiY .styles_row-title-text__1MuhU {\n        padding-right: 3em; }\n      .styles_faq-row-wrapper__3vA1D .styles_row-body__1NvUo .styles_faq-row__2YF3c .styles_row-title__1YiiY .styles_icon-wrapper__2cftw {\n        max-width: 25px;\n        max-height: 25px;\n        margin: 0;\n        padding: 0;\n        color: var(--arrow-color, black);\n        transform: rotate(0deg);\n        transition: transform var(--transition-duration, 0.3s);\n        position: absolute;\n        top: 13px;\n        right: 12px; }\n        .styles_faq-row-wrapper__3vA1D .styles_row-body__1NvUo .styles_faq-row__2YF3c .styles_row-title__1YiiY .styles_icon-wrapper__2cftw svg {\n          width: 100%;\n          height: 100%; }\n        .styles_faq-row-wrapper__3vA1D .styles_row-body__1NvUo .styles_faq-row__2YF3c .styles_row-title__1YiiY .styles_icon-wrapper__2cftw svg {\n          fill: var(--arrow-color, black); }\n      .styles_faq-row-wrapper__3vA1D .styles_row-body__1NvUo .styles_faq-row__2YF3c .styles_row-title__1YiiY.styles_closed__39w54 + .styles_row-content__QOGZd {\n        visibility: hidden; }\n        .styles_faq-row-wrapper__3vA1D .styles_row-body__1NvUo .styles_faq-row__2YF3c .styles_row-title__1YiiY.styles_closed__39w54 + .styles_row-content__QOGZd.styles_animate__3ecdr {\n          opacity: 0;\n          transition: height var(--transition-duration, 0.3s); }\n        .styles_faq-row-wrapper__3vA1D .styles_row-body__1NvUo .styles_faq-row__2YF3c .styles_row-title__1YiiY.styles_closed__39w54 + .styles_row-content__QOGZd.styles_static__3chYW {\n          display: none; }\n      .styles_faq-row-wrapper__3vA1D .styles_row-body__1NvUo .styles_faq-row__2YF3c .styles_row-title__1YiiY.styles_expanded__3elPy + .styles_row-content__QOGZd {\n        visibility: visible; }\n        .styles_faq-row-wrapper__3vA1D .styles_row-body__1NvUo .styles_faq-row__2YF3c .styles_row-title__1YiiY.styles_expanded__3elPy + .styles_row-content__QOGZd.styles_static__3chYW {\n          display: block; }\n      .styles_faq-row-wrapper__3vA1D .styles_row-body__1NvUo .styles_faq-row__2YF3c .styles_row-title__1YiiY.styles_expanded__3elPy .styles_icon-wrapper__2cftw {\n        transform: rotate(180deg); }\n      .styles_faq-row-wrapper__3vA1D .styles_row-body__1NvUo .styles_faq-row__2YF3c .styles_row-title__1YiiY.styles_expanding__2OAFB .styles_icon-wrapper__2cftw {\n        transform: rotate(180deg); }\n    .styles_faq-row-wrapper__3vA1D .styles_row-body__1NvUo .styles_faq-row__2YF3c .styles_row-content__QOGZd {\n      overflow: hidden;\n      transition: height var(--transition-duration, 0.3s);\n      transition-timing-function: var(--timing-function, ease); }\n      .styles_faq-row-wrapper__3vA1D .styles_row-body__1NvUo .styles_faq-row__2YF3c .styles_row-content__QOGZd .styles_row-content-text__2sgAB {\n        color: var(--row-content-color, black);\n        font-size: var(--row-content-text-size, medium);\n        padding: var(--row-content-padding-top, 0) var(--row-content-padding-right, 0) var(--row-content-padding-bottom, 0) var(--row-content-padding-left, 0); }\n");var i=function(b){w(a,q.PureComponent);var c=A(a);function a(){var b;r(this,a);for(var g=arguments.length,h=Array(g),f=0;f<g;f++)h[f]=arguments[f];return d(z(b=c.call.apply(c,[this].concat(h))),"state",{isExpanded:!1,ref:q.createRef(),rowRef:q.createRef(),height:0,rowClassName:"closed"}),d(z(b),"finishTransition",function(){var a=b.state.isExpanded;b.setState({rowClassName:a?"expanded":"closed"})}),d(z(b),"toggle",function(a){b.setState(function(){return{isExpanded:a}})}),d(z(b),"expand",function(){b.setState(function(a){return{isExpanded:!a.isExpanded}})}),d(z(b),"keyPress",function(a){var c=a.keyCode?a.keyCode:a.which;switch(e.keyCodes[c]){case"space":case"return":a.preventDefault(),a.stopPropagation(),b.expand()}}),d(z(b),"setHeight",function(){var a=b.state,c=a.ref,d=a.isExpanded,e=c.current.scrollHeight;b.setState({height:d?e:0})}),b}return t(a,[{key:"getSnapshotBeforeUpdate",value:function(g,e){var f=e.isExpanded,b=this.state.isExpanded,a=this.props.config,c=(a=void 0===a?{}:a).animate,d=void 0===c||c;return b!==f?{rowClassName:b?d?"expanding":"expanded":d?"closing":"closed"}:null}},{key:"componentDidUpdate",value:function(e,f,b){var a=this.props.config,c=(a=void 0===a?{}:a).animate;null!==b&&this.setState(function(c){for(var a=1;a<arguments.length;a++){var b=null!=arguments[a]?arguments[a]:{};a%2?v(Object(b),!0).forEach(function(a){d(c,a,b[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(c,Object.getOwnPropertyDescriptors(b)):v(Object(b)).forEach(function(a){Object.defineProperty(c,a,Object.getOwnPropertyDescriptor(b,a))})}return c}({},b),void 0===c||c?this.setHeight:void 0)}},{key:"componentDidMount",value:function(){var b=this,c=this.state.rowRef;if(this.props.openOnload&&this.expand(),this.props.getRowOptions){var a={expand:function(){b.toggle(!0)},close:function(){b.toggle(!1)},scrollIntoView:function(a){a?c.current.scrollIntoView(a):c.current.scrollIntoView()}};this.props.getRowOptions(a)}}},{key:"render",value:function(){var e=this.props,f=e.data,s=f.title,c=f.content,a=e.config,g=(a=void 0===a?{}:a).animate,h=void 0===g||g,t=a.arrowIcon,i=a.expandIcon,j=a.collapseIcon,k=a.tabFocus,l=void 0!==k&&k,b=this.state,d=b.isExpanded,v=b.ref,w=b.height,m=b.rowClassName,x=b.rowRef,n={onClick:this.expand,role:"button","aria-expanded":d,"aria-controls":"react-faq-rowcontent-".concat(this.props.rowid),onKeyPress:this.keyPress,onKeyDown:this.keyPress};l&&(n.tabIndex=0);var o={role:"region",id:"react-faq-rowcontent-".concat(this.props.rowid),"aria-expanded":d,"aria-hidden":!d,onTransitionEnd:this.finishTransition};h&&(o.style={height:w});var y=["row-title",m,B["row-title"],B[m],l?"":B["no-tabfocus"]].filter(Boolean).join(" "),p=null;p=i&&j?d?j:i:t||q.createElement("div",{dangerouslySetInnerHTML:{__html:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="36px" height="36px"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/><path d="M0 0h24v24H0V0z" fill="none"/></svg>'},className:"arrow-image ".concat(B["arrow-image"]),alt:"Expand arrow"});var z=[B["row-content"],"row-content",h?B.animate:B.static].join(" "),r=[B["row-content-text"],"row-content-text"].join(" "),A=c&&"string"==typeof c?q.createElement("div",{className:r,dangerouslySetInnerHTML:{__html:c}}):q.createElement("div",{className:r},c);return q.createElement("section",{className:"faq-row ".concat(B["faq-row"]),role:"listitem",ref:x},q.createElement("div",u({className:y},n),q.createElement("div",{className:"row-title-text ".concat(B["row-title-text"]),id:"react-faq-rowtitle-".concat(this.props.rowid)},s),q.createElement("span",{className:"icon-wrapper ".concat(B["icon-wrapper"]),"aria-hidden":"true"},p)),q.createElement("div",u({className:z},o,{ref:v}),A))}}]),a}();d(i,"propTypes",{config:b().object,data:b().object,rowid:b().number,getRowOptions:b().func,openOnload:b().bool});var f=function(b){w(a,q.PureComponent);var c=A(a);function a(){var e;r(this,a);for(var f=arguments.length,g=Array(f),b=0;b<f;b++)g[b]=arguments[b];return d(z(e=c.call.apply(c,[this].concat(g))),"state",{rowsOption:[]}),e}return t(a,[{key:"componentDidMount",value:function(){this.props.getRowOptions&&this.props.getRowOptions(this.state.rowsOption)}},{key:"render",value:function(){var n=this,c=this.props.data||{},d=c.title,e=c.rows,f=void 0===e?[]:e,g=this.props,h=g.styles,a=void 0===h?{}:h,b=g.config,o=((b=void 0===b?{}:b).animate,b.openOnload),j={"--faq-bg-color":a.bgColor,"--title-text-color":a.titleTextColor,"--title-text-size":a.titleTextSize,"--row-title-color":a.rowTitleColor,"--row-title-text-size":a.rowTitleTextSize,"--row-content-color":a.rowContentColor,"--row-content-text-size":a.rowContentTextSize,"--row-content-padding-top":a.rowContentPaddingTop,"--row-content-padding-bottom":a.rowContentPaddingBottom,"--row-content-padding-right":a.rowContentPaddingRight,"--row-content-padding-left":a.rowContentPaddingLeft,"--arrow-color":a.arrowColor,"--transition-duration":a.transitionDuration,"--timing-function":a.timingFunc},k="faq-row-wrapper ".concat(B["faq-row-wrapper"]),l="faq-title ".concat(B["faq-row"]),m="faq-body ".concat(B["row-body"]);return q.createElement("div",{className:k,style:j},d?q.createElement("section",{className:l},q.createElement("h2",null,d)):null,f.length?q.createElement("section",{className:m,role:"list"},f.map(function(b,a){return q.createElement(i,{openOnload:o===a,data:b,key:a,rowid:a+1,config:n.props.config,getRowOptions:function(b){return n.state.rowsOption[a]=b}})})):null)}}]),a}();d(f,"propTypes",{data:b().object,styles:b().object,config:b().object,getRowOptions:b().func});var C=f,D=a(1163),E=a(4725),F={titleTextColor:"black",rowTitleColor:"black",rowContentColor:"grey"},G={},H=!0;function I(){var d=(0,E.$G)("landing_page_faq").i18n,b=(0,D.useRouter)(),a=(0,q.useState)({title:"FAQs",rows:[]}),c=a[0],e=a[1];function f(){return(f=(0,k.Z)(l().mark(function a(){var b;return l().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:try{b=d.store.getResourceBundle(d.language,"landing_page_faq"),console.log(b),e(b)}catch(c){console.log(c.message)}case 1:case"end":return a.stop()}},a)}))).apply(this,arguments)}return(0,q.useEffect)(function(){(function a(){return f.apply(this,arguments)})()},[b.isReady]),(0,m.jsx)("div",{children:(0,m.jsxs)(n.Z,{children:[(0,m.jsx)(o.Z,{}),(0,m.jsx)(p.Z,{children:(0,m.jsx)(C,{data:c,styles:F,config:G})})]})})}}},function(a){a.O(0,[265,774,888,179],function(){var b;return a(a.s=208)}),_N_E=a.O()}])