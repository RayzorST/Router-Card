function t(t,e,i,s){var a,o=arguments.length,n=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var r=t.length-1;r>=0;r--)(a=t[r])&&(n=(o<3?a(n):o>3?a(e,i,n):a(e,i))||n);return o>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),a=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=a.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,s)},r=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,f=globalThis,g=f.trustedTypes,m=g?g.emptyScript:"",v=f.reactiveElementPolyfillSupport,_=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!l(t,e),y={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:a}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);a?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),a=e.litNonce;void 0!==a&&s.setAttribute("nonce",a),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==a?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=s;const o=a.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,a){if(void 0!==t){const o=this.constructor;if(!1===s&&(a=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??$)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:a},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==a||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[_("elementProperties")]=new Map,x[_("finalized")]=new Map,v?.({ReactiveElement:x}),(f.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,A=t=>t,S=w.trustedTypes,k=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,V="?"+E,T=`<${V}>`,P=document,U=()=>P.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,N="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,j=/-->/g,H=/>/g,I=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,z=/"/g,D=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),G=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),W=new WeakMap,q=P.createTreeWalker(P,129);function Z(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,s=[];let a,o=2===e?"<svg>":3===e?"<math>":"",n=R;for(let e=0;e<i;e++){const i=t[e];let r,l,c=-1,d=0;for(;d<i.length&&(n.lastIndex=d,l=n.exec(i),null!==l);)d=n.lastIndex,n===R?"!--"===l[1]?n=j:void 0!==l[1]?n=H:void 0!==l[2]?(D.test(l[2])&&(a=RegExp("</"+l[2],"g")),n=I):void 0!==l[3]&&(n=I):n===I?">"===l[0]?(n=a??R,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,r=l[1],n=void 0===l[3]?I:'"'===l[3]?z:L):n===z||n===L?n=I:n===j||n===H?n=R:(n=I,a=void 0);const h=n===I&&t[e+1].startsWith("/>")?" ":"";o+=n===R?i+T:c>=0?(s.push(r),i.slice(0,c)+C+i.slice(c)+E+h):i+E+(-2===c?e:h)}return[Z(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class K{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let a=0,o=0;const n=t.length-1,r=this.parts,[l,c]=J(t,e);if(this.el=K.createElement(l,i),q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=q.nextNode())&&r.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(C)){const e=c[o++],i=s.getAttribute(t).split(E),n=/([.?@])?(.*)/.exec(e);r.push({type:1,index:a,name:n[2],strings:i,ctor:"."===n[1]?et:"?"===n[1]?it:"@"===n[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(E)&&(r.push({type:6,index:a}),s.removeAttribute(t));if(D.test(s.tagName)){const t=s.textContent.split(E),e=t.length-1;if(e>0){s.textContent=S?S.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],U()),q.nextNode(),r.push({type:2,index:++a});s.append(t[e],U())}}}else if(8===s.nodeType)if(s.data===V)r.push({type:2,index:a});else{let t=-1;for(;-1!==(t=s.data.indexOf(E,t+1));)r.push({type:7,index:a}),t+=E.length-1}a++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,s){if(e===G)return e;let a=void 0!==s?i._$Co?.[s]:i._$Cl;const o=O(e)?void 0:e._$litDirective$;return a?.constructor!==o&&(a?._$AO?.(!1),void 0===o?a=void 0:(a=new o(t),a._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=a:i._$Cl=a),void 0!==a&&(e=X(t,a._$AS(t,e.values),a,s)),e}class Y{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??P).importNode(e,!0);q.currentNode=s;let a=q.nextNode(),o=0,n=0,r=i[0];for(;void 0!==r;){if(o===r.index){let e;2===r.type?e=new Q(a,a.nextSibling,this,t):1===r.type?e=new r.ctor(a,r.name,r.strings,this,t):6===r.type&&(e=new at(a,this,t)),this._$AV.push(e),r=i[++n]}o!==r?.index&&(a=q.nextNode(),o++)}return q.currentNode=P,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),O(t)?t===F||null==t||""===t?(this._$AH!==F&&this._$AR(),this._$AH=F):t!==this._$AH&&t!==G&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>M(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==F&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Y(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new K(t)),e}k(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const a of t)s===e.length?e.push(i=new Q(this.O(U()),this.O(U()),this,this.options)):i=e[s],i._$AI(a),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,a){this.type=1,this._$AH=F,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=F}_$AI(t,e=this,i,s){const a=this.strings;let o=!1;if(void 0===a)t=X(this,t,e,0),o=!O(t)||t!==this._$AH&&t!==G,o&&(this._$AH=t);else{const s=t;let n,r;for(t=a[0],n=0;n<a.length-1;n++)r=X(this,s[i+n],e,n),r===G&&(r=this._$AH[n]),o||=!O(r)||r!==this._$AH[n],r===F?t=F:t!==F&&(t+=(r??"")+a[n+1]),this._$AH[n]=r}o&&!s&&this.j(t)}j(t){t===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===F?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==F)}}class st extends tt{constructor(t,e,i,s,a){super(t,e,i,s,a),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??F)===G)return;const i=this._$AH,s=t===F&&i!==F||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==F&&(i===F||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class at{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const ot=w.litHtmlPolyfillSupport;ot?.(K,Q),(w.litHtmlVersions??=[]).push("3.3.2");const nt=globalThis;class rt extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let a=s._$litPart$;if(void 0===a){const t=i?.renderBefore??null;s._$litPart$=a=new Q(e.insertBefore(U(),t),t,void 0,i??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return G}}rt._$litElement$=!0,rt.finalized=!0,nt.litElementHydrateSupport?.({LitElement:rt});const lt=nt.litElementPolyfillSupport;lt?.({LitElement:rt}),(nt.litElementVersions??=[]).push("4.2.2");const ct=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},dt={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:$},ht=(t=dt,e,i)=>{const{kind:s,metadata:a}=i;let o=globalThis.litPropertyMetadata.get(a);if(void 0===o&&globalThis.litPropertyMetadata.set(a,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const a=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,a,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const a=this[s];e.call(this,i),this.requestUpdate(s,a,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function pt(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ut(t){return pt({...t,state:!0,attribute:!1})}const ft=["type","name","icon","controller","theme","update_section","status_section","reboot_button","top_sensors","bottom_sensors"];let gt=class extends rt{constructor(){super(...arguments),this._activeTab="general"}setConfig(t){this._config=Object.assign(Object.assign({},t),{update_section:t.update_section||{enabled:!0,entity:"",label:"Update Available",tap_action:{action:"more-info"}},status_section:t.status_section||{enabled:!0,left_entity:"",left_label:"Status",right_entity:"",right_label:"IP",tap_action:{action:"more-info"}},reboot_button:t.reboot_button||{enabled:!1,service:"button.router_reboot_press",confirmation:!0,label:"",icon:"mdi:restart"},top_sensors:t.top_sensors||[],bottom_sensors:t.bottom_sensors||[]})}render(){var t,e,i,s;if(!this.hass||!this._config)return B``;const a=this._config.update_section||{enabled:!0,entity:"",label:"Update Available",tap_action:{action:"more-info"}},o=this._config.status_section||{enabled:!0,left_entity:"",left_label:"Status",right_entity:"",right_label:"IP",tap_action:{action:"more-info"}},n=this._config.reboot_button||{enabled:!1,service:"button.router_reboot_press",confirmation:!0};return B`
      <div class="editor">
        <!-- Tabs -->
        <div class="tabs">
          <button class="tab ${"general"===this._activeTab?"active":""}" @click=${()=>this._setActiveTab("general")}>
            <ha-icon icon="mdi:cog"></ha-icon> General
          </button>
          <button class="tab ${"status"===this._activeTab?"active":""}" @click=${()=>this._setActiveTab("status")}>
            <ha-icon icon="mdi:wan"></ha-icon> Status
          </button>
          <button class="tab ${"top"===this._activeTab?"active":""}" @click=${()=>this._setActiveTab("top")}>
            <ha-icon icon="mdi:view-grid"></ha-icon> Top (Cards)
          </button>
          <button class="tab ${"bottom"===this._activeTab?"active":""}" @click=${()=>this._setActiveTab("bottom")}>
            <ha-icon icon="mdi:format-list-bulleted"></ha-icon> Bottom (List)
          </button>
        </div>

        <!-- General Tab -->
        ${"general"===this._activeTab?B`
          <div class="tab-content">
            <div class="editor-row">
              <div class="editor-item">
                <ha-textfield
                  .value=${this._config.name||""}
                  .configValue=${"name"}
                  @input=${this._valueChanged}
                  label="Card Name"
                ></ha-textfield>
              </div>
              <div class="editor-item">
                <ha-icon-picker
                  .value=${this._config.icon||"mdi:router-wireless"}
                  .configValue=${"icon"}
                  @value-changed=${this._valueChanged}
                  label="Custom Icon"
                ></ha-icon-picker>
              </div>
            </div>
            <div class="editor-row">
              <ha-formfield label="Controller Mode">
                <ha-switch
                  .checked=${!1!==this._config.controller}
                  .configValue=${"controller"}
                  @change=${this._valueChanged}
                ></ha-switch>
              </ha-formfield>
              <div class="editor-item" style="max-width: 200px;">
                <ha-select
                  .value=${this._config.theme||"default"}
                  .configValue=${"theme"}
                  @selected=${this._valueChanged}
                  @closed=${t=>t.stopPropagation()}
                  label="Theme"
                >
                  <mwc-list-item value="default">Default</mwc-list-item>
                  <mwc-list-item value="dark">Dark</mwc-list-item>
                  <mwc-list-item value="light">Light</mwc-list-item>
                </ha-select>
              </div>
            </div>
            
            <!-- Update Section in General Tab -->
            <div class="section-divider">
              <span class="section-title">Update Section</span>
            </div>
            <div class="editor-row">
              <ha-formfield label="Enable Update Section">
                <ha-switch
                  .checked=${!1!==a.enabled}
                  .configValue=${"update_section"}
                  .fieldValue=${"enabled"}
                  @change=${this._nestedValueChanged}
                ></ha-switch>
              </ha-formfield>
            </div>
            <div class="editor-row">
              <div class="editor-item">
                <ha-entity-picker
                  .hass=${this.hass}
                  .value=${a.entity||""}
                  .configValue=${"update_section"}
                  .fieldValue=${"entity"}
                  @value-changed=${this._nestedValueChanged}
                  label="Update Entity"
                  allow-custom-entity
                  include-domains='["update", "binary_sensor"]'
                ></ha-entity-picker>
              </div>
              <div class="editor-item">
                <ha-textfield
                  .value=${a.label||"Update Available"}
                  .configValue=${"update_section"}
                  .fieldValue=${"label"}
                  @input=${this._nestedValueChanged}
                  label="Label"
                ></ha-textfield>
              </div>
            </div>
            <div class="editor-row">
              <div class="editor-item">
                <ha-select
                  .value=${(null===(t=a.tap_action)||void 0===t?void 0:t.action)||"more-info"}
                  .configValue=${"update_section"}
                  .fieldValue=${"tap_action"}
                  @selected=${this._tapActionChanged}
                  @closed=${t=>t.stopPropagation()}
                  label="Tap Action"
                >
                  <mwc-list-item value="more-info">More Info</mwc-list-item>
                  <mwc-list-item value="navigate">Navigate</mwc-list-item>
                  <mwc-list-item value="url">URL</mwc-list-item>
                  <mwc-list-item value="call-service">Call Service</mwc-list-item>
                  <mwc-list-item value="none">None</mwc-list-item>
                </ha-select>
              </div>
            </div>
            
            <!-- Reboot Button Section in General Tab -->
            <div class="section-divider">
            <span class="section-title">Reboot Button</span>
            </div>
            <div class="editor-row">
            <ha-formfield label="Enable Reboot Button">
                <ha-switch
                .checked=${!1!==n.enabled}
                .configValue=${"reboot_button"}
                .fieldValue=${"enabled"}
                @change=${this._nestedValueChanged}
                ></ha-switch>
            </ha-formfield>
            </div>
            <div class="editor-row">
            <div class="editor-item">
                <ha-textfield
                .value=${n.service||"button.router_reboot_press"}
                .configValue=${"reboot_button"}
                .fieldValue=${"service"}
                @input=${this._nestedValueChanged}
                label="Service"
                ></ha-textfield>
            </div>
            <ha-formfield label="Show Confirmation">
                <ha-switch
                .checked=${!1!==n.confirmation}
                .configValue=${"reboot_button"}
                .fieldValue=${"confirmation"}
                @change=${this._nestedValueChanged}
                ></ha-switch>
            </ha-formfield>
            </div>
        `:F}

        <!-- Status Tab -->
        ${"status"===this._activeTab?B`
          <div class="tab-content">
            <div class="editor-row">
              <ha-formfield label="Enable Status Section">
                <ha-switch
                  .checked=${!1!==o.enabled}
                  .configValue=${"status_section"}
                  .fieldValue=${"enabled"}
                  @change=${this._nestedValueChanged}
                ></ha-switch>
              </ha-formfield>
            </div>
            <div class="editor-row">
              <div class="editor-item">
                <ha-entity-picker
                  .hass=${this.hass}
                  .value=${o.left_entity||""}
                  .configValue=${"status_section"}
                  .fieldValue=${"left_entity"}
                  @value-changed=${this._nestedValueChanged}
                  label="Left Entity"
                  allow-custom-entity
                ></ha-entity-picker>
              </div>
              <div class="editor-item">
                <ha-textfield
                  .value=${o.left_label||"Status"}
                  .configValue=${"status_section"}
                  .fieldValue=${"left_label"}
                  @input=${this._nestedValueChanged}
                  label="Left Label"
                ></ha-textfield>
              </div>
            </div>
            <div class="editor-row">
              <div class="editor-item">
                <ha-entity-picker
                  .hass=${this.hass}
                  .value=${o.right_entity||""}
                  .configValue=${"status_section"}
                  .fieldValue=${"right_entity"}
                  @value-changed=${this._nestedValueChanged}
                  label="Right Entity"
                  allow-custom-entity
                ></ha-entity-picker>
              </div>
              <div class="editor-item">
                <ha-textfield
                  .value=${o.right_label||"IP"}
                  .configValue=${"status_section"}
                  .fieldValue=${"right_label"}
                  @input=${this._nestedValueChanged}
                  label="Right Label"
                ></ha-textfield>
              </div>
            </div>
            <div class="editor-row">
              <div class="editor-item">
                <ha-select
                  .value=${(null===(e=o.tap_action)||void 0===e?void 0:e.action)||"more-info"}
                  .configValue=${"status_section"}
                  .fieldValue=${"tap_action"}
                  @selected=${this._tapActionChanged}
                  @closed=${t=>t.stopPropagation()}
                  label="Tap Action"
                >
                  <mwc-list-item value="more-info">More Info</mwc-list-item>
                  <mwc-list-item value="navigate">Navigate</mwc-list-item>
                  <mwc-list-item value="url">URL</mwc-list-item>
                  <mwc-list-item value="call-service">Call Service</mwc-list-item>
                  <mwc-list-item value="none">None</mwc-list-item>
                </ha-select>
              </div>
            </div>
          </div>
        `:F}

        <!-- Top Sensors Tab -->
        ${"top"===this._activeTab?B`
          <div class="tab-content">
            <div class="sensors-header">
              <span>Top Section (Card View)</span>
              <ha-button @click=${()=>this._addSensor("top_sensors")}>
                <ha-icon icon="mdi:plus"></ha-icon> Add Sensor
              </ha-button>
            </div>
            ${(null===(i=this._config.top_sensors)||void 0===i?void 0:i.map((t,e)=>{var i;return B`
              <div class="sensor-row">
                <div class="sensor-item">
                  <ha-entity-picker
                    .hass=${this.hass}
                    .value=${t.entity||""}
                    .configValue=${"top_sensors"}
                    .sensorIndex=${e}
                    .sensorField=${"entity"}
                    @value-changed=${this._sensorValueChanged}
                    label="Entity"
                    allow-custom-entity
                  ></ha-entity-picker>
                </div>
                <div class="sensor-item">
                  <ha-textfield
                    .value=${t.name||""}
                    .configValue=${"top_sensors"}
                    .sensorIndex=${e}
                    .sensorField=${"name"}
                    @input=${this._sensorValueChanged}
                    label="Name"
                  ></ha-textfield>
                </div>
                <div class="sensor-item">
                  <ha-textfield
                    .value=${t.unit||""}
                    .configValue=${"top_sensors"}
                    .sensorIndex=${e}
                    .sensorField=${"unit"}
                    @input=${this._sensorValueChanged}
                    label="Unit"
                  ></ha-textfield>
                </div>
                <div class="sensor-item">
                    <ha-select
                    .value=${t.display_type||"number"}
                    .configValue=${"top_sensors"}
                    .sensorIndex=${e}
                    .sensorField=${"display_type"}
                    @selected=${this._sensorValueChanged}
                    @closed=${t=>t.stopPropagation()}
                    label="Display Type"
                    >
                    <mwc-list-item value="number">Number</mwc-list-item>
                    <mwc-list-item value="bar">Progress Bar</mwc-list-item>
                    <mwc-list-item value="graph">Graph (HA Sensor Style)</mwc-list-item>
                    <mwc-list-item value="badge">Badge</mwc-list-item>
                    </ha-select>
                </div>
                <div class="sensor-item">
                  <ha-select
                    .value=${(null===(i=t.tap_action)||void 0===i?void 0:i.action)||"more-info"}
                    .configValue=${"top_sensors"}
                    .sensorIndex=${e}
                    .sensorField=${"tap_action"}
                    @selected=${this._sensorTapActionChanged}
                    @closed=${t=>t.stopPropagation()}
                    label="Tap Action"
                  >
                    <mwc-list-item value="more-info">More Info</mwc-list-item>
                    <mwc-list-item value="navigate">Navigate</mwc-list-item>
                    <mwc-list-item value="url">URL</mwc-list-item>
                    <mwc-list-item value="call-service">Call Service</mwc-list-item>
                    <mwc-list-item value="none">None</mwc-list-item>
                  </ha-select>
                </div>
                <ha-icon-button
                  icon="mdi:delete"
                  @click=${()=>this._removeSensor("top_sensors",e)}
                ></ha-icon-button>
              </div>
            `}))||B`<div class="empty-state">No sensors configured. Click "Add Sensor" to start.</div>`}
          </div>
        `:F}

        <!-- Bottom Sensors Tab -->
        ${"bottom"===this._activeTab?B`
          <div class="tab-content">
            <div class="sensors-header">
              <span>Bottom Section (List View - 2 Columns)</span>
              <ha-button @click=${()=>this._addSensor("bottom_sensors")}>
                <ha-icon icon="mdi:plus"></ha-icon> Add Sensor
              </ha-button>
            </div>
            ${(null===(s=this._config.bottom_sensors)||void 0===s?void 0:s.map((t,e)=>{var i;return B`
              <div class="sensor-row">
                <div class="sensor-item">
                  <ha-entity-picker
                    .hass=${this.hass}
                    .value=${t.entity||""}
                    .configValue=${"bottom_sensors"}
                    .sensorIndex=${e}
                    .sensorField=${"entity"}
                    @value-changed=${this._sensorValueChanged}
                    label="Entity"
                    allow-custom-entity
                  ></ha-entity-picker>
                </div>
                <div class="sensor-item">
                  <ha-textfield
                    .value=${t.name||""}
                    .configValue=${"bottom_sensors"}
                    .sensorIndex=${e}
                    .sensorField=${"name"}
                    @input=${this._sensorValueChanged}
                    label="Name"
                  ></ha-textfield>
                </div>
                <div class="sensor-item">
                  <ha-textfield
                    .value=${t.unit||""}
                    .configValue=${"bottom_sensors"}
                    .sensorIndex=${e}
                    .sensorField=${"unit"}
                    @input=${this._sensorValueChanged}
                    label="Unit"
                  ></ha-textfield>
                </div>
                <div class="sensor-item">
                  <ha-select
                    .value=${(null===(i=t.tap_action)||void 0===i?void 0:i.action)||"more-info"}
                    .configValue=${"bottom_sensors"}
                    .sensorIndex=${e}
                    .sensorField=${"tap_action"}
                    @selected=${this._sensorTapActionChanged}
                    @closed=${t=>t.stopPropagation()}
                    label="Tap Action"
                  >
                    <mwc-list-item value="more-info">More Info</mwc-list-item>
                    <mwc-list-item value="navigate">Navigate</mwc-list-item>
                    <mwc-list-item value="url">URL</mwc-list-item>
                    <mwc-list-item value="call-service">Call Service</mwc-list-item>
                    <mwc-list-item value="none">None</mwc-list-item>
                  </ha-select>
                </div>
                <ha-icon-button
                  icon="mdi:delete"
                  @click=${()=>this._removeSensor("bottom_sensors",e)}
                ></ha-icon-button>
              </div>
            `}))||B`<div class="empty-state">No sensors configured. Click "Add Sensor" to start.</div>`}
          </div>
        `:F}
      </div>
    `}_setActiveTab(t){this._activeTab=t}_valueChanged(t){const e=t.target,i=e.configValue,s=void 0!==e.checked?e.checked:e.value;if(!this._config||!i)return;if(!ft.includes(i))return;const a=Object.assign({},this._config);""===s||void 0===s?delete a[i]:a[i]=s,this._config=a,this._dispatchConfigChange(a)}_nestedValueChanged(t){const e=t.target,i=e.configValue,s=e.fieldValue,a=void 0!==e.checked?e.checked:e.value;if(!this._config||!i||!s)return;const o=Object.assign({},this._config),n=Object.assign({},o[i]||{});""===a||void 0===a?delete n[s]:n[s]=a,o[i]=n,this._config=o,this._dispatchConfigChange(o)}_tapActionChanged(t){const e=t.target,i=e.configValue,s=e.fieldValue,a=e.value;if(!this._config||!i||!s)return;const o=Object.assign({},this._config),n=Object.assign({},o[i]||{});"none"===a?delete n[s]:n[s]={action:a},o[i]=n,this._config=o,this._dispatchConfigChange(o)}_sensorValueChanged(t){const e=t.target,i=e.configValue,s=e.sensorIndex,a=e.sensorField,o=void 0!==e.checked?e.checked:e.value;if(!this._config||!i||void 0===s||!a)return;const n=Object.assign({},this._config),r=[...n[i]||[]];r[s]||(r[s]={}),""===o||void 0===o?delete r[s][a]:r[s][a]=o,n[i]=r,this._config=n,this._dispatchConfigChange(n)}_sensorTapActionChanged(t){const e=t.target,i=e.configValue,s=e.sensorIndex,a=e.sensorField,o=e.value;if(!this._config||!i||void 0===s||!a)return;const n=Object.assign({},this._config),r=[...n[i]||[]];r[s]||(r[s]={}),"none"===o?delete r[s][a]:r[s][a]={action:o},n[i]=r,this._config=n,this._dispatchConfigChange(n)}_addSensor(t){const e=Object.assign({},this._config),i=[...e[t]||[]];i.push({entity:"",name:"New Sensor",display_type:"top_sensors"===t?"bar":"number",tap_action:{action:"more-info"}}),e[t]=i,this._config=e,this._dispatchConfigChange(e)}_removeSensor(t,e){const i=Object.assign({},this._config),s=[...i[t]||[]];s.splice(e,1),i[t]=s,this._config=i,this._dispatchConfigChange(i)}_dispatchConfigChange(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}static get styles(){return n`
      .editor {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .tabs {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
        padding-bottom: 8px;
      }

      .tab {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 16px;
        border: none;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 8px;
        cursor: pointer;
        font-size: 13px;
        font-weight: 500;
        color: var(--primary-text-color, #333);
        transition: all 0.2s;
      }

      .tab:hover {
        background: var(--primary-color, #03a9f4);
        color: white;
      }

      .tab.active {
        background: var(--primary-color, #03a9f4);
        color: white;
      }

      .tab ha-icon {
        font-size: 16px;
      }

      .tab-content {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .editor-row {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        align-items: center;
      }

      .editor-item {
        flex: 1;
        min-width: 150px;
      }

      .section-divider {
        margin: 16px 0 8px 0;
        padding-top: 16px;
        border-top: 1px solid var(--divider-color, #e0e0e0);
      }

      .section-title {
        font-size: 14px;
        font-weight: 600;
        color: var(--primary-text-color, #333);
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
      }

      .info-box ha-icon {
        color: var(--primary-color, #03a9f4);
      }

      .sensors-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
        font-weight: 600;
      }

      .sensor-row {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        align-items: flex-end;
        padding: 12px;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 8px;
        margin-bottom: 8px;
      }

      .sensor-item {
        flex: 1;
        min-width: 120px;
      }

      .empty-state {
        padding: 24px;
        text-align: center;
        color: var(--secondary-text-color, #666);
        font-style: italic;
      }

      ha-textfield,
      ha-select,
      ha-entity-picker,
      ha-icon-picker {
        width: 100%;
      }

      ha-formfield {
        white-space: nowrap;
      }
    `}};t([pt()],gt.prototype,"hass",void 0),t([ut()],gt.prototype,"_config",void 0),t([ut()],gt.prototype,"_activeTab",void 0),gt=t([ct("router-card-editor")],gt);let mt=class extends rt{constructor(){super(...arguments),this.graphData={}}static async getConfigElement(){return document.createElement("router-card-editor")}static getStubConfig(){return{type:"custom:router-card",name:"Router",icon:"mdi:router-wireless",controller:!0,theme:"default",update_section:{enabled:!0,entity:"update.router_firmware",label:"Update Available",tap_action:{action:"more-info"}},status_section:{enabled:!0,left_entity:"sensor.router_wan_status",left_label:"WAN Status",right_entity:"sensor.router_wan_ip",right_label:"WAN IP",tap_action:{action:"more-info"}},reboot_button:{enabled:!1,entity:"button.router_reboot",confirmation:!0},top_sensors:[{entity:"sensor.router_cpu_load",name:"CPU Load",unit:"%",display_type:"bar",tap_action:{action:"more-info"}},{entity:"sensor.router_memory_usage",name:"Memory",unit:"%",display_type:"graph",tap_action:{action:"more-info"}},{entity:"sensor.router_uptime",name:"Uptime",display_type:"number",tap_action:{action:"more-info"}},{entity:"sensor.router_connected_clients",name:"Clients",icon:"mdi:devices",display_type:"badge",tap_action:{action:"more-info"}}],bottom_sensors:[{entity:"sensor.router_wifi_2g_temperature",name:"WiFi 2.4GHz",unit:"°C",display_type:"number",tap_action:{action:"more-info"}},{entity:"sensor.router_wifi_5g_temperature",name:"WiFi 5GHz",unit:"°C",display_type:"number",tap_action:{action:"more-info"}},{entity:"sensor.router_wan_rx",name:"WAN RX",unit:"GB",display_type:"number",tap_action:{action:"more-info"}},{entity:"sensor.router_wan_tx",name:"WAN TX",unit:"GB",display_type:"number",tap_action:{action:"more-info"}}]}}setConfig(t){this.config=Object.assign({},t),this._fetchGraphData()}shouldUpdate(t){if(t.has("hass")){const e=t.get("hass");if(e&&this.config.top_sensors){const t=this.config.top_sensors.filter(t=>"graph"===t.display_type);for(const i of t){const t=e.states[i.entity],s=this.hass.states[i.entity];if(t&&s&&t.state!==s.state){this._fetchGraphData();break}}}}return!0}async _fetchGraphData(){if(!this.config.top_sensors||!this.hass)return;const t=this.config.top_sensors.filter(t=>"graph"===t.display_type);if(0===t.length)return;const e=new Date,i=new Date(e.getTime()-36e5),s={};for(const a of t)try{const t=await this.hass.callApi("GET",`history/period/${i.toISOString()}?filter_entity_id=${a.entity}&end_time=${e.toISOString()}`);t&&t[0]&&(s[a.entity]=t[0])}catch(t){}this.graphData=Object.assign(Object.assign({},this.graphData),s)}_generateGraphPath(t,e=100){const i=this.graphData[t];if(!i||i.length<2)return{path:"M 0 50 L 100 50",areaPath:"M 0 50 L 100 50 L 100 50 L 0 50 Z",hasData:!1};const s=[],a=Math.min(...i.map(t=>parseFloat(t.state)||0)),o=Math.max(e-a,1);i.forEach((t,e)=>{const n=e/(i.length-1)*100,r=50-50*(((parseFloat(t.state)||0)-a)/o)*.9-2;s.push([n,r])});let n=`M ${s[0][0]} ${s[0][1]}`;for(let t=1;t<s.length;t++){const e=s[t-1],i=s[t],a=e[0]+(i[0]-e[0])/3,o=e[0]+2*(i[0]-e[0])/3;n+=` C ${a} ${e[1]}, ${o} ${i[1]}, ${i[0]} ${i[1]}`}return{path:n,areaPath:`${n} L 100 50 L 0 50 Z`,hasData:!0}}_getSensorState(t){var e;if(!t||!this.hass.states[t])return null;const i=this.hass.states[t];return{state:i.state,attributes:i.attributes,unit:null===(e=i.attributes)||void 0===e?void 0:e.unit_of_measurement}}_checkUpdateAvailable(t){if(!t||!this.hass.states[t])return!1;const e=this.hass.states[t],i=t.split(".")[0];return"update"===i?"on"===e.state||"available"===e.state:"binary_sensor"===i?"on"===e.state:"on"===e.state||"true"===e.state||"1"===e.state}_formatValue(t,e,i,s,a){const o=parseFloat(t);let n,r=t;if(isNaN(o))r=`${t}${e||""}`;else{if("GB"===e||"TB"===e)r=`${o.toFixed(2)} ${e}`;else if("%"===e||"°C"===e)r=`${o.toFixed(1)}${e}`,"bar"===i&&"%"===e&&(n=Math.min(100,Math.max(0,o)));else if(o>86400&&!e){const t=Math.floor(o/86400),e=Math.floor(o%86400/3600),i=Math.floor(o%3600/60),s=[];t>0&&s.push(`${t}д`),e>0&&s.push(`${e}ч`),(i>0||0===s.length)&&s.push(`${i}м`),r=s.join(" ")}else r=`${o}${e||""}`;"bar"===i&&void 0!==s&&void 0!==a&&(n=(o-s)/(a-s)*100,n=Math.min(100,Math.max(0,n)))}return{display:r,barValue:n}}_getStatusColor(t){const e=t.toLowerCase();return e.includes("connected")||e.includes("up")||"on"===e||"true"===e||"online"===e?"#27ae60":e.includes("disconnected")||e.includes("down")||"off"===e||"false"===e||"offline"===e?"#e74c3c":"#f39c12"}_getLoadColor(t){return t<50?"#27ae60":t<80?"#f39c12":"#e74c3c"}_shouldShowStatusSection(){const t=this.config.status_section;return!(!t||!t.enabled)}_handleReboot(){const t=this.config.reboot_button;if(!t||!t.enabled||!t.entity)return;if(!1!==t.confirmation){if(!confirm("Are you sure you want to reboot the router?"))return}const e=t.entity.split(".")[0];"button"===e?this.hass.callService("button","press",{entity_id:t.entity}):"switch"===e?this.hass.callService("switch","turn_on",{entity_id:t.entity}):this.hass.callService("homeassistant","turn_on",{entity_id:t.entity})}_handleTap(t,e){if(t&&"none"!==t.action)switch(t.action){case"more-info":e&&this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e}}));break;case"navigate":t.navigation_path&&(history.pushState(null,"",t.navigation_path),this.dispatchEvent(new CustomEvent("location-changed",{bubbles:!0,composed:!0})));break;case"url":t.url_path&&window.open(t.url_path,"_blank");break;case"call-service":if(t.service){const[e,i]=t.service.split(".");this.hass.callService(e,i,t.service_data||{})}break;case"toggle":e&&this.hass.callService("homeassistant","toggle",{entity_id:e})}else e&&this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e}}))}render(){if(!this.config||!this.hass)return B``;const t=this.config.icon||(this.config.controller?"mdi:router-wireless":"mdi:access-point"),e=this._shouldShowStatusSection(),i=this.config.status_section,s=this.config.reboot_button,a=this.config.update_section,o=(null==i?void 0:i.left_entity)?this._getSensorState(i.left_entity):null,n=(null==i?void 0:i.right_entity)?this._getSensorState(i.right_entity):null,r=null!==o,l=null!==n,c=(null==s?void 0:s.enabled)&&s.entity,d=(null==a?void 0:a.enabled)&&a.entity&&this._checkUpdateAvailable(a.entity);return B`
      <ha-card class="router-card ${this.config.theme||"default"}">
        <div class="header">
          <div class="header-left">
            <ha-icon icon="${t}"></ha-icon>
            <span class="title">${this.config.name||"Router"}</span>
            ${this.config.controller?B`<span class="badge controller">Controller</span>`:B`<span class="badge repeater">Repeater</span>`}
          </div>
          <div class="header-right">
            ${c?B`<span class="badge reboot-badge" @click=${this._handleReboot}>
                  Reboot
                </span>`:F}
          </div>
        </div>

        ${d?B`<div class="update-section ${(null==a?void 0:a.tap_action)&&"none"!==a.tap_action.action?"clickable":""}" 
                @click=${()=>this._handleTap(null==a?void 0:a.tap_action,null==a?void 0:a.entity)}>
              <ha-icon icon="mdi:arrow-up-circle"></ha-icon>
              <span>${(null==a?void 0:a.label)||"Update Available"}</span>
            </div>`:F}

        ${e&&(r||l)?B`<div class="status-section ${(null==i?void 0:i.tap_action)&&"none"!==i.tap_action.action?"clickable":""}" 
                @click=${()=>this._handleTap(null==i?void 0:i.tap_action,null==i?void 0:i.left_entity)}>
              <div class="status-row">
                ${r?B`<div class="status-item ${l?"status-left":""}">
                      <span class="status-label">${(null==i?void 0:i.left_label)||"Status"}</span>
                      <span class="status-value" style="color: ${this._getStatusColor(o.state)}">
                        ● ${o.state}
                      </span>
                    </div>`:F}
                ${l?B`<div class="status-item ${r?"status-right":""}">
                      <span class="status-label">${(null==i?void 0:i.right_label)||"IP"}</span>
                      <span class="status-value">${n.state}</span>
                    </div>`:F}
              </div>
            </div>`:F}

        <div class="content">
          ${this.config.top_sensors&&this.config.top_sensors.length>0?B`<div class="top-section">
                <div class="cards-grid">
                  ${this.config.top_sensors.map(t=>{const e=this._getSensorState(t.entity);if(!e)return F;const i=this._formatValue(e.state,t.unit||e.unit,t.display_type,t.min,t.max),s=void 0!==i.barValue?this._getLoadColor(i.barValue):void 0,a=t.display_type||"number",o=this._generateGraphPath(t.entity,t.max||100),n="graph"!==a,r=t.tap_action&&"none"!==t.tap_action.action;return B`
                      <div class="card-item display-type-${a} ${r?"clickable":""}" 
                           @click=${()=>this._handleTap(t.tap_action,t.entity)}>
                        <div class="card-header">
                          ${t.icon?B`<ha-icon icon="${t.icon}"></ha-icon>`:F}
                          <span class="card-name">${t.name}</span>
                        </div>
                        ${n?B`<div class="card-value" 
                                style="${s&&"bar"===a?`color: ${s}`:""}">
                              ${"badge"===a?B`<span class="badge-value">${i.display}</span>`:i.display}
                            </div>`:F}
                        ${"bar"===a&&void 0!==i.barValue?B`<div class="card-bar">
                              <div class="card-bar-fill" style="width: ${i.barValue}%; background: ${s}"></div>
                            </div>`:F}
                        ${"graph"===a?B`<div class="card-graph-wrapper">
                              <div class="card-graph-value">${i.display}</div>
                              <div class="card-graph">
                                <svg class="graph-svg" viewBox="0 0 100 50" preserveAspectRatio="none">
                                  <defs>
                                    <linearGradient id="graphGradient-${t.entity}" x1="0%" y1="0%" x2="0%" y2="100%">
                                      <stop offset="0%" style="stop-color:var(--accent-color);stop-opacity:0.3" />
                                      <stop offset="100%" style="stop-color:var(--accent-color);stop-opacity:0" />
                                    </linearGradient>
                                  </defs>
                                  ${o.hasData?B`<path class="graph-area" 
                                                d="${o.areaPath}" 
                                                fill="url(#graphGradient-${t.entity})" />
                                          <path class="graph-line" 
                                                d="${o.path}" 
                                                fill="none" 
                                                stroke="var(--accent-color)" 
                                                stroke-width="2" 
                                                stroke-linecap="round" 
                                                stroke-linejoin="round" />`:B`<path class="graph-line" 
                                                d="M 0 25 L 100 25" 
                                                fill="none" 
                                                stroke="var(--accent-color)" 
                                                stroke-width="1.5" 
                                                stroke-dasharray="4,2" />`}
                                </svg>
                              </div>
                            </div>`:F}
                      </div>
                    `})}
                </div>
              </div>`:F}

          ${this.config.bottom_sensors&&this.config.bottom_sensors.length>0?B`<div class="bottom-section">
                <div class="list-grid">
                  ${this.config.bottom_sensors.map(t=>{const e=this._getSensorState(t.entity);if(!e)return F;const i=this._formatValue(e.state,t.unit||e.unit,t.display_type),s=t.tap_action&&"none"!==t.tap_action.action;return B`
                      <div class="list-item ${s?"clickable":""}" 
                           @click=${()=>this._handleTap(t.tap_action,t.entity)}>
                        <div class="list-left">
                          ${t.icon?B`<ha-icon icon="${t.icon}"></ha-icon>`:F}
                          <span class="list-name">${t.name}</span>
                        </div>
                        <span class="list-value">${i.display}</span>
                      </div>
                    `})}
                </div>
              </div>`:F}
        </div>
      </ha-card>
    `}static get styles(){return n`
      :host {
        display: block;
      }

      ha-card {
        padding: 16px;
        background: var(--card-background-color, #ffffff);
        border-radius: 12px;
        box-shadow: var(--ha-card-box-shadow, 0 2px 4px rgba(0,0,0,0.1));
      }

      .router-card.dark {
        background: #1a1a2e;
        color: #ffffff;
      }

      .router-card.light {
        background: #ffffff;
        color: #333333;
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
        font-size: 28px;
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
        white-space: nowrap;
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
      }

      .badge.reboot-badge:hover {
        background: #c0392b;
        transform: scale(1.05);
      }

      .header-right {
        display: flex;
        align-items: center;
      }

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
      }

      .update-section.clickable {
        cursor: pointer;
        transition: all 0.2s;
      }

      .update-section.clickable:hover {
        background: rgba(243, 156, 28, 0.3);
        transform: scale(1.02);
      }

      .dark .update-section {
        background: rgba(243, 156, 28, 0.15);
      }

      .update-section ha-icon {
        font-size: 18px;
      }

      .status-section {
        margin-bottom: 16px;
        padding: 12px;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 8px;
      }

      .status-section.clickable {
        cursor: pointer;
        transition: all 0.2s;
      }

      .status-section.clickable:hover {
        background: var(--primary-color, #03a9f4);
      }

      .status-section.clickable:hover .status-label,
      .status-section.clickable:hover .status-value {
        color: white;
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
      }

      .dark .status-label {
        color: #aaa;
      }

      .status-value {
        font-size: 16px;
        font-weight: 600;
      }

      .content {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .top-section {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .cards-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 12px;
      }

      .card-item {
        background: var(--secondary-background-color, #f5f5f5);
        padding: 14px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .card-item.display-type-graph {
        padding: 0;
        overflow: hidden;
      }

      .card-item.clickable {
        cursor: pointer;
        transition: all 0.2s;
      }

      .card-item.clickable:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.15);
      }

      .dark .card-item {
        background: #16213e;
      }

      .card-header {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .card-item.display-type-graph .card-header {
        padding: 8px 12px 0 12px;
      }

      .card-header ha-icon {
        font-size: 16px;
        color: var(--secondary-text-color, #666);
      }

      .dark .card-header ha-icon {
        color: #aaa;
      }

      .card-name {
        font-size: 12px;
        color: var(--secondary-text-color, #666);
        font-weight: 500;
      }

      .dark .card-name {
        color: #aaa;
      }

      .card-value {
        font-size: 22px;
        font-weight: 600;
      }

      .badge-value {
        background: var(--primary-color, #03a9f4);
        color: white;
        padding: 4px 12px;
        border-radius: 16px;
        font-size: 18px;
      }

      .card-bar {
        height: 4px;
        background: #e0e0e0;
        border-radius: 2px;
        overflow: hidden;
        margin-top: 4px;
      }

      .dark .card-bar {
        background: #2a2a4a;
      }

      .card-bar-fill {
        height: 100%;
        border-radius: 2px;
        transition: width 0.3s ease;
      }

      .card-graph-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 0;
      }

      .card-graph-value {
        font-size: 18px;
        font-weight: 500;
        color: var(--primary-text-color, #333);
        text-align: left;
        line-height: 1;
        padding: 0 12px 6px 12px;
      }

      .dark .card-graph-value {
        color: #ffffff;
      }

      .card-graph {
        height: 40px;
        width: 100%;
        padding: 0;
        margin: 0;
        display: block;
        line-height: 0;
      }

      .card-item.display-type-graph {
        padding-bottom: 8px;
      }

      .graph-svg {
        width: 100%;
        height: 100%;
        display: block;
      }

      .graph-area {
        transition: all 0.3s ease;
      }

      .graph-line {
        transition: all 0.3s ease;
        filter: drop-shadow(0 1px 2px rgba(0,0,0,0.2));
      }

      .bottom-section {
        display: flex;
        flex-direction: column;
        gap: 8px;
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
      }

      .list-item.clickable {
        cursor: pointer;
        transition: all 0.2s;
      }

      .list-item.clickable:hover {
        background: var(--primary-color, #03a9f4);
      }

      .list-item.clickable:hover .list-name,
      .list-item.clickable:hover .list-value {
        color: white;
      }

      .dark .list-item {
        background: #16213e;
      }

      .list-left {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .list-left ha-icon {
        font-size: 16px;
        color: var(--secondary-text-color, #666);
      }

      .dark .list-left ha-icon {
        color: #aaa;
      }

      .list-name {
        font-size: 13px;
        color: var(--primary-text-color, #333);
        font-weight: 500;
      }

      .dark .list-name {
        color: #fff;
      }

      .list-value {
        font-size: 14px;
        font-weight: 600;
        color: var(--primary-color, #03a9f4);
      }
    `}getCardSize(){return 4}};t([pt()],mt.prototype,"hass",void 0),t([ut()],mt.prototype,"config",void 0),t([ut()],mt.prototype,"graphData",void 0),mt=t([ct("router-card")],mt);export{mt as RouterCard};
