Drupal.behaviors.accordion={attach(e){const t=e.querySelectorAll(".accordion-item"),r=e.querySelectorAll(".accordion__controls"),o="data-accordion-expanded",c=".accordion-item__toggle",n=".accordion-item",l="aria-expanded",i="Collapse",a="Expand",s=e=>{const t=e.querySelector(c),r=e.querySelector(".accordion-item__content");r.style.setProperty("--accordion-item-height",`${r.scrollHeight}px`),e.setAttribute(o,"true"),t.setAttribute(l,"true")},u=e=>{const t=e.querySelector(c);e.setAttribute(o,"false"),t.setAttribute(l,"false")},d=(e,t)=>e.startsWith(t),y=(e,t)=>e.replace(/^[^\s]+/,t),g=e=>{const t=e;d(t.innerHTML,i)||(t.innerHTML=y(t.innerHTML,i),t.setAttribute(l,!0))},h=e=>{const t=e;d(t.innerHTML,a)||(t.innerHTML=y(t.innerHTML,a),t.setAttribute(l,!1))},A=e=>e.querySelectorAll(n),p=e=>e.closest(".accordion"),b=(e,t)=>{e.forEach((e=>t(e)))},f=e=>{if(0===e.length)return;const t=(e=>(e=>p(e).querySelector(".accordion__controls"))(e).querySelector(".accordion__toggle-all"))(e[0]);(e=>{const t=e||[];return(e=>{const t=e||[];return Array.from(t).filter((e=>"true"===e.getAttribute(o))).length})(t)===t.length})(e)?g(t):h(t)},q=e=>e.length>1;t.forEach((e=>{u(e)})),r.forEach((e=>{((e,t)=>{q(t)?(e=>{e.style.display=""})(e):((e,t)=>{q(t)||(e.style.display="none")})(e,t)})(e,A(e.parentNode))})),t.forEach((e=>{const t=e.querySelector(c),r=p(e).querySelectorAll(n);t.addEventListener("click",(()=>{((e,t)=>{(e=>"true"===e.getAttribute(l))(e)?u(t):s(t)})(t,e),f(r)}))})),r.forEach((e=>{const t=A(e.parentNode);e.addEventListener("click",(e=>{"true"===e.target.getAttribute(l)?(h(e.target),b(t,u)):(g(e.target),b(t,s))}))}))}};