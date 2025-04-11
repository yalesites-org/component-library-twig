(()=>{"use strict";function e(e){return function(e){if(Array.isArray(e))return t(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,n){if(e){if("string"==typeof e)return t(e,n);var o=Object.prototype.toString.call(e).slice(8,-1);return"Object"===o&&e.constructor&&(o=e.constructor.name),"Map"===o||"Set"===o?Array.from(e):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?t(e,n):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var n,o,i,a,r,l=(n=["a[href]","area[href]",'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',"select:not([disabled]):not([aria-hidden])","textarea:not([disabled]):not([aria-hidden])","button:not([disabled]):not([aria-hidden])","iframe","object","embed","[contenteditable]",'[tabindex]:not([tabindex^="-"])'],o=function(){function t(n){var o=n.targetModal,i=n.triggers,a=void 0===i?[]:i,r=n.onShow,l=void 0===r?function(){}:r,s=n.onClose,c=void 0===s?function(){}:s,d=n.openTrigger,u=void 0===d?"data-micromodal-trigger":d,h=n.closeTrigger,f=void 0===h?"data-micromodal-close":h,v=n.openClass,m=void 0===v?"is-open":v,g=n.disableScroll,y=void 0!==g&&g,b=n.disableFocus,p=void 0!==b&&b,w=n.awaitCloseAnimation,E=void 0!==w&&w,k=n.awaitOpenAnimation,L=void 0!==k&&k,M=n.debugMode,S=void 0!==M&&M;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this.modal=document.getElementById(o),this.config={debugMode:S,disableScroll:y,openTrigger:u,closeTrigger:f,openClass:m,onShow:l,onClose:c,awaitCloseAnimation:E,awaitOpenAnimation:L,disableFocus:p},a.length>0&&this.registerTriggers.apply(this,e(a)),this.onClick=this.onClick.bind(this),this.onKeydown=this.onKeydown.bind(this)}var o;return(o=[{key:"registerTriggers",value:function(){for(var e=this,t=arguments.length,n=new Array(t),o=0;o<t;o++)n[o]=arguments[o];n.filter(Boolean).forEach((function(t){t.addEventListener("click",(function(t){return e.showModal(t)}))}))}},{key:"showModal",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;this.activeElement=document.activeElement,this.modal.setAttribute("aria-hidden","false"),this.modal.classList.add(this.config.openClass),this.scrollBehaviour("disable"),this.addEventListeners(),this.config.awaitOpenAnimation?this.modal.addEventListener("animationend",(function t(){e.modal.removeEventListener("animationend",t,!1),e.setFocusToFirstNode()}),!1):this.setFocusToFirstNode(),this.config.onShow(this.modal,this.activeElement,t)}},{key:"closeModal",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=this.modal;if(this.modal.setAttribute("aria-hidden","true"),this.removeEventListeners(),this.scrollBehaviour("enable"),this.activeElement&&this.activeElement.focus&&this.activeElement.focus(),this.config.onClose(this.modal,this.activeElement,e),this.config.awaitCloseAnimation){var n=this.config.openClass;this.modal.addEventListener("animationend",(function e(){t.classList.remove(n),t.removeEventListener("animationend",e,!1)}),!1)}else t.classList.remove(this.config.openClass)}},{key:"closeModalById",value:function(e){this.modal=document.getElementById(e),this.modal&&this.closeModal()}},{key:"scrollBehaviour",value:function(e){if(this.config.disableScroll){var t=document.querySelector("body");switch(e){case"enable":Object.assign(t.style,{overflow:""});break;case"disable":Object.assign(t.style,{overflow:"hidden"})}}}},{key:"addEventListeners",value:function(){this.modal.addEventListener("touchstart",this.onClick),this.modal.addEventListener("click",this.onClick),document.addEventListener("keydown",this.onKeydown)}},{key:"removeEventListeners",value:function(){this.modal.removeEventListener("touchstart",this.onClick),this.modal.removeEventListener("click",this.onClick),document.removeEventListener("keydown",this.onKeydown)}},{key:"onClick",value:function(e){(e.target.hasAttribute(this.config.closeTrigger)||e.target.parentNode.hasAttribute(this.config.closeTrigger))&&(e.preventDefault(),e.stopPropagation(),this.closeModal(e))}},{key:"onKeydown",value:function(e){27===e.keyCode&&this.closeModal(e),9===e.keyCode&&this.retainFocus(e)}},{key:"getFocusableNodes",value:function(){var t=this.modal.querySelectorAll(n);return Array.apply(void 0,e(t))}},{key:"setFocusToFirstNode",value:function(){var e=this;if(!this.config.disableFocus){var t=this.getFocusableNodes();if(0!==t.length){var n=t.filter((function(t){return!t.hasAttribute(e.config.closeTrigger)}));n.length>0&&n[0].focus(),0===n.length&&t[0].focus()}}}},{key:"retainFocus",value:function(e){var t=this.getFocusableNodes();if(0!==t.length)if(t=t.filter((function(e){return null!==e.offsetParent})),this.modal.contains(document.activeElement)){var n=t.indexOf(document.activeElement);e.shiftKey&&0===n&&(t[t.length-1].focus(),e.preventDefault()),!e.shiftKey&&t.length>0&&n===t.length-1&&(t[0].focus(),e.preventDefault())}else t[0].focus()}}])&&function(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}(t.prototype,o),t}(),i=null,a=function(e){if(!document.getElementById(e))return console.warn("MicroModal: ❗Seems like you have missed %c'".concat(e,"'"),"background-color: #f8f9fa;color: #50596c;font-weight: bold;","ID somewhere in your code. Refer example below to resolve it."),console.warn("%cExample:","background-color: #f8f9fa;color: #50596c;font-weight: bold;",'<div class="modal" id="'.concat(e,'"></div>')),!1},r=function(e,t){if(function(e){e.length<=0&&(console.warn("MicroModal: ❗Please specify at least one %c'micromodal-trigger'","background-color: #f8f9fa;color: #50596c;font-weight: bold;","data attribute."),console.warn("%cExample:","background-color: #f8f9fa;color: #50596c;font-weight: bold;",'<a href="#" data-micromodal-trigger="my-modal"></a>'))}(e),!t)return!0;for(var n in t)a(n);return!0},{init:function(t){var n=Object.assign({},{openTrigger:"data-micromodal-trigger"},t),a=e(document.querySelectorAll("[".concat(n.openTrigger,"]"))),l=function(e,t){var n=[];return e.forEach((function(e){var o=e.attributes[t].value;void 0===n[o]&&(n[o]=[]),n[o].push(e)})),n}(a,n.openTrigger);if(!0!==n.debugMode||!1!==r(a,l))for(var s in l){var c=l[s];n.targetModal=s,n.triggers=e(c),i=new o(n)}},show:function(e,t){var n=t||{};n.targetModal=e,!0===n.debugMode&&!1===a(e)||(i&&i.removeEventListeners(),(i=new o(n)).showModal())},close:function(e){e?i.closeModalById(e):i.closeModal()}});"undefined"!=typeof window&&(window.MicroModal=l);const s=l;Drupal.behaviors.eventsCalendar={attach(e){const t="is-visible",n=".calendar__nav--desktop",o=e.querySelectorAll(".calendar"),i=e.querySelectorAll(".calendar-event__toggle"),a=!(null===e.querySelector(".sb-show-main")),r=window.matchMedia("(min-width: 1200px )"),l=document.createElement("div");s.init(),o.forEach((e=>{const o=e.querySelector(".modal__calendar-events"),c=e.querySelector(".modal__title"),d=e.querySelector(n).querySelector(".calendar__nav-btn--prev"),u=e.querySelector(n).querySelector(".calendar__nav-btn--next"),h=e.querySelectorAll(".calendar__day--events"),f=e.querySelector(".calendar__no-events-message"),v=()=>{h.length||f.classList.add(t)};i.forEach((e=>{e.addEventListener("click",(()=>{const t=e.closest(".calendar__day"),n=t.querySelectorAll(".calendar-event");l.innerHTML=t.querySelector(".calendar__dialog-title").innerHTML,o.innerHTML="",c.innerHTML="",c.innerHTML=l.textContent||l.innerText,n.forEach((e=>{const t=e.cloneNode(!0);t.classList.add("calendar-event--modal"),o.appendChild(t)}))}))}));const m=e=>e.target.closest('[id^="calendar-wrapper"]'),g=(e,t)=>{a||e&&Drupal.ajax({url:"/events-calendar",submit:{calendar_id:`#${e.id}`,month:t.dataset.month,year:t.dataset.year},progress:{type:"fullscreen"}}).execute()};d.addEventListener("click",(e=>{const t=m(e);g(t,d)})),u.addEventListener("click",(e=>{const t=m(e);g(t,u)})),r.matches||v(),r.addEventListener("change",(()=>{r.matches?f.classList.remove(t):(v(),s.close())}))}))}}})();