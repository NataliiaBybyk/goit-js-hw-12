import{a as q,S as $,i as m}from"./assets/vendor-BSTwZ_tR.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();const P="https://pixabay.com/api/",B="43147251-812f7b0e187b76efed42bbc3c",u=15;async function f(r,n){const t=new URLSearchParams({key:B,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:n,per_page:u}),i=await q.get(`${P}?${t}`),e=Math.ceil(i.data.totalHits/u);return{data:i.data.hits,totalPages:e}}const h=document.querySelector(".gallery"),M=document.querySelector(".loader"),p=document.querySelector(".button-more"),E=new $(".gallery-item .link",{captionsData:"alt",captionDelay:250});function g(r){const n=r.map(({webformatURL:t,largeImageURL:i,tags:e,likes:o=0,views:a=0,comments:w=0,downloads:S=0})=>`
      <li class="gallery-item">
        <a class="link" href="${i}">
          <img src="${t}" alt="${e}" class="image" width="400">
        </a>
        <div class="information like">
          <h4>Likes</h4>
          <p>${o}</p>
        </div>
        <div class="information views">
          <h4>Views</h4>
          <p>${a}</p>
        </div>
        <div class="information comments">
          <h4>Comments</h4>
          <p>${w}</p>
        </div>
        <div class="information downloads">
          <h4>Downloads</h4>
          <p>${S}</p>
        </div>
      </li>
  `).join("");h.insertAdjacentHTML("beforeend",n),E.refresh()}function d(){h.innerHTML=""}function y(){M.classList.remove("hide")}function L(){const r=document.querySelector(".loader");r.length<0||r.classList.add("hide")}function b(){p.classList.remove("hide")}function l(){p.classList.add("hide")}const v=document.querySelector(".form"),H=document.querySelector(".gallery"),I=document.querySelector(".button-more");let s=1,c="";v.addEventListener("submit",O);I.addEventListener("click",D);function O(r){r.preventDefault(),s=1;const{["search-text"]:n}=r.target.elements;c=n.value.trim(),c.length&&(d(),y(),f(c,s).then(({data:t,totalPages:i})=>{if(!t.length)throw new Error("Sorry, there are no images matching your search query. Please try again!");g(t),b(),s>=i&&l()}).catch(t=>{d(),m.error({message:t.message,position:"topRight"})}).finally(()=>{L()}),v.reset())}function D(r){r.preventDefault();const n=r.currentTarget;s+=1,y(),f(c,s).then(({data:t,totalPages:i})=>{if(s>=i?l():b(),s>i)throw new Error("We're sorry, but you've reached the end of search results");g(t),n.disadle=!0;const e=H.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:e*3,behavior:"smooth"})}).catch(t=>{l(),m.info({message:t.message,position:"topRight"})}).finally(()=>{L(),n.disadle=!1})}
//# sourceMappingURL=index.js.map
