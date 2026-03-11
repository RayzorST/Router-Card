function t(t,e,s,i){var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new WeakMap;let n=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&o.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new n(s,t,i)},a=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,f=globalThis,g=f.trustedTypes,_=g?g.emptyScript:"",m=f.reactiveElementPolyfillSupport,$=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},b=(t,e)=>!c(t,e),y={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&l(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:o}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const n=i?.call(this);o?.call(this,e),this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(s)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of i){const i=document.createElement("style"),o=e.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=s.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const o=(void 0!==s.converter?.toAttribute?s.converter:v).toAttribute(e,s.type);this._$Em=t,null==o?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=i;const n=o.fromAttribute(e,t.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(t,e,s,i=!1,o){if(void 0!==t){const n=this.constructor;if(!1===i&&(o=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??b)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==o||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[$("elementProperties")]=new Map,x[$("finalized")]=new Map,m?.({ReactiveElement:x}),(f.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,A=t=>t,S=w.trustedTypes,C=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,T="?"+k,P=`<${T}>`,N=document,O=()=>N.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,V=Array.isArray,M="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,z=/>/g,I=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,L=/"/g,B=/^(?:script|style|textarea|title)$/i,D=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),W=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),q=new WeakMap,G=N.createTreeWalker(N,129);function J(t,e){if(!V(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(e):e}const K=(t,e)=>{const s=t.length-1,i=[];let o,n=2===e?"<svg>":3===e?"<math>":"",r=H;for(let e=0;e<s;e++){const s=t[e];let a,c,l=-1,d=0;for(;d<s.length&&(r.lastIndex=d,c=r.exec(s),null!==c);)d=r.lastIndex,r===H?"!--"===c[1]?r=R:void 0!==c[1]?r=z:void 0!==c[2]?(B.test(c[2])&&(o=RegExp("</"+c[2],"g")),r=I):void 0!==c[3]&&(r=I):r===I?">"===c[0]?(r=o??H,l=-1):void 0===c[1]?l=-2:(l=r.lastIndex-c[2].length,a=c[1],r=void 0===c[3]?I:'"'===c[3]?L:j):r===L||r===j?r=I:r===R||r===z?r=H:(r=I,o=void 0);const h=r===I&&t[e+1].startsWith("/>")?" ":"";n+=r===H?s+P:l>=0?(i.push(a),s.slice(0,l)+E+s.slice(l)+k+h):s+k+(-2===l?e:h)}return[J(t,n+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class X{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,n=0;const r=t.length-1,a=this.parts,[c,l]=K(t,e);if(this.el=X.createElement(c,s),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=G.nextNode())&&a.length<r;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(E)){const e=l[n++],s=i.getAttribute(t).split(k),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:r[2],strings:s,ctor:"."===r[1]?et:"?"===r[1]?st:"@"===r[1]?it:tt}),i.removeAttribute(t)}else t.startsWith(k)&&(a.push({type:6,index:o}),i.removeAttribute(t));if(B.test(i.tagName)){const t=i.textContent.split(k),e=t.length-1;if(e>0){i.textContent=S?S.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],O()),G.nextNode(),a.push({type:2,index:++o});i.append(t[e],O())}}}else if(8===i.nodeType)if(i.data===T)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=i.data.indexOf(k,t+1));)a.push({type:7,index:o}),t+=k.length-1}o++}}static createElement(t,e){const s=N.createElement("template");return s.innerHTML=t,s}}function Z(t,e,s=t,i){if(e===W)return e;let o=void 0!==i?s._$Co?.[i]:s._$Cl;const n=U(e)?void 0:e._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(t),o._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=o:s._$Cl=o),void 0!==o&&(e=Z(t,o._$AS(t,e.values),o,i)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??N).importNode(e,!0);G.currentNode=i;let o=G.nextNode(),n=0,r=0,a=s[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new Y(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new ot(o,this,t)),this._$AV.push(e),a=s[++r]}n!==a?.index&&(o=G.nextNode(),n++)}return G.currentNode=N,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),U(t)?t===F||null==t||""===t?(this._$AH!==F&&this._$AR(),this._$AH=F):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>V(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==F&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(N.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=X.createElement(J(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new Q(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new X(t)),e}k(t){V(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new Y(this.O(O()),this.O(O()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=F,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=F}_$AI(t,e=this,s,i){const o=this.strings;let n=!1;if(void 0===o)t=Z(this,t,e,0),n=!U(t)||t!==this._$AH&&t!==W,n&&(this._$AH=t);else{const i=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=Z(this,i[s+r],e,r),a===W&&(a=this._$AH[r]),n||=!U(a)||a!==this._$AH[r],a===F?t=F:t!==F&&(t+=(a??"")+o[r+1]),this._$AH[r]=a}n&&!i&&this.j(t)}j(t){t===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===F?void 0:t}}class st extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==F)}}class it extends tt{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??F)===W)return;const s=this._$AH,i=t===F&&s!==F||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==F&&(s===F||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const nt=w.litHtmlPolyfillSupport;nt?.(X,Y),(w.litHtmlVersions??=[]).push("3.3.2");const rt=globalThis;class at extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let o=i._$litPart$;if(void 0===o){const t=s?.renderBefore??null;i._$litPart$=o=new Y(e.insertBefore(O(),t),t,void 0,s??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}at._$litElement$=!0,at.finalized=!0,rt.litElementHydrateSupport?.({LitElement:at});const ct=rt.litElementPolyfillSupport;ct?.({LitElement:at}),(rt.litElementVersions??=[]).push("4.2.2");const lt=t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},dt={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:b},ht=(t=dt,e,s)=>{const{kind:i,metadata:o}=s;let n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),n.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const o=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,o,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const o=this[i];e.call(this,s),this.requestUpdate(i,o,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};function pt(t){return(e,s)=>"object"==typeof s?ht(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}function ut(t){return pt({...t,state:!0,attribute:!1})}const ft=["type","name","icon","controller","theme","wan_status_entity","wan_ip_entity","top_sensors","bottom_sensors"];let gt=class extends at{constructor(){super(...arguments),this._activeTab="general"}setConfig(t){this._config=t}render(){var t,e;return this.hass&&this._config?D`
      <div class="editor">
        <!-- Tabs -->
        <div class="tabs">
          <button class="tab ${"general"===this._activeTab?"active":""}" @click=${()=>this._activeTab="general"}>
            <ha-icon icon="mdi:cog"></ha-icon> General
          </button>
          <button class="tab ${"wan"===this._activeTab?"active":""}" @click=${()=>this._activeTab="wan"}>
            <ha-icon icon="mdi:wan"></ha-icon> WAN
          </button>
          <button class="tab ${"top"===this._activeTab?"active":""}" @click=${()=>this._activeTab="top"}>
            <ha-icon icon="mdi:view-grid"></ha-icon> Top (Cards)
          </button>
          <button class="tab ${"bottom"===this._activeTab?"active":""}" @click=${()=>this._activeTab="bottom"}>
            <ha-icon icon="mdi:format-list-bulleted"></ha-icon> Bottom (List)
          </button>
        </div>

        <!-- General Tab -->
        ${"general"===this._activeTab?D`
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
          </div>
        `:null}

        <!-- WAN Tab -->
        ${"wan"===this._activeTab?D`
          <div class="tab-content">
            <div class="editor-row">
              <div class="editor-item">
                <ha-entity-picker
                  .hass=${this.hass}
                  .value=${this._config.wan_status_entity||""}
                  .configValue=${"wan_status_entity"}
                  @value-changed=${this._valueChanged}
                  label="WAN Status Entity"
                  allow-custom-entity
                ></ha-entity-picker>
              </div>
              <div class="editor-item">
                <ha-entity-picker
                  .hass=${this.hass}
                  .value=${this._config.wan_ip_entity||""}
                  .configValue=${"wan_ip_entity"}
                  @value-changed=${this._valueChanged}
                  label="WAN IP Entity"
                  allow-custom-entity
                ></ha-entity-picker>
              </div>
            </div>
            <div class="info-box">
              <ha-icon icon="mdi:information"></ha-icon>
              <span>If both entities exist, status shows on left and IP on right. If only one exists, it shows on left.</span>
            </div>
          </div>
        `:null}

        <!-- Top Sensors Tab -->
        ${"top"===this._activeTab?D`
          <div class="tab-content">
            <div class="sensors-header">
              <span>Top Section (Card View)</span>
              <ha-button @click=${()=>this._addSensor("top_sensors")}>
                <ha-icon icon="mdi:plus"></ha-icon> Add Sensor
              </ha-button>
            </div>
            ${(null===(t=this._config.top_sensors)||void 0===t?void 0:t.map((t,e)=>D`
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
                  <ha-icon-picker
                    .value=${t.icon||""}
                    .configValue=${"top_sensors"}
                    .sensorIndex=${e}
                    .sensorField=${"icon"}
                    @value-changed=${this._sensorValueChanged}
                    label="Icon"
                  ></ha-icon-picker>
                </div>
                <div class="sensor-item checkbox">
                  <ha-formfield label="Bar">
                    <ha-switch
                      .checked=${!0===t.show_bar}
                      .configValue=${"top_sensors"}
                      .sensorIndex=${e}
                      .sensorField=${"show_bar"}
                      @change=${this._sensorValueChanged}
                    ></ha-switch>
                  </ha-formfield>
                </div>
                <ha-icon-button
                  icon="mdi:delete"
                  @click=${()=>this._removeSensor("top_sensors",e)}
                ></ha-icon-button>
              </div>
            `))||D`<div class="empty-state">No sensors configured. Click "Add Sensor" to start.</div>`}
          </div>
        `:null}

        <!-- Bottom Sensors Tab -->
        ${"bottom"===this._activeTab?D`
          <div class="tab-content">
            <div class="sensors-header">
              <span>Bottom Section (List View)</span>
              <ha-button @click=${()=>this._addSensor("bottom_sensors")}>
                <ha-icon icon="mdi:plus"></ha-icon> Add Sensor
              </ha-button>
            </div>
            ${(null===(e=this._config.bottom_sensors)||void 0===e?void 0:e.map((t,e)=>D`
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
                  <ha-icon-picker
                    .value=${t.icon||""}
                    .configValue=${"bottom_sensors"}
                    .sensorIndex=${e}
                    .sensorField=${"icon"}
                    @value-changed=${this._sensorValueChanged}
                    label="Icon"
                  ></ha-icon-picker>
                </div>
                <ha-icon-button
                  icon="mdi:delete"
                  @click=${()=>this._removeSensor("bottom_sensors",e)}
                ></ha-icon-button>
              </div>
            `))||D`<div class="empty-state">No sensors configured. Click "Add Sensor" to start.</div>`}
          </div>
        `:null}
      </div>
    `:D``}_valueChanged(t){const e=t.target,s=e.configValue,i=void 0!==e.checked?e.checked:e.value;if(!this._config||!s)return;if(!ft.includes(s))return;const o=Object.assign({},this._config);""===i||void 0===i?delete o[s]:o[s]=i,this._config=o,this._dispatchConfigChange(o)}_sensorValueChanged(t){const e=t.target,s=e.configValue,i=e.sensorIndex,o=e.sensorField,n=void 0!==e.checked?e.checked:e.value;if(!this._config||!s||void 0===i||!o)return;const r=Object.assign({},this._config),a=[...r[s]||[]];a[i]||(a[i]={}),""===n||void 0===n?delete a[i][o]:a[i][o]=n,r[s]=a,this._config=r,this._dispatchConfigChange(r)}_addSensor(t){const e=Object.assign({},this._config),s=[...e[t]||[]];s.push({entity:"",name:"New Sensor"}),e[t]=s,this._config=e,this._dispatchConfigChange(e)}_removeSensor(t,e){const s=Object.assign({},this._config),i=[...s[t]||[]];i.splice(e,1),s[t]=i,this._config=s,this._dispatchConfigChange(s)}_dispatchConfigChange(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}static get styles(){return r`
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
        min-width: 200px;
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

      .sensor-item.checkbox {
        flex: 0;
        min-width: auto;
        display: flex;
        align-items: center;
        height: 52px;
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
    `}};t([pt()],gt.prototype,"hass",void 0),t([ut()],gt.prototype,"_config",void 0),t([ut()],gt.prototype,"_activeTab",void 0),gt=t([lt("router-card-editor")],gt);let _t=class extends at{static async getConfigElement(){return document.createElement("router-card-editor")}static getStubConfig(){return{type:"custom:router-card",name:"Router",icon:"mdi:router-wireless",controller:!0,theme:"default",wan_status_entity:"sensor.router_wan_status",wan_ip_entity:"sensor.router_wan_ip",top_sensors:[{entity:"sensor.router_cpu_load",name:"CPU Load",unit:"%",show_bar:!0},{entity:"sensor.router_memory_usage",name:"Memory",unit:"%",show_bar:!0},{entity:"sensor.router_uptime",name:"Uptime"},{entity:"sensor.router_connected_clients",name:"Clients",icon:"mdi:devices"}],bottom_sensors:[{entity:"sensor.router_wifi_2g_temperature",name:"WiFi 2.4GHz Temp",unit:"°C"},{entity:"sensor.router_wifi_5g_temperature",name:"WiFi 5GHz Temp",unit:"°C"},{entity:"sensor.router_wan_rx",name:"WAN RX",unit:"GB"},{entity:"sensor.router_wan_tx",name:"WAN TX",unit:"GB"}]}}setConfig(t){this.config=Object.assign({},t)}_getSensorState(t){var e;if(!t||!this.hass.states[t])return null;const s=this.hass.states[t];return{state:s.state,attributes:s.attributes,unit:null===(e=s.attributes)||void 0===e?void 0:e.unit_of_measurement}}_formatValue(t,e,s){const i=parseFloat(t);let o,n=t;if(isNaN(i))n=`${t}${e||""}`;else if("GB"===e||"TB"===e)n=`${i.toFixed(2)} ${e}`;else if("%"===e||"°C"===e)n=`${i.toFixed(1)}${e}`,s&&"%"===e&&(o=Math.min(100,Math.max(0,i)));else if(i>86400&&!e){const t=Math.floor(i/86400),e=Math.floor(i%86400/3600),s=Math.floor(i%3600/60),o=[];t>0&&o.push(`${t}д`),e>0&&o.push(`${e}ч`),(s>0||0===o.length)&&o.push(`${s}м`),n=o.join(" ")}else n=`${i}${e||""}`;return{display:n,barValue:o}}_getStatusColor(t){const e=t.toLowerCase();return e.includes("connected")||e.includes("up")||"on"===e||"true"===e?"#27ae60":e.includes("disconnected")||e.includes("down")||"off"===e||"false"===e?"#e74c3c":"#f39c12"}_getLoadColor(t){return t<50?"#27ae60":t<80?"#f39c12":"#e74c3c"}render(){if(!this.config||!this.hass)return D``;const t=this.config.icon||(this.config.controller?"mdi:router-wireless":"mdi:router-network"),e=this._getSensorState(this.config.wan_status_entity||""),s=this._getSensorState(this.config.wan_ip_entity||""),i=e||s;return D`
      <ha-card class="router-card ${this.config.theme||"default"}">
        <!-- Заголовок -->
        <div class="header">
          <div class="header-left">
            <ha-icon icon="${t}"></ha-icon>
            <span class="title">${this.config.name||"Router"}</span>
            ${this.config.controller?D`<span class="badge controller">Controller</span>`:D`<span class="badge repeater">Repeater</span>`}
          </div>
        </div>

        <!-- WAN секция (над основными) -->
        ${i?D`<div class="wan-section">
              <div class="wan-row">
                ${e?D`<div class="wan-item ${s?"wan-left":""}">
                      <span class="wan-label">WAN Status</span>
                      <span class="wan-value" style="color: ${this._getStatusColor(e.state)}">
                        ● ${e.state}
                      </span>
                    </div>`:F}
                ${s?D`<div class="wan-item ${e?"wan-right":""}">
                      <span class="wan-label">WAN IP</span>
                      <span class="wan-value">${s.state}</span>
                    </div>`:F}
              </div>
            </div>`:F}

        <div class="content">
          <!-- Верхняя секция (кубики) -->
          ${this.config.top_sensors&&this.config.top_sensors.length>0?D`<div class="top-section">
                <div class="cards-grid">
                  ${this.config.top_sensors.map(t=>{const e=this._getSensorState(t.entity);if(!e)return F;const s=this._formatValue(e.state,t.unit||e.unit,t.show_bar),i=void 0!==s.barValue?this._getLoadColor(s.barValue):void 0;return D`
                      <div class="card-item">
                        <div class="card-header">
                          ${t.icon?D`<ha-icon icon="${t.icon}"></ha-icon>`:F}
                          <span class="card-name">${t.name}</span>
                        </div>
                        <div class="card-value" style="${i?`color: ${i}`:""}">
                          ${s.display}
                        </div>
                        ${t.show_bar&&void 0!==s.barValue?D`<div class="card-bar">
                              <div class="card-bar-fill" style="width: ${s.barValue}%; background: ${i}"></div>
                            </div>`:F}
                      </div>
                    `})}
                </div>
              </div>`:F}

          <!-- Нижняя секция (список) -->
          ${this.config.bottom_sensors&&this.config.bottom_sensors.length>0?D`<div class="bottom-section">
                <div class="list-grid">
                  ${this.config.bottom_sensors.map(t=>{const e=this._getSensorState(t.entity);if(!e)return F;const s=this._formatValue(e.state,t.unit||e.unit);return D`
                      <div class="list-item">
                        <span class="list-name">${t.name}</span>
                        <span class="list-value">${s.display}</span>
                      </div>
                    `})}
                </div>
              </div>`:F}
        </div>
      </ha-card>
    `}static get styles(){return r`
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

      /* Header */
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
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
      }

      .badge.controller {
        background: #27ae60;
        color: white;
      }

      .badge.repeater {
        background: #3498db;
        color: white;
      }

      /* WAN Section */
      .wan-section {
        margin-bottom: 16px;
        padding: 12px;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 8px;
      }

      .dark .wan-section {
        background: #16213e;
      }

      .wan-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
      }

      .wan-item {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .wan-item.wan-left {
        flex: 1;
      }

      .wan-item.wan-right {
        text-align: right;
      }

      .wan-label {
        font-size: 11px;
        color: var(--secondary-text-color, #666);
        text-transform: uppercase;
      }

      .dark .wan-label {
        color: #aaa;
      }

      .wan-value {
        font-size: 16px;
        font-weight: 600;
      }

      /* Content */
      .content {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      /* Top Section (Cards) */
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

      .dark .card-item {
        background: #16213e;
      }

      .card-header {
        display: flex;
        align-items: center;
        gap: 6px;
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

      /* Bottom Section (List) */
      .bottom-section {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .list-grid {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .list-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 14px;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 8px;
      }

      .dark .list-item {
        background: #16213e;
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
    `}getCardSize(){return 4}};t([pt()],_t.prototype,"hass",void 0),t([ut()],_t.prototype,"config",void 0),_t=t([lt("router-card")],_t);export{_t as RouterCard};
