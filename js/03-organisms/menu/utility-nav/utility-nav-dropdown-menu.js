Drupal.behaviors.utilityDropdownNav={attach(){const t=document.querySelectorAll(".utility-nav__dropdown"),e=document.querySelectorAll('.utility-nav__cta[data-cta-control-type="dropdown"]'),i=document.querySelectorAll(".utility-nav__dropdown-content"),r=document.querySelector(".site-header__menu-wrapper"),d=(t,e,i)=>{e.setAttribute("aria-expanded",!1),t.setAttribute("aria-expanded",!1),i.setAttribute("aria-hidden",!0)},n=(t,e)=>{const i="false"===t.getAttribute("aria-hidden"),d=t,n=r.getBoundingClientRect(),o=t.getBoundingClientRect().right-n.right;if(!i)return d.style.left="",d.style.right="",e.classList.remove("utility-nav__dropdown-direction-left"),void e.classList.remove("utility-nav__dropdown-direction-right");o>0?(d.style.left="auto",d.style.right="0",e.classList.remove("utility-nav__dropdown-direction-right"),e.classList.add("utility-nav__dropdown-direction-left")):(d.style.left="",d.style.right="",e.classList.add("utility-nav__dropdown-direction-right"),e.classList.remove("utility-nav__dropdown-direction-left"))},o=(t,e,i)=>{const d=e;if(window.innerWidth>=990&&e){const t=e.offsetWidth;d.style.width="auto",d.style.width=`${t+40}px`}else e&&(d.style.width="auto");r&&n(t,i)},a=(t,e)=>{let i;return(...r)=>{clearTimeout(i),i=setTimeout((()=>t.apply(this,r)),e)}};e.forEach(((e,s)=>{const l=t[s],u=i[s],c=u.querySelector(".utility-nav-dropdown__menu");o(u,c,e),window.addEventListener("resize",a((()=>o(u,c)),200)),e.addEventListener("click",(()=>{((t,e,i)=>{const r="true"===e.getAttribute("aria-expanded");e.setAttribute("aria-expanded",!r),t.setAttribute("aria-expanded",!r),i.setAttribute("aria-hidden",r)})(e,l,u),r&&n(u,e)})),e.addEventListener("keydown",(t=>{"Escape"===t.key&&d(e,l,u)})),u.addEventListener("keydown",(t=>{"Escape"===t.key&&(d(e,l,u),e.focus())}))}))}};