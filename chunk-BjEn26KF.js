import{R as U$1,ct as k$1,ft as m$1}from"./main-YCZOKAAB.js";var I=globalThis;var V=I.ShadowRoot&&(I.ShadyCSS===void 0||I.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype;var Y=Symbol();var bt=new WeakMap;var P=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==Y)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(V&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=bt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&bt.set(e,t))}return t}toString(){return this.cssText}};var M=s=>new P(typeof s==`string`?s:s+``,void 0,Y);var Q=(s,...t)=>{return new P(s.length===1?s[0]:t.reduce((i,r,o)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n==`number`)return n;throw Error(`Value passed to 'css' function must be a 'css' function result: `+n+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(r)+s[o+1],s[0]),s,Y)};var gt=(s,t)=>{if(V)s.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement(`style`),r=I.litNonce;r!==void 0&&i.setAttribute(`nonce`,r),i.textContent=e.cssText,s.appendChild(i)}};var tt=V?s=>s:s=>s instanceof CSSStyleSheet?(t=>{let e=``;for(let i of t.cssRules)e+=i.cssText;return M(e)})(s):s;var{is:Gt,defineProperty:Wt,getOwnPropertyDescriptor:Ft,getOwnPropertyNames:Kt,getOwnPropertySymbols:Jt,getPrototypeOf:Xt}=Object,G=globalThis,yt=G.trustedTypes,Zt=yt?yt.emptyScript:``,Yt=G.reactiveElementPolyfillSupport,N=(s,t)=>s,U={toAttribute(s,t){switch(t){case Boolean:s=s?Zt:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,t){let e=s;switch(t){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch(i){e=null}}return e}},W=(s,t)=>!Gt(s,t),vt={attribute:!0,type:String,converter:U,reflect:!1,useDefault:!1,hasChanged:W};Symbol.metadata??=Symbol(`metadata`),G.litPropertyMetadata??=new WeakMap;var y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=vt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),r=this.getPropertyDescriptor(t,i,e);r!==void 0&&Wt(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){let{get:r,set:o}=Ft(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:r,set(n){let l=r?.call(this);o?.call(this,n),this.requestUpdate(t,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??vt}static _$Ei(){if(this.hasOwnProperty(N(`elementProperties`)))return;let t=Xt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(N(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(N(`properties`))){let e=this.properties,i=[...Kt(e),...Jt(e)];for(let r of i)this.createProperty(r,e[r])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,r]of e)this.elementProperties.set(i,r)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let r=this._$Eu(e,i);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let r of i)e.unshift(tt(r))}else t!==void 0&&e.push(tt(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i==`string`?i:typeof t==`string`?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return gt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(r!==void 0&&i.reflect===!0){let o=(i.converter?.toAttribute!==void 0?i.converter:U).toAttribute(e,i.type);this._$Em=t,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(t,e){let i=this.constructor,r=i._$Eh.get(t);if(r!==void 0&&this._$Em!==r){let o=i.getPropertyOptions(r),n=typeof o.converter==`function`?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:U;this._$Em=r;let l=n.fromAttribute(e,o.type);this[r]=l??this._$Ej?.get(r)??l,this._$Em=null}}requestUpdate(t,e,i,r=!1,o){if(t!==void 0){let n=this.constructor;if(r===!1&&(o=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??W)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:o},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),o!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),r===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}_$EP(){return U$1(this,null,function*(){this.isUpdatePending=!0;try{yield this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&(yield t),!this.isUpdatePending})}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,o]of this._$Ep)this[r]=o;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[r,o]of i){let{wrapped:n}=o,l=this[r];n!==!0||this._$AL.has(r)||l===void 0||this.C(r,void 0,o,l)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:`open`},y[N(`elementProperties`)]=new Map,y[N(`finalized`)]=new Map,Yt?.({ReactiveElement:y}),(G.reactiveElementVersions??=[]).push(`2.1.2`);var at=globalThis;var _t=s=>s;var F=at.trustedTypes;var $t=F?F.createPolicy(`lit-html`,{createHTML:s=>s}):void 0;var xt=`$lit$`;var $=`lit$${Math.random().toFixed(9).slice(2)}$`;var Ct=`?`+$;var Qt=`<${Ct}>`;var k=document;var B=()=>k.createComment(``);var L=s=>s===null||typeof s!=`object`&&typeof s!=`function`;var lt=Array.isArray;var te=s=>lt(s)||typeof s?.[Symbol.iterator]==`function`;var et=`[ 	
\f\r]`;var H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;var At=/-->/g;var St=/>/g;var w=RegExp(`>|${et}(?:([^\\s"'>=/]+)(${et}*=${et}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,`g`);var wt=/'/g;var Et=/"/g;var Rt=/^(?:script|style|textarea|title)$/i;var ht=s=>(t,...e)=>({_$litType$:s,strings:t,values:e});var A=ht(1);var v=Symbol.for(`lit-noChange`);var c=Symbol.for(`lit-nothing`);var kt=new WeakMap;var E=k.createTreeWalker(k,129);function Ot(s,t){if(!lt(s)||!s.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return $t!==void 0?$t.createHTML(t):t}var ee=(s,t)=>{let e=s.length-1,i=[],r,o=t===2?`<svg>`:t===3?`<math>`:``,n=H;for(let l=0;l<e;l++){let a=s[l],d,u,h=-1,g=0;for(;g<a.length&&(n.lastIndex=g,u=n.exec(a),u!==null);)g=n.lastIndex,n===H?u[1]===`!--`?n=At:u[1]!==void 0?n=St:u[2]!==void 0?(Rt.test(u[2])&&(r=RegExp(`</`+u[2],`g`)),n=w):u[3]!==void 0&&(n=w):n===w?u[0]===`>`?(n=r??H,h=-1):u[1]===void 0?h=-2:(h=n.lastIndex-u[2].length,d=u[1],n=u[3]===void 0?w:u[3]===`"`?Et:wt):n===Et||n===wt?n=w:n===At||n===St?n=H:(n=w,r=void 0);let p=n===w&&s[l+1].startsWith(`/>`)?` `:``;o+=n===H?a+Qt:h>=0?(i.push(d),a.slice(0,h)+xt+a.slice(h)+$+p):a+$+(h===-2?l:p)}return[Ot(s,o+(s[e]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),i]};var D=class s{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let o=0,n=0,l=t.length-1,a=this.parts,[d,u]=ee(t,e);if(this.el=s.createElement(d,i),E.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(r=E.nextNode())!==null&&a.length<l;){if(r.nodeType===1){if(r.hasAttributes())for(let h of r.getAttributeNames())if(h.endsWith(xt)){let g=u[n++],p=r.getAttribute(h).split($),z=/([.?@])?(.*)/.exec(g);a.push({type:1,index:o,name:z[2],strings:p,ctor:z[1]===`.`?it:z[1]===`?`?rt:z[1]===`@`?ot:R}),r.removeAttribute(h)}else h.startsWith($)&&(a.push({type:6,index:o}),r.removeAttribute(h));if(Rt.test(r.tagName)){let h=r.textContent.split($),g=h.length-1;if(g>0){r.textContent=F?F.emptyScript:``;for(let p=0;p<g;p++)r.append(h[p],B()),E.nextNode(),a.push({type:2,index:++o});r.append(h[g],B())}}}else if(r.nodeType===8)if(r.data===Ct)a.push({type:2,index:o});else{let h=-1;for(;(h=r.data.indexOf($,h+1))!==-1;)a.push({type:7,index:o}),h+=$.length-1}o++}}static createElement(t,e){let i=k.createElement(`template`);return i.innerHTML=t,i}};function C(s,t,e=s,i){if(t===v)return t;let r=i!==void 0?e._$Co?.[i]:e._$Cl,o=L(t)?void 0:t._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),o===void 0?r=void 0:(r=new o(s),r._$AT(s,e,i)),i!==void 0?(e._$Co??=[])[i]=r:e._$Cl=r),r!==void 0&&(t=C(s,r._$AS(s,t.values),r,i)),t}var st=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??k).importNode(e,!0);E.currentNode=r;let o=E.nextNode(),n=0,l=0,a=i[0];for(;a!==void 0;){if(n===a.index){let d;a.type===2?d=new j(o,o.nextSibling,this,t):a.type===1?d=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(d=new nt(o,this,t)),this._$AV.push(d),a=i[++l]}n!==a?.index&&(o=E.nextNode(),n++)}return E.currentNode=k,r}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}};var j=class s{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=C(this,t,e),L(t)?t===c||t==null||t===``?(this._$AH!==c&&this._$AR(),this._$AH=c):t!==this._$AH&&t!==v&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):te(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==c&&L(this._$AH)?this._$AA.nextSibling.data=t:this.T(k.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,r=typeof i==`number`?this._$AC(t):(i.el===void 0&&(i.el=D.createElement(Ot(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(e);else{let o=new st(r,this),n=o.u(this.options);o.p(e),this.T(n),this._$AH=o}}_$AC(t){let e=kt.get(t.strings);return e===void 0&&kt.set(t.strings,e=new D(t)),e}k(t){lt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,r=0;for(let o of t)r===e.length?e.push(i=new s(this.O(B()),this.O(B()),this,this.options)):i=e[r],i._$AI(o),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=_t(t).nextSibling;_t(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}};var R=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,o){this.type=1,this._$AH=c,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=o,i.length>2||i[0]!==``||i[1]!==``?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=c}_$AI(t,e=this,i,r){let o=this.strings,n=!1;if(o===void 0)t=C(this,t,e,0),n=!L(t)||t!==this._$AH&&t!==v,n&&(this._$AH=t);else{let l=t,a,d;for(t=o[0],a=0;a<o.length-1;a++)d=C(this,l[i+a],e,a),d===v&&(d=this._$AH[a]),n||=!L(d)||d!==this._$AH[a],d===c?t=c:t!==c&&(t+=(d??``)+o[a+1]),this._$AH[a]=d}n&&!r&&this.j(t)}j(t){t===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??``)}};var it=class extends R{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===c?void 0:t}};var rt=class extends R{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==c)}};var ot=class extends R{constructor(t,e,i,r,o){super(t,e,i,r,o),this.type=5}_$AI(t,e=this){if((t=C(this,t,e,0)??c)===v)return;let i=this._$AH,r=t===c&&i!==c||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==c&&(i===c||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}};var nt=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){C(this,t)}};var se=at.litHtmlPolyfillSupport;se?.(D,j),(at.litHtmlVersions??=[]).push(`3.3.3`);var Tt=(s,t,e)=>{let i=e?.renderBefore??t,r=i._$litPart$;if(r===void 0){let o=e?.renderBefore??null;i._$litPart$=r=new j(t.insertBefore(B(),o),o,void 0,e??{})}return r._$AI(s),r};var dt=globalThis;var S=class extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Tt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return v}};S._$litElement$=!0,S.finalized=!0,dt.litElementHydrateSupport?.({LitElement:S});var ie=dt.litElementPolyfillSupport;ie?.({LitElement:S});(dt.litElementVersions??=[]).push(`4.2.2`);var re={attribute:!0,type:String,converter:U,reflect:!1,hasChanged:W};var oe=(s=re,t,e)=>{let{kind:i,metadata:r}=e,o=globalThis.litPropertyMetadata.get(r);if(o===void 0&&globalThis.litPropertyMetadata.set(r,o=new Map),i===`setter`&&((s=Object.create(s)).wrapped=!0),o.set(e.name,s),i===`accessor`){let{name:n}=e;return{set(l){let a=t.get.call(this);t.set.call(this,l),this.requestUpdate(n,a,s,!0,l)},init(l){return l!==void 0&&this.C(n,void 0,s,l),l}}}if(i===`setter`){let{name:n}=e;return function(l){let a=this[n];t.call(this,l),this.requestUpdate(n,a,s,!0,l)}}throw Error(`Unsupported decorator location: `+i)};function m(s){return(t,e)=>typeof e==`object`?oe(s,t,e):((i,r,o)=>{let n=r.hasOwnProperty(o);return r.constructor.createProperty(o,i),n?Object.getOwnPropertyDescriptor(r,o):void 0})(s,t,e)}function ct(s){return m(k$1(m$1({},s),{state:!0,attribute:!1}))}var Pt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6};var Mt=s=>(...t)=>({_$litDirective$:s,values:t});var J=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var Nt=`important`;var ne=` !`+Nt;var q=Mt(class extends J{constructor(s){if(super(s),s.type!==Pt.ATTRIBUTE||s.name!==`style`||s.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(s){return Object.keys(s).reduce((t,e)=>{let i=s[e];return i==null?t:t+`${e=e.includes(`-`)?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,`-$&`).toLowerCase()}:${i};`},``)}update(s,[t]){let{style:e}=s.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let i of this.ft)t[i]??(this.ft.delete(i),i.includes(`-`)?e.removeProperty(i):e[i]=null);for(let i in t){let r=t[i];if(r!=null){this.ft.add(i);let o=typeof r==`string`&&r.endsWith(ne);i.includes(`-`)||o?e.setProperty(i,o?r.slice(0,-11):r,o?Nt:``):e[i]=r}}return v}});var ae=Object.defineProperty;var le=Object.getOwnPropertyDescriptor;var b=(s,t,e,i)=>{for(var r=i>1?void 0:i?le(t,e):t,o=s.length-1,n;o>=0;o--)(n=s[o])&&(r=(i?n(t,e,r):n(r))||r);return i&&r&&ae(t,e,r),r};function he(s,t){return s.map((e,i)=>{let r=e.borderRadius||`${t.fallbackRadius}px`,o={left:`${e.x}px`,top:`${e.y}px`,width:`${e.width}px`,height:`${e.height}px`,"border-radius":r};if(e.isContainer){let l=m$1({},o);return e.containerBg&&(l.background=e.containerBg),e.containerBorder&&(l.border=e.containerBorder),e.containerShadow&&(l[`box-shadow`]=e.containerShadow),A`<div
        class="shimmer-container-block"
        style=${q(l)}
      >${t.debug?A`<span class="debug-label" data-kind="container">C${i}</span>`:c}</div>`}let n=k$1(m$1({},o),{background:`var(--shimmer-bg, ${t.backgroundColor})`});return t.stagger>0&&(n[`animation-delay`]=`${i*t.stagger}s`),A`<div class="shimmer-block" style=${q(n)}>${t.debug?A`<span class="debug-label">${i}</span>`:c}</div>`})}var ut=`phantom-ui`;var _=`data-shimmer-ignore`;var Lt=`data-shimmer-no-children`;var Dt=`data-shimmer-width`;var jt=`data-shimmer-height`;var X=`data-phantom-graphic`;var pt=`rgba(128, 128, 128, 0.3)`;var mt=`rgba(128, 128, 128, 0.2)`;var qt=[`img`,`svg`,`video`,`canvas`,`button`,`[role="button"]`];var zt=`
	-webkit-text-fill-color: transparent !important;
	pointer-events: none;
	user-select: none;
`;var de=`
	-webkit-text-fill-color: initial !important;
	pointer-events: auto;
	user-select: auto;
`;var O=`${ut}[loading]:not([mode="overlay"])`;var Ut=s=>qt.map(t=>`${s} ${t}`).join(`,
	`);var pe=`${`
	${O} * { ${zt} }
	${Ut(O)} { opacity: 0 !important; }
	${O} [${_}],
	${O} [${_}] * { ${de} }
	${Ut(`${O} [${_}]`)} { opacity: 1 !important; }
`}
	${`${O} [${X}]`} { opacity: 0 !important; }
`;var me=`
	:host([${_}]) *, [${_}] * {
		-webkit-text-fill-color: initial !important;
		opacity: 1 !important;
	}
	* { ${zt} }
	${qt.join(`, `)}, [${X}] { opacity: 0 !important; }
`;var Ht=`phantom-ui-loading-styles`;function fe(){if(document.getElementById(Ht))return;let s=document.createElement(`style`);s.id=Ht,s.textContent=pe,document.head.appendChild(s)}function be(s){for(let t of[null,`::before`,`::after`]){let e=getComputedStyle(s,t),i=e.getPropertyValue(`mask-image`)||e.getPropertyValue(`-webkit-mask-image`);if(i&&i!==`none`)return!0}return!1}var ft=`phantom-ui-shadow-hide`;function ge(s){if(s.querySelector(`#${ft}`))return;let t=document.createElement(`style`);t.id=ft,t.textContent=me,s.appendChild(t)}function ye(s){s.querySelector(`#${ft}`)?.remove()}var ve=class{constructor(s){this.host=s,this._hiddenRoots=new Set,this._markedGraphics=new Set,this._inertedElements=new Set,s.addController(this)}hostDisconnected(){this.restore()}apply(s){let t=this.host.pierceShadow;_e(s,t,e=>{t&&e.shadowRoot&&(ge(e.shadowRoot),this._hiddenRoots.add(e.shadowRoot)),be(e)&&(e.setAttribute(X,``),this._markedGraphics.add(e))}),this._restoreInert(),this._applyInert(s)}restore(){this._restoreShadowContent(),this._restoreGraphics(),this._restoreInert()}_restoreShadowContent(){for(let s of this._hiddenRoots)ye(s);this._hiddenRoots.clear()}_restoreGraphics(){for(let s of this._markedGraphics)s.removeAttribute(X);this._markedGraphics.clear()}_applyInert(s){let t=e=>{if(!e.hasAttribute(_)){if(!e.querySelector(`[${_}]`)){e.hasAttribute(`inert`)||(e.setAttribute(`inert`,``),this._inertedElements.add(e));return}for(let i of e.children)t(i)}};for(let e of s)t(e)}_restoreInert(){for(let s of this._inertedElements)s.removeAttribute(`inert`);this._inertedElements.clear()}};function _e(s,t,e){let i=r=>{if(e(r),t&&r.shadowRoot)for(let o of r.shadowRoot.children)i(o);for(let o of r.children)i(o)};for(let r of s)i(r)}var $e=new Set([`IMG`,`SVG`,`VIDEO`,`CANVAS`,`IFRAME`,`INPUT`,`TEXTAREA`,`BUTTON`,`HR`]);var It=new Set([`BR`,`WBR`]);function Ae(s){if($e.has(s.tagName))return!0;for(let t of s.children)if(!It.has(t.tagName))return!1;return!0}function Se(s){if(s.children.length===0)return!1;for(let t of s.children)if(t.tagName!==`SLOT`&&!It.has(t.tagName))return!1;return!0}function Vt(s){return s===`0px`?``:s}function we(s,t){let e=document.createElement(`span`);e.style.visibility=`hidden`,e.style.position=`absolute`,e.textContent=s.textContent,s.appendChild(e);let{width:i}=e.getBoundingClientRect();return s.removeChild(e),Math.min(i,t)}function Ee(s){for(let t of s.childNodes)if(t.nodeType===Node.TEXT_NODE&&t.textContent?.trim())return!0;return!1}function ke(s,t,e=!1,i){let r=[];function o(n){if(n instanceof HTMLSlotElement){for(let p of n.assignedElements({flatten:!0}))o(p);return}let l=n.getBoundingClientRect(),a=Number(n.getAttribute(Dt))||0,d=Number(n.getAttribute(jt))||0,u=a>0||d>0,h=a||l.width,g=d||l.height;if(!((h===0||g===0)&&!u||n.hasAttribute(_))){if(e&&n.shadowRoot&&(i?.add(n.shadowRoot),n.shadowRoot.children.length>0)){for(let p of n.shadowRoot.children)o(p);return}if(n.hasAttribute(Lt)||Ae(n)||e&&Se(n)){let p=(n.tagName===`TD`||n.tagName===`TH`)&&Ee(n)&&!a;r.push({x:l.left-t.left,y:l.top-t.top,width:p?we(n,l.width):h,height:g,borderRadius:Vt(getComputedStyle(n).borderRadius)});return}for(let p of n.children)o(p)}}return o(s),r}function xe(s,t){let e=s.getBoundingClientRect();if(e.width===0||e.height===0)return null;let i=getComputedStyle(s),r=i.backgroundColor,o=i.borderWidth,n=i.borderStyle,l=i.borderColor,a=i.boxShadow,d=i.borderRadius,u=r===`rgba(0, 0, 0, 0)`||r===`transparent`,h=n!==`none`&&o!==`0px`,g=a!==`none`&&a!==``;if(u&&!h&&!g)return null;let p=h?`${o} ${n} ${l}`:``;return{x:e.left-t.left,y:e.top-t.top,width:e.width,height:e.height,borderRadius:Vt(d),backgroundColor:u?``:r,border:p,boxShadow:g?a:``}}function Ce(s,t,{count:e,gap:i,rowHeight:r}){let o=[...s];for(let n=1;n<e;n++){let l=n*(r+i);for(let a of t)o.push({x:a.x,y:a.y+l,width:a.width,height:a.height,borderRadius:a.borderRadius,isContainer:!0,containerBg:a.backgroundColor,containerBorder:a.border,containerShadow:a.boxShadow});for(let a of s)o.push(k$1(m$1({},a),{y:a.y+l}))}return o}function Re(s,t){let e=null,i=new ResizeObserver(()=>{e!==null&&cancelAnimationFrame(e),e=requestAnimationFrame(()=>{e=null,t()})});return i.observe(s),i}var Oe=Q`
	:host {
		display: block;
		position: relative;
		overflow: hidden;
		--shimmer-color: ${M(pt)};
		--shimmer-duration: ${1.5}s;
		--shimmer-bg: ${M(mt)};
	}

	:host([loading]:not([mode="overlay"])) ::slotted(*) {
		-webkit-text-fill-color: transparent !important;
		pointer-events: none;
		user-select: none;
	}

	:host([loading]:not([mode="overlay"])) ::slotted(img),
	:host([loading]:not([mode="overlay"])) ::slotted(svg),
	:host([loading]:not([mode="overlay"])) ::slotted(video),
	:host([loading]:not([mode="overlay"])) ::slotted(canvas),
	:host([loading]:not([mode="overlay"])) ::slotted(button),
	:host([loading]:not([mode="overlay"])) ::slotted([role="button"]) {
		opacity: 0 !important;
	}

	/*
	 * Overlay mode: keep the content visible and dimmed, and turn each measured
	 * block into a transparent glint that sweeps over the matching element (a
	 * structure-aware stale-while-revalidate refresh). Setting --shimmer-bg to
	 * transparent makes both the block fill and the gradient edges transparent, so
	 * the same block + direction + reduced-motion rules become a pure light sweep.
	 */
	:host([mode="overlay"]) {
		--shimmer-bg: transparent;
	}

	:host([loading][mode="overlay"]) ::slotted(*) {
		opacity: var(--phantom-content-opacity, 0.5);
		pointer-events: none;
		transition: opacity 0.2s ease-out;
	}

	/* Container blocks replicate card backgrounds for count > 1, which would cover
	   the visible content. Overlay never duplicates rows, so hide them. */
	:host([mode="overlay"]) .shimmer-container-block {
		display: none;
	}

	.shimmer-overlay {
		position: absolute;
		inset: 0;
		pointer-events: none;
		overflow: hidden;
		transition: opacity var(--reveal-duration, 0s) ease-out;
	}

	.shimmer-overlay.revealing {
		opacity: 0;
	}

	.shimmer-block {
		position: absolute;
		overflow: hidden;
	}

	.shimmer-container-block {
		position: absolute;
		box-sizing: border-box;
	}

	.shimmer-block::after {
		content: "";
		position: absolute;
		inset: 0;
		background: linear-gradient(
			90deg,
			var(--shimmer-bg) 30%,
			var(--shimmer-color) 50%,
			var(--shimmer-bg) 70%
		);
		background-size: 200% 100%;
		animation: shimmer-horizontal var(--shimmer-duration) linear infinite;
	}

	:host([shimmer-direction="ttb"]) .shimmer-block::after,
	:host([shimmer-direction="btt"]) .shimmer-block::after {
		background: linear-gradient(
			180deg,
			var(--shimmer-bg) 30%,
			var(--shimmer-color) 50%,
			var(--shimmer-bg) 70%
		);
		background-size: 100% 200%;
		animation-name: shimmer-vertical;
	}

	/* rtl and btt sweep the same track as ltr/ttb, just the other way. The timing
	   function is linear, so reversing the animation is equivalent to a mirrored
	   set of keyframes. */
	:host([shimmer-direction="rtl"]) .shimmer-block::after,
	:host([shimmer-direction="btt"]) .shimmer-block::after {
		animation-direction: reverse;
	}

	@keyframes shimmer-horizontal {
		0% { background-position: 200% 0; }
		100% { background-position: -200% 0; }
	}

	@keyframes shimmer-vertical {
		0% { background-position: 0 200%; }
		100% { background-position: 0 -200%; }
	}

	:host([animation="pulse"]) .shimmer-block {
		animation: phantom-pulse var(--shimmer-duration) ease-in-out infinite;
	}

	:host([animation="pulse"]) .shimmer-block::after {
		display: none;
	}

	@keyframes phantom-pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.4;
		}
	}

	:host([animation="breathe"]) .shimmer-block {
		animation: phantom-breathe var(--shimmer-duration) ease-in-out infinite;
	}

	:host([animation="breathe"]) .shimmer-block::after {
		display: none;
	}

	@keyframes phantom-breathe {
		0%,
		100% {
			opacity: 0.6;
			transform: scale(1);
		}
		50% {
			opacity: 1;
			transform: scale(1.02);
		}
	}

	:host([animation="solid"]) .shimmer-block::after {
		display: none;
	}

	/* Overlay paints nothing but the glint: its block fill is transparent by design, so
	   every path that suppresses the glint leaves the refresh with no indication at all.
	   Keep a flat veil in those cases. pulse and breathe animate the block, so they
	   animate the veil with it; solid holds it static. */
	:host([mode="overlay"][animation="pulse"]) .shimmer-block::after,
	:host([mode="overlay"][animation="breathe"]) .shimmer-block::after,
	:host([mode="overlay"][animation="solid"]) .shimmer-block::after {
		display: block;
		animation: none;
		background: var(--shimmer-color);
	}

	:host([debug]) .shimmer-block {
		outline: 1px dashed rgba(247, 118, 142, 0.9);
		outline-offset: -1px;
	}

	:host([debug]) .shimmer-container-block {
		outline: 1px dashed rgba(122, 162, 247, 0.9);
		outline-offset: -1px;
	}

	.debug-label {
		position: absolute;
		top: 2px;
		left: 2px;
		font: 600 10px/1 ui-monospace, SFMono-Regular, Menlo, monospace;
		color: #fff;
		background: rgba(247, 118, 142, 0.95);
		padding: 2px 5px;
		border-radius: 3px;
		pointer-events: none;
		z-index: 1;
	}

	.debug-label[data-kind="container"] {
		background: rgba(122, 162, 247, 0.95);
	}

	/* Reduced motion — degrade every animation mode to the static solid look
	   (WCAG 2.3.3: the infinite shimmer/pulse/breathe animations stop; blocks
	   keep their static background, exactly like animation="solid"). */
	@media (prefers-reduced-motion: reduce) {
		.shimmer-block,
		:host([animation]) .shimmer-block {
			animation: none;
		}

		.shimmer-block::after {
			display: none;
		}

		/* Skeleton keeps its static block fill, so dropping the glint still leaves the
		   placeholder visible. Overlay has no fill to fall back on, so it keeps the veil,
		   held static by the animation: none above. */
		:host([mode="overlay"]) .shimmer-block::after {
			display: block;
			animation: none;
			background: var(--shimmer-color);
		}
	}
`;var Bt={childList:!0,subtree:!0,attributes:!0};var Te={childList:!0,subtree:!0,attributes:!0,attributeFilter:[Dt,jt,_,Lt,`style`,`hidden`]};var f=class extends S{constructor(){super(...arguments),this.loading=!1,this.shimmerDirection=`ltr`,this.shimmerColor=pt,this.backgroundColor=mt,this.duration=1.5,this.fallbackRadius=4,this.animation=`shimmer`,this.mode=`skeleton`,this.stagger=0,this.reveal=0,this.count=1,this.countGap=0,this.debug=!1,this.loadingLabel=`Loading`,this.pierceShadow=!1,this._blocks=[],this._revealing=!1,this._resizeObserver=null,this._mutationObserver=null,this._loadHandler=null,this._measureScheduled=!1,this._revealTimeout=null,this._visibility=new ve(this)}static{this.styles=Oe}connectedCallback(){super.connectedCallback(),fe(),this.hasUpdated&&this.loading&&(this._setupObservers(),this._scheduleMeasure())}disconnectedCallback(){super.disconnectedCallback(),this._teardownObservers(),this._clearRevealTimeout()}willUpdate(s){s.has(`loading`)&&!this.loading&&this.reveal>0&&this._blocks.length>0&&(this._revealing=!0)}updated(s){if((s.has(`count`)||s.has(`countGap`))&&this.loading&&this._scheduleMeasure(),s.has(`loading`)||s.has(`loadingLabel`)){let t=!!this.loading;this.setAttribute(`aria-busy`,String(t)),t?this.setAttribute(`aria-label`,this.loadingLabel):this.removeAttribute(`aria-label`)}s.has(`loading`)&&(!this.loading&&this.hasAttribute(`loading`)&&this.removeAttribute(`loading`),this.loading?(this._revealing=!1,this._clearRevealTimeout(),this._scheduleMeasure(),this._setupObservers()):this._revealing?(this._teardownObservers(),this._revealTimeout=setTimeout(()=>{this._revealing=!1,this._blocks=[],this._revealTimeout=null,this.style.minHeight=``,this._visibility.restore()},this.reveal*1e3)):(this._blocks=[],this._teardownObservers(),this.style.minHeight=``,this._visibility.restore()))}render(){let s={};this.shimmerColor!==pt&&(s[`--shimmer-color`]=this.shimmerColor),this.backgroundColor!==mt&&(s[`--shimmer-bg`]=this.backgroundColor),Number.isFinite(this.duration)&&this.duration!==1.5&&(s[`--shimmer-duration`]=`${this.duration}s`),Number.isFinite(this.reveal)&&this.reveal>0&&(s[`--reveal-duration`]=`${this.reveal}s`);let t=q(s);return A`
      <slot></slot>
      ${this.loading||this._revealing?A`
            <div
              class="shimmer-overlay ${this._revealing?`revealing`:``}"
              style=${t}
              aria-hidden="true"
            >
              ${he(this._blocks,{fallbackRadius:this.fallbackRadius,backgroundColor:this.backgroundColor,stagger:this.stagger,debug:this.debug})}
            </div>
          `:c}
    `}_scheduleMeasure(){this._measureScheduled||(this._measureScheduled=!0,requestAnimationFrame(()=>{this._measureScheduled=!1,this._measure()}))}_measure(){if(!this.loading)return;let s=this.getBoundingClientRect();if(s.width===0||s.height===0)return;let t=this.shadowRoot?.querySelector(`slot`);if(!t)return;this._mutationObserver&&this._mutationObserver.disconnect();let e=t.assignedElements({flatten:!0});this.mode!==`overlay`&&this._visibility.apply(e);let i=new Set,r=[];for(let o of e)r.push(...ke(o,s,this.pierceShadow,i));if(this.count>1&&r.length>0&&this.mode!==`overlay`){let o=0,n=[];for(let l of e){o=Math.max(o,l.getBoundingClientRect().bottom-s.top);let a=xe(l,s);a&&n.push(a)}r=Ce(r,n,{count:this.count,gap:this.countGap,rowHeight:o}),this.style.minHeight=`${this.count*o+(this.count-1)*this.countGap}px`}else this.style.minHeight=``;if(this._blocks=r,this._mutationObserver){this._mutationObserver.observe(this,Bt);for(let o of i)this._mutationObserver.observe(o,Te)}}_setupObservers(){this._teardownObservers(),this._resizeObserver=Re(this,()=>{this._scheduleMeasure()}),this._mutationObserver=new MutationObserver(()=>{this._scheduleMeasure()}),this._mutationObserver.observe(this,Bt),this._loadHandler=()=>this._scheduleMeasure(),this.addEventListener(`load`,this._loadHandler,!0)}_teardownObservers(){this._resizeObserver&&(this._resizeObserver.disconnect(),this._resizeObserver=null),this._mutationObserver&&(this._mutationObserver.disconnect(),this._mutationObserver=null),this._loadHandler&&(this.removeEventListener(`load`,this._loadHandler,!0),this._loadHandler=null)}_clearRevealTimeout(){this._revealTimeout!==null&&(clearTimeout(this._revealTimeout),this._revealTimeout=null)}};b([m({type:Boolean,reflect:!0,converter:{fromAttribute:s=>s!==null&&s!==`false`,toAttribute:s=>s?``:null}})],f.prototype,`loading`,2),b([m({attribute:`shimmer-direction`,reflect:!0})],f.prototype,`shimmerDirection`,2),b([m({attribute:`shimmer-color`})],f.prototype,`shimmerColor`,2),b([m({attribute:`background-color`})],f.prototype,`backgroundColor`,2),b([m({type:Number})],f.prototype,`duration`,2),b([m({type:Number,attribute:`fallback-radius`})],f.prototype,`fallbackRadius`,2),b([m({reflect:!0})],f.prototype,`animation`,2),b([m({reflect:!0})],f.prototype,`mode`,2),b([m({type:Number})],f.prototype,`stagger`,2),b([m({type:Number})],f.prototype,`reveal`,2),b([m({type:Number,converter:s=>Math.max(1,Math.round(Number(s)||1))})],f.prototype,`count`,2),b([m({type:Number,attribute:`count-gap`,converter:s=>Math.max(0,Number(s)||0)})],f.prototype,`countGap`,2),b([m({type:Boolean,reflect:!0})],f.prototype,`debug`,2),b([m({attribute:`loading-label`})],f.prototype,`loadingLabel`,2),b([m({type:Boolean,attribute:`pierce-shadow`})],f.prototype,`pierceShadow`,2),b([ct()],f.prototype,`_blocks`,2),b([ct()],f.prototype,`_revealing`,2);customElements.get(ut)||customElements.define(ut,f);