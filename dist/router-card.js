function t(t,e,i,s){var a,o=arguments.length,n=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var r=t.length-1;r>=0;r--)(a=t[r])&&(n=(o<3?a(n):o>3?a(e,i,n):a(e,i))||n);return o>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),a=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=a.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,s)},r=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,f=g.trustedTypes,v=f?f.emptyScript:"",m=g.reactiveElementPolyfillSupport,b=(t,e)=>t,_={toAttribute(t,e){switch(e){case Boolean:t=t?v:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!c(t,e),x={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:a}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);a?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),a=e.litNonce;void 0!==a&&s.setAttribute("nonce",a),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:_).toAttribute(e,i.type);this._$Em=t,null==a?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:_;this._$Em=s;const o=a.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,a){if(void 0!==t){const o=this.constructor;if(!1===s&&(a=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??$)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:a},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==a||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[b("elementProperties")]=new Map,y[b("finalized")]=new Map,m?.({ReactiveElement:y}),(g.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,k=t=>t,S=w.trustedTypes,A=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,T="?"+E,P=`<${T}>`,O=document,N=()=>O.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,j="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,D=/>/g,H=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),B=/'/g,L=/"/g,I=/^(?:script|style|textarea|title)$/i,V=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),F=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),q=new WeakMap,W=O.createTreeWalker(O,129);function Y(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const Z=(t,e)=>{const i=t.length-1,s=[];let a,o=2===e?"<svg>":3===e?"<math>":"",n=R;for(let e=0;e<i;e++){const i=t[e];let r,c,l=-1,d=0;for(;d<i.length&&(n.lastIndex=d,c=n.exec(i),null!==c);)d=n.lastIndex,n===R?"!--"===c[1]?n=z:void 0!==c[1]?n=D:void 0!==c[2]?(I.test(c[2])&&(a=RegExp("</"+c[2],"g")),n=H):void 0!==c[3]&&(n=H):n===H?">"===c[0]?(n=a??R,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,r=c[1],n=void 0===c[3]?H:'"'===c[3]?L:B):n===L||n===B?n=H:n===z||n===D?n=R:(n=H,a=void 0);const h=n===H&&t[e+1].startsWith("/>")?" ":"";o+=n===R?i+P:l>=0?(s.push(r),i.slice(0,l)+C+i.slice(l)+E+h):i+E+(-2===l?e:h)}return[Y(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let a=0,o=0;const n=t.length-1,r=this.parts,[c,l]=Z(t,e);if(this.el=J.createElement(c,i),W.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=W.nextNode())&&r.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(C)){const e=l[o++],i=s.getAttribute(t).split(E),n=/([.?@])?(.*)/.exec(e);r.push({type:1,index:a,name:n[2],strings:i,ctor:"."===n[1]?et:"?"===n[1]?it:"@"===n[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(E)&&(r.push({type:6,index:a}),s.removeAttribute(t));if(I.test(s.tagName)){const t=s.textContent.split(E),e=t.length-1;if(e>0){s.textContent=S?S.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],N()),W.nextNode(),r.push({type:2,index:++a});s.append(t[e],N())}}}else if(8===s.nodeType)if(s.data===T)r.push({type:2,index:a});else{let t=-1;for(;-1!==(t=s.data.indexOf(E,t+1));)r.push({type:7,index:a}),t+=E.length-1}a++}}static createElement(t,e){const i=O.createElement("template");return i.innerHTML=t,i}}function K(t,e,i=t,s){if(e===F)return e;let a=void 0!==s?i._$Co?.[s]:i._$Cl;const o=U(e)?void 0:e._$litDirective$;return a?.constructor!==o&&(a?._$AO?.(!1),void 0===o?a=void 0:(a=new o(t),a._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=a:i._$Cl=a),void 0!==a&&(e=K(t,a._$AS(t,e.values),a,s)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??O).importNode(e,!0);W.currentNode=s;let a=W.nextNode(),o=0,n=0,r=i[0];for(;void 0!==r;){if(o===r.index){let e;2===r.type?e=new X(a,a.nextSibling,this,t):1===r.type?e=new r.ctor(a,r.name,r.strings,this,t):6===r.type&&(e=new at(a,this,t)),this._$AV.push(e),r=i[++n]}o!==r?.index&&(a=W.nextNode(),o++)}return W.currentNode=O,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=K(this,t,e),U(t)?t===G||null==t||""===t?(this._$AH!==G&&this._$AR(),this._$AH=G):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>M(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==G&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Q(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new J(t)),e}k(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const a of t)s===e.length?e.push(i=new X(this.O(N()),this.O(N()),this,this.options)):i=e[s],i._$AI(a),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,a){this.type=1,this._$AH=G,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=G}_$AI(t,e=this,i,s){const a=this.strings;let o=!1;if(void 0===a)t=K(this,t,e,0),o=!U(t)||t!==this._$AH&&t!==F,o&&(this._$AH=t);else{const s=t;let n,r;for(t=a[0],n=0;n<a.length-1;n++)r=K(this,s[i+n],e,n),r===F&&(r=this._$AH[n]),o||=!U(r)||r!==this._$AH[n],r===G?t=G:t!==G&&(t+=(r??"")+a[n+1]),this._$AH[n]=r}o&&!s&&this.j(t)}j(t){t===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===G?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==G)}}class st extends tt{constructor(t,e,i,s,a){super(t,e,i,s,a),this.type=5}_$AI(t,e=this){if((t=K(this,t,e,0)??G)===F)return;const i=this._$AH,s=t===G&&i!==G||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==G&&(i===G||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class at{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){K(this,t)}}const ot=w.litHtmlPolyfillSupport;ot?.(J,X),(w.litHtmlVersions??=[]).push("3.3.2");const nt=globalThis;class rt extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let a=s._$litPart$;if(void 0===a){const t=i?.renderBefore??null;s._$litPart$=a=new X(e.insertBefore(N(),t),t,void 0,i??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}rt._$litElement$=!0,rt.finalized=!0,nt.litElementHydrateSupport?.({LitElement:rt});const ct=nt.litElementPolyfillSupport;ct?.({LitElement:rt}),(nt.litElementVersions??=[]).push("4.2.2");const lt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},dt={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:$},ht=(t=dt,e,i)=>{const{kind:s,metadata:a}=i;let o=globalThis.litPropertyMetadata.get(a);if(void 0===o&&globalThis.litPropertyMetadata.set(a,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const a=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,a,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const a=this[s];e.call(this,i),this.requestUpdate(s,a,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function pt(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ut(t){return pt({...t,state:!0,attribute:!1})}const gt=["ha-form","ha-icon","ha-icon-button","ha-selector","ha-textfield","ha-icon-picker","ha-icon-button","ha-entity-picker","ha-select","ha-dialog","ha-sortable","ha-svg-icon","ha-alert","ha-button","ha-color-picker","ha-badge","ha-sankey-chart","mwc-button"];var ft,vt;!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(ft||(ft={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(vt||(vt={}));var mt=function(t,e,i,s){s=s||{},i=null==i?{}:i;var a=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return a.detail=i,t.dispatchEvent(a),a};const bt="mdi:cog",_t="mdi:wan",$t="mdi:view-grid",xt="mdi:format-list-bulleted",yt="mdi:plus",wt="mdi:delete",kt="mdi:information";let St=class extends rt{constructor(){super(...arguments),this._activeTab="general",this._expandedSensors=new Set}setConfig(t){this._config={type:t.type,name:t.name||"Router",icon:t.icon||"mdi:router-wireless",controller:!1!==t.controller,theme:t.theme||"default",update_section:Object.assign({enabled:!0,entity:"",label:"Update Available",tap_action:{action:"more-info"}},t.update_section),status_section:Object.assign({enabled:!0,left_entity:"",left_label:"Status",right_entity:"",right_label:"IP",tap_action:{action:"more-info"}},t.status_section),reboot_button:Object.assign({enabled:!1,service:"button.router_reboot_press",confirmation:!0,label:"Reboot",icon:"mdi:restart"},t.reboot_button),top_sensors:t.top_sensors||[],bottom_sensors:t.bottom_sensors||[]}}_toggleSensor(t,e){const i=`${t}-${e}`;this._expandedSensors.has(i)?this._expandedSensors.delete(i):this._expandedSensors.add(i),this.requestUpdate()}_isSensorExpanded(t,e){return this._expandedSensors.has(`${t}-${e}`)}render(){return this.hass&&this._config?V`
      <div class="editor">
        <!-- Tabs -->
        <div class="tabs">
          <button 
            class="tab ${"general"===this._activeTab?"active":""}" 
            @click=${()=>this._setActiveTab("general")}
            title="General Settings"
          >
            <ha-icon icon="${bt}"></ha-icon>
            <span>General</span>
          </button>
          <button 
            class="tab ${"status"===this._activeTab?"active":""}" 
            @click=${()=>this._setActiveTab("status")}
            title="Status Section"
          >
            <ha-icon icon="${_t}"></ha-icon>
            <span>Status</span>
          </button>
          <button 
            class="tab ${"top"===this._activeTab?"active":""}" 
            @click=${()=>this._setActiveTab("top")}
            title="Top Sensors - Card View"
          >
            <ha-icon icon="${$t}"></ha-icon>
            <span>Top Cards</span>
          </button>
          <button 
            class="tab ${"bottom"===this._activeTab?"active":""}" 
            @click=${()=>this._setActiveTab("bottom")}
            title="Bottom Sensors - List View"
          >
            <ha-icon icon="${xt}"></ha-icon>
            <span>Bottom List</span>
          </button>
        </div>

        <!-- Tab Content -->
        ${this._renderTabContent()}
      </div>
    `:V``}_renderTabContent(){switch(this._activeTab){case"general":return this._renderGeneralTab();case"status":return this._renderStatusTab();case"top":return this._renderSensorsTab("top_sensors","Card View - Top Section",!0);case"bottom":return this._renderSensorsTab("bottom_sensors","List View - Bottom Section",!1);default:return G}}_renderGeneralTab(){const t=this._config.update_section,e=this._config.reboot_button;return V`
      <div class="tab-content">
        <!-- Basic Settings -->
        <div class="section">
          <h3 class="section-title">Basic Settings</h3>
          <div class="grid-2">
            <ha-textfield
              .value=${this._config.name||""}
              @input=${t=>this._handleBasicChange("name",t.target.value)}
              label="Card Name"
              placeholder="Router"
            ></ha-textfield>

            <ha-icon-picker
              .value=${this._config.icon||"mdi:router-wireless"}
              @value-changed=${t=>this._handleBasicChange("icon",t.detail.value)}
              label="Card Icon"
            ></ha-icon-picker>
          </div>

          <div class="grid-2">
            <ha-formfield label="Controller Mode">
              <ha-switch
                .checked=${!1!==this._config.controller}
                @change=${t=>this._handleBasicChange("controller",t.target.checked)}
              ></ha-switch>
            </ha-formfield>

            <ha-select
              .value=${this._config.theme||"default"}
              @selected=${t=>this._handleBasicChange("theme",t.target.value)}
              label="Theme"
              fixedMenuPosition
              naturalMenuWidth
            >
              <ha-list-item value="default">Default</ha-list-item>
              <ha-list-item value="dark">Dark</ha-list-item>
              <ha-list-item value="light">Light</ha-list-item>
            </ha-select>
          </div>
        </div>

        <!-- Update Section -->
        <div class="section">
          <div class="section-header">
            <h3 class="section-title">Update Section</h3>
            <ha-formfield label="Enable">
              <ha-switch
                .checked=${!1!==t.enabled}
                @change=${t=>this._handleNestedChange("update_section","enabled",t.target.checked)}
              ></ha-switch>
            </ha-formfield>
          </div>

          ${t.enabled?V`
            <div class="grid-2">
              <ha-entity-picker
                .hass=${this.hass}
                .value=${t.entity||""}
                @value-changed=${t=>this._handleNestedChange("update_section","entity",t.detail.value)}
                label="Update Entity"
                allow-custom-entity
                include-domains='["update", "binary_sensor"]'
              ></ha-entity-picker>

              <ha-textfield
                .value=${t.label||"Update Available"}
                @input=${t=>this._handleNestedChange("update_section","label",t.target.value)}
                label="Label"
                placeholder="Update Available"
              ></ha-textfield>
            </div>

            <hui-action-editor
              .hass=${this.hass}
              .value=${t.tap_action||{action:"more-info"}}
              @value-changed=${t=>this._handleNestedChange("update_section","tap_action",t.detail.value)}
              label="Tap Action"
            ></hui-action-editor>
          `:G}
        </div>

        <!-- Reboot Button -->
        <div class="section">
          <div class="section-header">
            <h3 class="section-title">Reboot Button</h3>
            <ha-formfield label="Enable">
              <ha-switch
                .checked=${!1!==e.enabled}
                @change=${t=>this._handleNestedChange("reboot_button","enabled",t.target.checked)}
              ></ha-switch>
            </ha-formfield>
          </div>

          ${e.enabled?V`
            <div class="grid-2">
              <ha-textfield
                .value=${e.service||"button.router_reboot_press"}
                @input=${t=>this._handleNestedChange("reboot_button","service",t.target.value)}
                label="Service"
                placeholder="button.router_reboot_press"
              ></ha-textfield>

              <ha-textfield
                .value=${e.label||"Reboot"}
                @input=${t=>this._handleNestedChange("reboot_button","label",t.target.value)}
                label="Button Label"
                placeholder="Reboot"
              ></ha-textfield>
            </div>

            <div class="grid-2">
              <ha-icon-picker
                .value=${e.icon||"mdi:restart"}
                @value-changed=${t=>this._handleNestedChange("reboot_button","icon",t.detail.value)}
                label="Button Icon"
              ></ha-icon-picker>

              <ha-formfield label="Show Confirmation">
                <ha-switch
                  .checked=${!1!==e.confirmation}
                  @change=${t=>this._handleNestedChange("reboot_button","confirmation",t.target.checked)}
                ></ha-switch>
              </ha-formfield>
            </div>
          `:G}
        </div>
      </div>
    `}_renderStatusTab(){const t=this._config.status_section;return V`
      <div class="tab-content">
        <div class="section">
          <div class="section-header">
            <h3 class="section-title">Status Section</h3>
            <ha-formfield label="Enable">
              <ha-switch
                .checked=${!1!==t.enabled}
                @change=${t=>this._handleNestedChange("status_section","enabled",t.target.checked)}
              ></ha-switch>
            </ha-formfield>
          </div>

          ${t.enabled?V`
            <div class="info-box">
              <ha-icon icon="${kt}"></ha-icon>
              <span>Left entity shows connection status, right entity shows WAN IP.</span>
            </div>

            <h4>Left Column</h4>
            <div class="grid-2">
              <ha-entity-picker
                .hass=${this.hass}
                .value=${t.left_entity||""}
                @value-changed=${t=>this._handleNestedChange("status_section","left_entity",t.detail.value)}
                label="Left Entity"
                allow-custom-entity
              ></ha-entity-picker>

              <ha-textfield
                .value=${t.left_label||"Status"}
                @input=${t=>this._handleNestedChange("status_section","left_label",t.target.value)}
                label="Left Label"
                placeholder="Status"
              ></ha-textfield>
            </div>

            <h4>Right Column</h4>
            <div class="grid-2">
              <ha-entity-picker
                .hass=${this.hass}
                .value=${t.right_entity||""}
                @value-changed=${t=>this._handleNestedChange("status_section","right_entity",t.detail.value)}
                label="Right Entity"
                allow-custom-entity
              ></ha-entity-picker>

              <ha-textfield
                .value=${t.right_label||"IP"}
                @input=${t=>this._handleNestedChange("status_section","right_label",t.target.value)}
                label="Right Label"
                placeholder="IP"
              ></ha-textfield>
            </div>

            <hui-action-editor
              .hass=${this.hass}
              .value=${t.tap_action||{action:"more-info"}}
              @value-changed=${t=>this._handleNestedChange("status_section","tap_action",t.detail.value)}
              label="Section Tap Action"
            ></hui-action-editor>
          `:G}
        </div>
      </div>
    `}_renderSensorsTab(t,e,i){const s=this._config[t]||[];return V`
      <div class="tab-content">
        <div class="section">
          <div class="sensors-header">
            <h3 class="section-title">${e}</h3>
            <ha-button @click=${()=>this._addSensor(t)}>
              <ha-icon icon="${yt}" slot="icon"></ha-icon>
              Add Sensor
            </ha-button>
          </div>

          ${i?V`
            <div class="info-box">
              <ha-icon icon="${kt}"></ha-icon>
              <span>For graph type: detail level (1=low, 2=medium, 3=high), hours to show (1-168).</span>
            </div>
          `:V`
            <div class="info-box">
              <ha-icon icon="${kt}"></ha-icon>
              <span>List items show in 2 columns. You can set icon, name, unit and tap action.</span>
            </div>
          `}

          ${0===s.length?V`
            <div class="empty-state">
              No sensors configured. Click "Add Sensor" to start.
            </div>
          `:V`
            <div class="sensors-list">
              ${s.map((e,s)=>this._renderSensorRow(t,e,s,i))}
            </div>
          `}
        </div>
      </div>
    `}_renderSensorRow(t,e,i,s){var a,o;const n=this._isSensorExpanded(t,i),r=!!e.icon,c=!!e.unit,l=e.tap_action&&"more-info"!==e.tap_action.action;return V`
      <div class="sensor-row">
        <div class="sensor-header" @click=${()=>this._toggleSensor(t,i)}>
          <div class="sensor-title">
            <ha-icon icon="${n?"mdi:chevron-down":"mdi:chevron-right"}"></ha-icon>
            <span class="sensor-name">${e.name||"Unnamed Sensor"}</span>
            ${r?V`<ha-icon icon="${e.icon}" class="sensor-icon-preview"></ha-icon>`:""}
            ${c?V`<span class="sensor-unit-preview">(${e.unit})</span>`:""}
            ${l?V`<span class="sensor-badge">tap</span>`:""}
          </div>
          <ha-icon-button
            .label=${"Remove sensor"}
            @click=${e=>{e.stopPropagation(),this._removeSensor(t,i)}}
          >
            <ha-icon icon="${wt}"></ha-icon>
          </ha-icon-button>
        </div>

        ${n?V`
          <div class="sensor-content">
            <!-- Entity -->
            <div class="grid-2">
              <ha-entity-picker
                .hass=${this.hass}
                .value=${e.entity||""}
                @value-changed=${e=>this._handleSensorChange(t,i,"entity",e.detail.value)}
                label="Entity"
                allow-custom-entity
                required
              ></ha-entity-picker>

              <ha-textfield
                .value=${e.name||""}
                @input=${e=>this._handleSensorChange(t,i,"name",e.target.value)}
                label="Display Name"
                placeholder="Sensor Name"
                required
              ></ha-textfield>
            </div>

            <!-- Icon and Unit -->
            <div class="grid-2">
              <ha-icon-picker
                .value=${e.icon||""}
                @value-changed=${e=>this._handleSensorChange(t,i,"icon",e.detail.value)}
                label="Icon (optional)"
              ></ha-icon-picker>

              <ha-textfield
                .value=${e.unit||""}
                @input=${e=>this._handleSensorChange(t,i,"unit",e.target.value)}
                label="Unit"
                placeholder="% or °C or GB"
              ></ha-textfield>
            </div>

            <!-- Display Type (only for top sensors) -->
            ${s?V`
              <div class="grid-2">
                <ha-select
                  .value=${e.display_type||"number"}
                  @selected=${e=>this._handleSensorChange(t,i,"display_type",e.target.value)}
                  label="Display Type"
                  fixedMenuPosition
                  naturalMenuWidth
                >
                  <ha-list-item value="number">Number</ha-list-item>
                  <ha-list-item value="bar">Progress Bar</ha-list-item>
                  <ha-list-item value="graph">Graph</ha-list-item>
                  <ha-list-item value="badge">Badge</ha-list-item>
                </ha-select>

                ${"graph"===e.display_type?V`
                  <ha-select
                    .value=${e.graph_detail||1}
                    @selected=${e=>this._handleSensorChange(t,i,"graph_detail",Number(e.target.value))}
                    label="Graph Detail"
                    fixedMenuPosition
                    naturalMenuWidth
                  >
                    <ha-list-item value=${1}>Low (compact)</ha-list-item>
                    <ha-list-item value=${2}>Medium</ha-list-item>
                    <ha-list-item value=${3}>High (detailed)</ha-list-item>
                  </ha-select>
                `:""}
              </div>

              ${"graph"===e.display_type?V`
                <ha-textfield
                  type="number"
                  .value=${e.hours_to_show||24}
                  @input=${e=>this._handleSensorChange(t,i,"hours_to_show",Number(e.target.value))}
                  label="Hours to Show"
                  min="1"
                  max="168"
                  suffix="hours"
                ></ha-textfield>
              `:""}

              ${"bar"===e.display_type?V`
                <div class="grid-2">
                  <ha-textfield
                    type="number"
                    .value=${null!==(a=e.min)&&void 0!==a?a:0}
                    @input=${e=>this._handleSensorChange(t,i,"min",Number(e.target.value))}
                    label="Min Value"
                  ></ha-textfield>

                  <ha-textfield
                    type="number"
                    .value=${null!==(o=e.max)&&void 0!==o?o:100}
                    @input=${e=>this._handleSensorChange(t,i,"max",Number(e.target.value))}
                    label="Max Value"
                  ></ha-textfield>
                </div>
              `:""}
            `:""}

            <!-- Tap Action (для всех сенсоров) -->
            <hui-action-editor
              .hass=${this.hass}
              .value=${e.tap_action||{action:"more-info"}}
              @value-changed=${e=>this._handleSensorChange(t,i,"tap_action",e.detail.value)}
              label="Tap Action"
            ></hui-action-editor>

            <!-- Preview для list сенсоров -->
            ${s?"":V`
              <div class="preview-box">
                <div class="preview-label">Preview:</div>
                <div class="preview-item">
                  <div class="list-left">
                    ${e.icon?V`<ha-icon icon="${e.icon}"></ha-icon>`:""}
                    <span>${e.name||"Sensor Name"}</span>
                  </div>
                  <span class="list-value">${e.unit?`123${e.unit}`:"123"}</span>
                </div>
              </div>
            `}
          </div>
        `:""}
      </div>
    `}_setActiveTab(t){this._activeTab=t}_handleBasicChange(t,e){if(!this._config)return;const i=Object.assign({},this._config);""===e||null==e?delete i[t]:i[t]=e,this._config=i,mt(this,"config-changed",{config:i})}_handleNestedChange(t,e,i){if(!this._config)return;const s=Object.assign({},this._config),a=Object.assign({},s[t]||{});""===i||null==i?delete a[e]:a[e]=i,s[t]=a,this._config=s,mt(this,"config-changed",{config:s})}_handleSensorChange(t,e,i,s){if(!this._config)return;const a=Object.assign({},this._config),o=[...a[t]||[]];o[e]||(o[e]={}),""===s||null==s?delete o[e][i]:o[e][i]=s,a[t]=o,this._config=a,mt(this,"config-changed",{config:a})}_addSensor(t){if(!this._config)return;const e=Object.assign({},this._config),i=[...e[t]||[]],s={entity:"",name:"New Sensor",unit:"",icon:"",tap_action:{action:"more-info"}};"top_sensors"===t&&(s.display_type="number",s.graph_detail=1,s.hours_to_show=24),i.push(s),e[t]=i,this._config=e,this._expandedSensors.add(`${t}-${i.length-1}`),mt(this,"config-changed",{config:e})}_removeSensor(t,e){if(!this._config)return;const i=Object.assign({},this._config),s=[...i[t]||[]];s.splice(e,1),i[t]=s,this._config=i,this._expandedSensors.delete(`${t}-${e}`),mt(this,"config-changed",{config:i})}static get styles(){return n`
      .editor {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 8px 0;
      }

      .tabs {
        display: flex;
        gap: 4px;
        flex-wrap: wrap;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
        padding-bottom: 8px;
        margin-bottom: 8px;
      }

      .tab {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 12px;
        border: none;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 8px;
        cursor: pointer;
        font-size: 13px;
        font-weight: 500;
        color: var(--primary-text-color, #333);
        transition: all 0.2s;
        min-width: 80px;
        justify-content: center;
      }

      .tab:hover {
        background: var(--primary-color, #03a9f4);
        color: white;
      }

      .tab.active {
        background: var(--primary-color, #03a9f4);
        color: white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      }

      .tab ha-icon {
        --mdc-icon-size: 18px;
      }

      .tab-content {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      .section {
        display: flex;
        flex-direction: column;
        gap: 16px;
        background: var(--card-background-color, #ffffff);
        border-radius: 12px;
        padding: 16px;
      }

      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
      }

      .section-title {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
        color: var(--primary-text-color, #333);
      }

      h4 {
        margin: 8px 0 4px 0;
        font-size: 14px;
        font-weight: 500;
        color: var(--secondary-text-color, #666);
      }

      .grid-2 {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 12px;
      }

      .info-box {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 8px;
        font-size: 13px;
        color: var(--secondary-text-color, #666);
        border-left: 3px solid var(--primary-color, #03a9f4);
      }

      .info-box ha-icon {
        --mdc-icon-size: 20px;
        color: var(--primary-color, #03a9f4);
      }

      .sensors-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
      }

      .sensors-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .sensor-row {
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 8px;
        border: 1px solid var(--divider-color, #e0e0e0);
        overflow: hidden;
      }

      .sensor-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px;
        background: var(--secondary-background-color, #f5f5f5);
        cursor: pointer;
        transition: background 0.2s;
      }

      .sensor-header:hover {
        background: var(--primary-color, #03a9f4);
        color: white;
      }

      .sensor-header:hover .sensor-name,
      .sensor-header:hover .sensor-unit-preview,
      .sensor-header:hover ha-icon {
        color: white;
      }

      .sensor-title {
        display: flex;
        align-items: center;
        gap: 8px;
        flex: 1;
      }

      .sensor-name {
        font-weight: 600;
        font-size: 14px;
        color: var(--primary-text-color, #333);
      }

      .sensor-icon-preview {
        --mdc-icon-size: 16px;
        color: var(--secondary-text-color);
      }

      .sensor-unit-preview {
        font-size: 12px;
        color: var(--secondary-text-color);
      }

      .sensor-badge {
        background: var(--primary-color, #03a9f4);
        color: white;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 10px;
        text-transform: uppercase;
      }

      .sensor-content {
        padding: 16px;
        border-top: 1px solid var(--divider-color, #e0e0e0);
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .empty-state {
        padding: 32px;
        text-align: center;
        color: var(--secondary-text-color, #666);
        font-style: italic;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 12px;
        border: 1px dashed var(--divider-color, #e0e0e0);
      }

      .preview-box {
        margin-top: 8px;
        padding: 12px;
        background: var(--card-background-color, #ffffff);
        border-radius: 8px;
        border: 1px solid var(--divider-color, #e0e0e0);
      }

      .preview-label {
        font-size: 11px;
        color: var(--secondary-text-color);
        margin-bottom: 8px;
        text-transform: uppercase;
      }

      .preview-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 12px;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 6px;
      }

      .preview-item .list-left {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .preview-item .list-left ha-icon {
        --mdc-icon-size: 16px;
        color: var(--secondary-text-color);
      }

      .preview-item .list-value {
        color: var(--primary-text-color);
      }

      ha-textfield,
      ha-select,
      ha-entity-picker,
      ha-icon-picker {
        width: 100%;
      }

      ha-formfield {
        padding: 4px 0;
      }

      @media (max-width: 600px) {
        .tab {
          flex: 1;
          min-width: auto;
          padding: 8px 4px;
          font-size: 12px;
        }
        
        .tab span {
          display: none;
        }
        
        .tab ha-icon {
          margin: 0;
        }
        
        .grid-2 {
          grid-template-columns: 1fr;
        }
      }
    `}};t([pt()],St.prototype,"hass",void 0),t([ut()],St.prototype,"_config",void 0),t([ut()],St.prototype,"_activeTab",void 0),t([ut()],St.prototype,"_expandedSensors",void 0),St=t([lt("router-card-editor")],St);class At extends rt{formatValue(t,e){const i=parseFloat(t);if(isNaN(i))return`${t}${e||""}`;if(i>86400&&!e){const t=Math.floor(i/86400),e=Math.floor(i%86400/3600),s=Math.floor(i%3600/60),a=[];return t>0&&a.push(`${t}д`),e>0&&a.push(`${e}ч`),(s>0||0===a.length)&&a.push(`${s}м`),a.join(" ")}return"GB"===e||"TB"===e?`${i.toFixed(2)} ${e}`:"%"===e||"°C"===e?`${i.toFixed(1)}${e}`:`${i}${e||""}`}getValueColor(t,e,i){if(void 0!==e&&void 0!==i){const s=(t-e)/(i-e)*100;return s<50?"#27ae60":s<80?"#f39c12":"#e74c3c"}return"var(--primary-color, #03a9f4)"}_handleClick(t){t.stopPropagation(),this.onClick&&this.onClick(this.sensor.tap_action,this.sensor.entity)}static get baseStyles(){return n`
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }

      .card-header {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 12px 0;
      }

      .card-header ha-icon {
        --mdc-icon-size: 16px;
        color: var(--secondary-text-color, #666);
      }

      .dark .card-header ha-icon {
        color: #aaa;
      }

      .card-name {
        font-size: 12px;
        color: var(--secondary-text-color, #666);
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .dark .card-name {
        color: #aaa;
      }

      .clickable {
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .clickable:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.15);
      }

      .error {
        color: #e74c3c;
        font-size: 12px;
      }
    `}render(){const t=this.sensor.tap_action&&"none"!==this.sensor.tap_action.action;return V`
      <div class="card ${t?"clickable":""}" @click=${this._handleClick}>
        <div class="card-header">
          ${this.sensor.icon?V`<ha-icon icon="${this.sensor.icon}"></ha-icon>`:""}
          <span class="card-name">${this.sensor.name}</span>
        </div>
        ${this.renderContent()}
      </div>
    `}}t([pt({type:Object})],At.prototype,"sensor",void 0),t([pt({type:Object})],At.prototype,"data",void 0),t([pt({type:Object})],At.prototype,"hass",void 0),t([pt({type:Function})],At.prototype,"onClick",void 0);let Ct=class extends At{renderContent(){const t=this.formatValue(this.data.state,this.sensor.unit||this.data.unit);return V`
      <div class="card-value">${t}</div>
    `}static get styles(){return[this.baseStyles,n`
        .card {
          background: var(--secondary-background-color, #f5f5f5);
          padding: 14px;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          height: 100%;
        }

        .dark .card {
          background: #16213e;
        }

        .card-value {
          font-size: 22px;
          font-weight: 600;
          padding: 0 12px 8px;
          color: var(--primary-text-color);
        }
      `]}};Ct=t([lt("router-number-card")],Ct);let Et=class extends At{_calculateBarValue(){var t,e;const i=parseFloat(this.data.state);if(isNaN(i))return 0;const s=null!==(t=this.sensor.min)&&void 0!==t?t:0,a=null!==(e=this.sensor.max)&&void 0!==e?e:100;return Math.min(100,Math.max(0,(i-s)/(a-s)*100))}renderContent(){const t=parseFloat(this.data.state),e=this._calculateBarValue(),i=this.getValueColor(t,this.sensor.min,this.sensor.max),s=this.formatValue(this.data.state,this.sensor.unit||this.data.unit);return V`
      <div class="card-value" style="color: ${i}">${s}</div>
      <div class="card-bar">
        <div class="card-bar-fill" style="width: ${e}%; background: ${i}"></div>
      </div>
    `}static get styles(){return[this.baseStyles,n`
        .card {
          background: var(--secondary-background-color, #f5f5f5);
          padding: 10px 14px 8px 14px;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          height: 100%;
        }

        .dark .card {
          background: #16213e;
        }

        .card-value {
          font-size: 18px; /* Уменьшил с 22px */
          font-weight: 600;
          padding: 0;
          transition: color 0.3s ease;
        }

        .card-bar {
          height: 4px;
          background: #e0e0e0;
          border-radius: 2px;
          overflow: hidden;
          margin: 0 0 2px 0; /* Уменьшил отступ снизу */
        }

        .dark .card-bar {
          background: #2a2a4a;
        }

        .card-bar-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 0.3s ease;
        }
      `]}};Et=t([lt("router-bar-card")],Et);let Tt=class extends At{constructor(){super(...arguments),this._cachedPoints=null,this._lastEntityId="",this._lastDataState=""}_getGraphPoints(){var t;const e=this.sensor.entity,i=this.data.state;if(this._cachedPoints&&this._lastEntityId===e&&this._lastDataState===i)return this._cachedPoints;const s=(null===(t=this.graphData)||void 0===t?void 0:t[e])||[],a=parseFloat(i)||0;if(s.length<2){const t={points:[],min:0,max:100};return this._cachedPoints=t,this._lastEntityId=e,this._lastDataState=i,t}const o=s.slice(-24).map(t=>parseFloat(t.state)||0);o.length>0&&Math.abs(o[o.length-1]-a)>.01&&o.push(a);const n=Math.max(...o,this.sensor.max||Math.max(...o,a)),r=Math.min(...o,this.sensor.min||Math.min(...o,0)),c=n-r||1,l=this._getGraphHeight(),d=o.map((t,e)=>({x:e/(o.length-1)*200,y:l-(t-r)/c*l*.9-.05*l})),h={points:d,min:r,max:n};return this._cachedPoints=h,this._lastEntityId=e,this._lastDataState=i,h}_getGraphHeight(){const t=this.sensor.graph_detail||2;return 1===t?36:3===t?60:45}_generateSmoothPath(t){if(t.length<2)return"";let e=`M ${t[0].x},${t[0].y} `;for(let i=0;i<t.length-1;i++){const s=t[i],a=t[i+1];e+=`C ${s.x+.25*(a.x-s.x)},${s.y} ${a.x-.25*(a.x-s.x)},${a.y} ${a.x},${a.y} `}return e}_generateAreaPoints(t){if(t.length<2)return"";const e=this._getGraphHeight();let i=`0,${e} `;return i+=t.map(t=>`${t.x},${t.y}`).join(" "),i+=` ${t[t.length-1].x},${e}`,i}renderContent(){const{points:t,min:e,max:i}=this._getGraphPoints(),s=parseFloat(this.data.state)||0,a=this.sensor.unit||this.data.unit||"",o=this.sensor.graph_detail||2,n=this._getGraphHeight();if(t.length<2)return V`
        <div class="graph-container" style="height: ${n}px">
          <div class="graph-current">${s.toFixed(1)}${a}</div>
          <div class="graph-placeholder">
            <ha-icon icon="mdi:chart-line"></ha-icon>
            <span>No data</span>
          </div>
        </div>
      `;const r=this._generateSmoothPath(t),c=this._generateAreaPoints(t),l=this.sensor.entity.replace(/[^a-zA-Z0-9]/g,"-");return V`
      <div class="graph-wrapper">
        <div class="graph-current">${s.toFixed(1)}${a}</div>
        <div class="graph-container" style="height: ${n}px">
          <svg viewBox="0 0 ${200} ${n}" preserveAspectRatio="none" class="graph-svg">
            <defs>
              <linearGradient id="grad-${l}" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="var(--accent-color, var(--primary-color, #03a9f4))" stop-opacity="0.2"/>
                <stop offset="80%" stop-color="var(--accent-color, var(--primary-color, #03a9f4))" stop-opacity="0.05"/>
                <stop offset="100%" stop-color="var(--accent-color, var(--primary-color, #03a9f4))" stop-opacity="0"/>
              </linearGradient>
            </defs>
            
            <polygon
              points="${c}"
              fill="url(#grad-${l})"
              class="graph-area"
            />
            
            <path
              d="${r}"
              fill="none"
              stroke="var(--accent-color, var(--primary-color, #03a9f4))"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="graph-line"
            />
            
            ${3===o?t.map(t=>V`
              <circle
                cx="${t.x}"
                cy="${t.y}"
                r="2"
                fill="var(--accent-color, var(--primary-color, #03a9f4))"
                stroke="var(--card-background-color, white)"
                stroke-width="1.5"
                class="graph-point"
              />
            `):""}
          </svg>
        </div>
        <div class="graph-time">
          <span>${this.sensor.hours_to_show||24}h ago</span>
          <span>now</span>
        </div>
      </div>
    `}static get styles(){return[this.baseStyles,n`
        .card {
          background: var(--secondary-background-color, #f5f5f5);
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          height: 100%;
          padding: 0;
        }

        .dark .card {
          background: #16213e;
        }

        .graph-wrapper {
          width: 100%;
          padding: 0;
          display: flex;
          flex-direction: column;
        }

        .graph-current {
          font-size: 18px;
          font-weight: 600;
          color: var(--primary-text-color);
          padding: 8px 12px 4px 12px;
        }

        .graph-container {
          width: 100%;
          margin: 0;
          padding: 0;
        }

        .graph-svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        .graph-line {
          filter: drop-shadow(0 1px 2px rgba(0,0,0,0.1));
          vector-effect: non-scaling-stroke;
        }

        .graph-point {
          transition: r 0.2s ease;
        }

        .graph-point:hover {
          r: 4;
        }

        .graph-time {
          display: flex;
          justify-content: space-between;
          font-size: 9px;
          color: var(--secondary-text-color);
          padding: 2px 12px 8px 12px;
          opacity: 0.7;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .graph-placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          height: 100%;
          min-height: 36px;
          font-size: 12px;
          color: var(--secondary-text-color);
          font-style: italic;
          background: var(--secondary-background-color);
          border-radius: 4px;
          margin: 0 12px 8px 12px;
        }

        .graph-placeholder ha-icon {
          --mdc-icon-size: 16px;
          color: var(--secondary-text-color);
        }
      `]}};t([pt({type:Object})],Tt.prototype,"graphData",void 0),Tt=t([lt("router-graph-card")],Tt);let Pt=class extends At{renderContent(){const t=this.formatValue(this.data.state,this.sensor.unit||this.data.unit);return V`
      <div class="badge-wrapper">
        <span class="badge-value">${t}</span>
      </div>
    `}static get styles(){return[this.baseStyles,n`
        .card {
          background: var(--secondary-background-color, #f5f5f5);
          padding: 14px;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          height: 100%;
        }

        .dark .card {
          background: #16213e;
        }

        .badge-wrapper {
          padding: 0 12px 8px;
        }

        .badge-value {
          background: var(--primary-color, #03a9f4);
          color: white;
          padding: 4px 12px;
          border-radius: 16px;
          font-size: 18px;
          font-weight: 600;
          display: inline-block;
        }
      `]}};Pt=t([lt("router-badge-card")],Pt);class Ot extends rt{constructor(){super(...arguments),this.enabled=!0}_handleClick(t,e){t.stopPropagation(),this.onClick&&this.onClick(this.tap_action,e)}static get baseStyles(){return n`
      :host {
        display: block;
        width: 100%;
      }

      .section {
        margin-bottom: 16px;
        border-radius: 8px;
        transition: all 0.2s ease;
      }

      .section.clickable {
        cursor: pointer;
      }

      .section.clickable:hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }

      .section-content {
        width: 100%;
      }
    `}render(){if(!this.enabled)return V``;const t=this.tap_action&&"none"!==this.tap_action.action;return V`
      <div class="section ${t?"clickable":""}" @click=${t=>this._handleClick(t)}>
        <div class="section-content">
          ${this.renderContent()}
        </div>
      </div>
    `}}t([pt({type:Boolean})],Ot.prototype,"enabled",void 0),t([pt({type:Object})],Ot.prototype,"tap_action",void 0),t([pt({type:Function})],Ot.prototype,"onClick",void 0);let Nt=class extends Ot{_getStatusColor(t){const e=t.toLowerCase();return e.includes("connected")||e.includes("up")||"on"===e||"true"===e||"online"===e?"#27ae60":e.includes("disconnected")||e.includes("down")||"off"===e||"false"===e||"offline"===e?"#e74c3c":"#f39c12"}renderContent(){const t=null!==this.leftData&&void 0!==this.leftData,e=null!==this.rightData&&void 0!==this.rightData;return t||e?V`
      <div class="status-section">
        <div class="status-row">
          ${t?V`
            <div class="status-item status-left" @click=${t=>this._handleClick(t,this.config.left_entity)}>
              <span class="status-label">${this.config.left_label||"Status"}</span>
              <span class="status-value" style="color: ${this._getStatusColor(this.leftData.state)}">
                ● ${this.leftData.state}
              </span>
            </div>
          `:G}
          
          ${e?V`
            <div class="status-item status-right" @click=${t=>this._handleClick(t,this.config.right_entity)}>
              <span class="status-label">${this.config.right_label||"IP"}</span>
              <span class="status-value">${this.rightData.state}</span>
            </div>
          `:G}
        </div>
      </div>
    `:V``}static get styles(){return[this.baseStyles,n`
        .status-section {
          padding: 12px;
          background: var(--secondary-background-color, #f5f5f5);
          border-radius: 8px;
        }

        .dark .status-section {
          background: #16213e;
        }

        .status-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }

        .status-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
          padding: 4px;
          border-radius: 4px;
        }

        .status-item.status-left {
          flex: 1;
        }

        .status-item.status-right {
          text-align: right;
        }

        .status-label {
          font-size: 11px;
          color: var(--secondary-text-color, #666);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .dark .status-label {
          color: #aaa;
        }

        .status-value {
          font-size: 16px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .status-item.status-right .status-value {
          justify-content: flex-end;
        }

        @media (max-width: 600px) {
          .status-row {
            flex-direction: column;
            align-items: stretch;
            gap: 8px;
          }

          .status-item.status-left,
          .status-item.status-right {
            text-align: left;
          }

          .status-item.status-right .status-value {
            justify-content: flex-start;
          }
        }
      `]}};t([pt({type:Object})],Nt.prototype,"config",void 0),t([pt({type:Object})],Nt.prototype,"leftData",void 0),t([pt({type:Object})],Nt.prototype,"rightData",void 0),Nt=t([lt("router-status-section")],Nt);let Ut=class extends Ot{constructor(){super(...arguments),this.updateAvailable=!1}renderContent(){return this.updateAvailable?V`
      <div class="update-section" @click=${t=>this._handleClick(t,this.config.entity)}>
        <ha-icon icon="mdi:arrow-up-circle"></ha-icon>
        <span>${this.config.label||"Update Available"}</span>
      </div>
    `:V``}static get styles(){return[this.baseStyles,n`
        .update-section {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 16px;
          margin-bottom: 16px;
          background: rgba(243, 156, 28, 0.2);
          border: 1px solid rgba(243, 156, 28, 0.5);
          border-radius: 8px;
          color: #f39c12;
          font-size: 13px;
          font-weight: 600;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .update-section:hover {
          background: rgba(243, 156, 28, 0.3);
          transform: scale(1.02);
        }

        .dark .update-section {
          background: rgba(243, 156, 28, 0.15);
        }

        ha-icon {
          --mdc-icon-size: 18px;
          color: #f39c12;
        }
      `]}};t([pt({type:Object})],Ut.prototype,"config",void 0),t([pt({type:Boolean})],Ut.prototype,"updateAvailable",void 0),Ut=t([lt("router-update-section")],Ut);let Mt=class extends Ot{constructor(){super(...arguments),this.sensors=[]}_getSensorState(t){var e;if(!t||!this.hass||!this.hass.states)return null;const i=this.hass.states[t];return i?{state:i.state,attributes:i.attributes,unit:null===(e=i.attributes)||void 0===e?void 0:e.unit_of_measurement}:null}_formatValue(t,e){const i=parseFloat(t);if(isNaN(i))return`${t}${e||""}`;if("GB"===e||"TB"===e)return`${i.toFixed(2)} ${e}`;if("%"===e||"°C"===e)return`${i.toFixed(1)}${e}`;if(i>86400&&!e){const t=Math.floor(i/86400),e=Math.floor(i%86400/3600),s=Math.floor(i%3600/60),a=[];return t>0&&a.push(`${t}д`),e>0&&a.push(`${e}ч`),(s>0||0===a.length)&&a.push(`${s}м`),a.join(" ")}return`${i}${e||""}`}renderContent(){return this.sensors.length?V`
      <div class="list-section">
        <div class="list-grid">
          ${this.sensors.map(t=>{const e=this._getSensorState(t.entity);if(!e)return V`
                <div class="list-item error">
                  <div class="list-left">
                    <ha-icon icon="mdi:alert"></ha-icon>
                    <span class="list-name">${t.name}</span>
                  </div>
                  <span class="list-value error">N/A</span>
                </div>
              `;const i=this._formatValue(e.state,t.unit||e.unit),s=t.tap_action&&"none"!==t.tap_action.action;return V`
              <div class="list-item ${s?"clickable":""}" 
                  @click=${e=>this._handleClick(e,t.entity)}>
                <div class="list-left">
                  ${t.icon?V`<ha-icon icon="${t.icon}"></ha-icon>`:G}
                  <span class="list-name">${t.name}</span>
                </div>
                <span class="list-value">${i}</span>
              </div>
            `})}
        </div>
      </div>
    `:V``}static get styles(){return[this.baseStyles,n`
        .list-section {
          width: 100%;
          margin-top: 16px; /* Добавил отступ сверху */
        }

        .list-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }

        @media (max-width: 600px) {
          .list-grid {
            grid-template-columns: 1fr;
          }
        }

        .list-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 14px;
          background: var(--secondary-background-color, #f5f5f5);
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .list-item.error {
          border: 1px solid #e74c3c;
          opacity: 0.7;
        }

        .list-item.clickable {
          cursor: pointer;
        }

        .list-item.clickable:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }

        .dark .list-item {
          background: #16213e;
        }

        .list-left {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow: hidden;
          flex: 1;
        }

        .list-left ha-icon { 
          --mdc-icon-size: 16px; 
          color: var(--secondary-text-color, #666); 
          flex-shrink: 0;
        }

        .dark .list-left ha-icon {
          color: #aaa;
        }

        .list-name {
          font-size: 13px;
          color: var(--primary-text-color, #333);
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .dark .list-name {
          color: #fff;
        }

        .list-value {
          font-size: 14px;
          font-weight: 400; /* Изменил с 600 на 400 - обычный текст */
          color: var(--primary-text-color, #333); /* Изменил на обычный цвет текста */
          white-space: nowrap;
          margin-left: 8px;
          flex-shrink: 0;
        }

        .list-value.error {
          color: #e74c3c;
          font-weight: 400;
        }
      `]}};t([pt({type:Array})],Mt.prototype,"sensors",void 0),t([pt({type:Object})],Mt.prototype,"hass",void 0),Mt=t([lt("router-list-section")],Mt);const jt="mdi:router-wireless",Rt="mdi:access-point",zt="mdi:restart";let Dt=class extends rt{constructor(){super(...arguments),this.graphData={},this.componentsLoaded=!1}static async getConfigElement(){return document.createElement("router-card-editor")}static getStubConfig(){return{type:"custom:router-card",name:"Router",icon:"mdi:router-wireless",controller:!0,theme:"default",update_section:{enabled:!0,entity:"",label:"Update Available",tap_action:{action:"more-info"}},status_section:{enabled:!0,left_entity:"",left_label:"WAN Status",right_entity:"",right_label:"WAN IP",tap_action:{action:"more-info"}},reboot_button:{enabled:!1,service:"button.router_reboot_press",confirmation:!0,label:"Reboot",icon:"mdi:restart"},top_sensors:[],bottom_sensors:[]}}setConfig(t){this.config=Object.assign({},t),this._fetchGraphData(),this._loadComponents()}async _loadComponents(){try{await(async()=>{const t=gt;try{if(t.every(t=>customElements.get(t)))return;await Promise.race([customElements.whenDefined("partial-panel-resolver"),new Promise((t,e)=>setTimeout(()=>e(new Error("Timeout waiting for partial-panel-resolver")),1e4))]);const e=document.createElement("partial-panel-resolver");if(!e)throw new Error("Failed to create partial-panel-resolver element");if(e.hass={panels:[{url_path:"tmp",component_name:"config"}]},"function"!=typeof e._updateRoutes)throw new Error("partial-panel-resolver does not have _updateRoutes method");if(e._updateRoutes(),!e.routerOptions?.routes?.tmp?.load)throw new Error("Failed to create tmp route in partial-panel-resolver");await Promise.race([e.routerOptions.routes.tmp.load(),new Promise((t,e)=>setTimeout(()=>e(new Error("Timeout loading tmp route")),1e4))]),await Promise.race([customElements.whenDefined("ha-panel-config"),new Promise((t,e)=>setTimeout(()=>e(new Error("Timeout waiting for ha-panel-config")),1e4))]);const i=document.createElement("ha-panel-config");if(!i)throw new Error("Failed to create ha-panel-config element");if(!i.routerOptions?.routes?.automation?.load)throw new Error("ha-panel-config does not have automation route");await Promise.race([i.routerOptions.routes.automation.load(),new Promise((t,e)=>setTimeout(()=>e(new Error("Timeout loading automation components")),1e4))]);const s=t.filter(t=>!customElements.get(t));if(s.length>0)throw new Error(`Failed to load components: ${s.join(", ")}`)}catch(e){try{if(window.customElements&&window.customElements.get("home-assistant")){const e=new CustomEvent("ha-request-load-components",{detail:{components:t},bubbles:!0,composed:!0});document.dispatchEvent(e)}}catch(t){}}})(),this.componentsLoaded=!0,this.requestUpdate()}catch(t){}}shouldUpdate(t){if(t.has("hass")){const e=t.get("hass");if(e&&this.config.top_sensors){const t=this.config.top_sensors.filter(t=>"graph"===t.display_type);for(const i of t){const t=e.states[i.entity],s=this.hass.states[i.entity];if(t&&s&&t.state!==s.state){this._fetchGraphData();break}}}}return!0}async _fetchGraphData(){if(!this.config.top_sensors||!this.hass)return;const t=this.config.top_sensors.filter(t=>"graph"===t.display_type);if(0===t.length)return;const e={};for(const i of t){const t=i.hours_to_show||24,s=new Date,a=new Date(s.getTime()-60*t*60*1e3);try{const t=await this.hass.callApi("GET",`history/period/${a.toISOString()}?filter_entity_id=${i.entity}&end_time=${s.toISOString()}`);t&&t[0]&&(e[i.entity]=t[0])}catch(t){}}this.graphData=Object.assign(Object.assign({},this.graphData),e),this.requestUpdate()}_getSensorState(t){var e;if(!t||!this.hass||!this.hass.states)return null;const i=this.hass.states[t];return i?{state:i.state,attributes:i.attributes,unit:null===(e=i.attributes)||void 0===e?void 0:e.unit_of_measurement}:null}_checkUpdateAvailable(t){if(!t||!this.hass.states[t])return!1;const e=this.hass.states[t],i=t.split(".")[0];return"update"===i?"on"===e.state||"available"===e.state:"binary_sensor"===i?"on"===e.state:"on"===e.state||"true"===e.state||"1"===e.state}_handleReboot(){const t=this.config.reboot_button;if(!t||!t.enabled)return;if(!1!==t.confirmation&&!confirm("Are you sure you want to reboot the router?"))return;const e=t.service||"button.router_reboot_press",[i,s]=e.split(".");this.hass.callService(i,s,t.service_data||{})}_handleTap(t,e){if(t&&"none"!==t.action)switch(t.action){case"more-info":e&&this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e}}));break;case"navigate":t.navigation_path&&(history.pushState(null,"",t.navigation_path),this.dispatchEvent(new CustomEvent("location-changed",{bubbles:!0,composed:!0})));break;case"url":t.url_path&&window.open(t.url_path,"_blank");break;case"call-service":if(t.service){const[e,i]=t.service.split(".");this.hass.callService(e,i,t.service_data||{})}break;case"toggle":e&&this.hass.callService("homeassistant","toggle",{entity_id:e})}else e&&this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e}}))}_renderSensorCard(t,e){switch(this.hass,this.graphData,this._handleTap.bind(this),t.display_type){case"bar":return V`<router-bar-card .sensor=${t} .data=${e} .onClick=${this._handleTap.bind(this)}></router-bar-card>`;case"graph":return V`<router-graph-card .sensor=${t} .data=${e} .graphData=${this.graphData} .onClick=${this._handleTap.bind(this)}></router-graph-card>`;case"badge":return V`<router-badge-card .sensor=${t} .data=${e} .onClick=${this._handleTap.bind(this)}></router-badge-card>`;default:return V`<router-number-card .sensor=${t} .data=${e} .onClick=${this._handleTap.bind(this)}></router-number-card>`}}render(){var t,e,i,s,a,o,n,r,c;if(!this.config||!this.hass)return V`<ha-card><div class="loading">Loading...</div></ha-card>`;const l=this.config.icon||(this.config.controller?jt:Rt),d=(null===(t=this.config.status_section)||void 0===t?void 0:t.left_entity)?this._getSensorState(this.config.status_section.left_entity):null,h=(null===(e=this.config.status_section)||void 0===e?void 0:e.right_entity)?this._getSensorState(this.config.status_section.right_entity):null,p=(null===(i=this.config.update_section)||void 0===i?void 0:i.enabled)&&this.config.update_section.entity&&this._checkUpdateAvailable(this.config.update_section.entity);return V`
      <ha-card class="router-card ${this.config.theme||"default"}">
        <div class="header">
          <div class="header-left">
            <ha-icon icon="${l}"></ha-icon>
            <span class="title">${this.config.name||"Router"}</span>
            ${this.config.controller?V`<span class="badge controller">Controller</span>`:V`<span class="badge repeater">Repeater</span>`}
          </div>
          <div class="header-right">
            ${(null===(s=this.config.reboot_button)||void 0===s?void 0:s.enabled)?V`<span class="badge reboot-badge" @click=${this._handleReboot}>
                  <ha-icon icon="${this.config.reboot_button.icon||zt}"></ha-icon>
                  ${this.config.reboot_button.label||"Reboot"}
                </span>`:G}
          </div>
        </div>

        <!-- Update Section -->
        <router-update-section
          .enabled=${(null===(a=this.config.update_section)||void 0===a?void 0:a.enabled)||!1}
          .config=${this.config.update_section||{}}
          .updateAvailable=${p}
          .tap_action=${null===(o=this.config.update_section)||void 0===o?void 0:o.tap_action}
          .onClick=${this._handleTap.bind(this)}
        ></router-update-section>

        <!-- Status Section -->
        <router-status-section
          .enabled=${(null===(n=this.config.status_section)||void 0===n?void 0:n.enabled)||!1}
          .config=${this.config.status_section||{}}
          .leftData=${d}
          .rightData=${h}
          .tap_action=${null===(r=this.config.status_section)||void 0===r?void 0:r.tap_action}
          .onClick=${this._handleTap.bind(this)}
        ></router-status-section>

        <!-- Top Sensors (Cards) -->
        ${this.config.top_sensors&&this.config.top_sensors.length>0?V`
          <div class="top-section">
            <div class="cards-grid">
              ${this.config.top_sensors.map(t=>{const e=this._getSensorState(t.entity);return e?this._renderSensorCard(t,e):V`
                    <div class="card-item error">
                      <div class="card-header">
                        <ha-icon icon="mdi:alert"></ha-icon>
                        <span class="card-name">${t.name}</span>
                      </div>
                      <div class="card-value error">Entity not found</div>
                    </div>
                  `})}
            </div>
          </div>
        `:G}

        <!-- Bottom Sensors (List) - всегда с отступом сверху -->
        <div class="list-section-wrapper">
          <router-list-section
            .enabled=${((null===(c=this.config.bottom_sensors)||void 0===c?void 0:c.length)||0)>0}
            .sensors=${this.config.bottom_sensors||[]}
            .hass=${this.hass}
            .onClick=${this._handleTap.bind(this)}
          ></router-list-section>
        </div>
    `}static get styles(){return n`
      :host { display: block; }
      
      ha-card {
        padding: 16px;
        background: var(--card-background-color, #ffffff);
        border-radius: 12px;
        box-shadow: var(--ha-card-box-shadow, 0 2px 4px rgba(0,0,0,0.1));
      }
      
      .router-card.dark { background: #1a1a2e; color: #ffffff; }
      .router-card.light { background: #ffffff; color: #333333; }
      
      .loading {
        padding: 20px;
        text-align: center;
        color: var(--secondary-text-color);
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
      }
      
      .header-left {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      
      .header-left ha-icon { 
        --mdc-icon-size: 28px; 
        color: var(--primary-color, #03a9f4); 
      }
      
      .title {
        font-size: 18px;
        font-weight: 600;
      }
      
      .badge {
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
      
      .badge.controller {
        background: #27ae60;
        color: white;
      }
      
      .badge.repeater {
        background: #3498db;
        color: white;
      }
      
      .badge.reboot-badge { 
        background: #e74c3c;
        color: white;
        cursor: pointer;
        transition: all 0.2s;
        padding: 4px 10px;
      }
      
      .badge.reboot-badge:hover {
        background: #c0392b;
        transform: scale(1.05);
      }
      
      .badge.reboot-badge ha-icon { 
        --mdc-icon-size: 14px; 
        color: white; 
      }
      
      .top-section {
        margin-top: 16px;
      }
      
      .cards-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 12px;
      }
      
      .card-item.error {
        background: var(--secondary-background-color, #f5f5f5);
        border: 1px solid #e74c3c;
        opacity: 0.7;
        padding: 14px;
        border-radius: 10px;
      }
      
      .dark .card-item.error {
        background: #16213e;
      }
      
      .card-item .card-header {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 0 0 8px 0;
      }
      
      .card-item .card-header ha-icon { 
        --mdc-icon-size: 16px; 
        color: var(--secondary-text-color, #666); 
      }
      
      .dark .card-item .card-header ha-icon {
        color: #aaa;
      }
      
      .card-item .card-name { 
        font-size: 12px;
        color: var(--secondary-text-color, #666);
        font-weight: 500;
      }
      
      .dark .card-item .card-name {
        color: #aaa;
      }
      
      .card-item .card-value.error {
        color: #e74c3c;
        font-size: 12px;
      }
      
      .list-section-wrapper {
        margin-top: 16px;
      }

      /* Адаптивность для мобильных */
      @media (max-width: 600px) {
        ha-card {
          padding: 12px;
        }
        
        .cards-grid {
          grid-template-columns: 1fr;
        }
        
        .badge.reboot-badge {
          padding: 4px 8px;
          font-size: 10px;
        }
      }
    `}getCardSize(){var t,e;let i=2;return this.config.top_sensors&&(i+=Math.ceil(this.config.top_sensors.length/2)),this.config.bottom_sensors&&(i+=Math.ceil(this.config.bottom_sensors.length/4)),(null===(t=this.config.update_section)||void 0===t?void 0:t.enabled)&&(i+=1),(null===(e=this.config.status_section)||void 0===e?void 0:e.enabled)&&(i+=1),i}};t([pt()],Dt.prototype,"hass",void 0),t([ut()],Dt.prototype,"config",void 0),t([ut()],Dt.prototype,"graphData",void 0),t([ut()],Dt.prototype,"componentsLoaded",void 0),Dt=t([lt("router-card")],Dt);export{Dt as RouterCard};
