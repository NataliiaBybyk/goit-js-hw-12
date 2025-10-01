import{a as S,S as q,i}from"./assets/vendor-BSTwZ_tR.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const $="https://pixabay.com/api/",R="43147251-812f7b0e187b76efed42bbc3c",d=15;async function m(a,o){const t=new URLSearchParams({key:R,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:d}),s=await S.get(`${$}?${t}`),e=Math.ceil(s.data.totalHits/d);return{data:s.data.hits,totalPages:e}}const h=document.querySelector(".gallery"),f=document.querySelector(".loader"),g=document.querySelector(".button-more"),B=new q(".gallery-item .link",{captionsData:"alt",captionDelay:250});function p(a){const o=a.map(({webformatURL:t,largeImageURL:s,tags:e,likes:r=0,views:l=0,comments:w=0,downloads:P=0})=>`
      <li class="gallery-item">
        <a class="link" href="${s}">
          <img src="${t}" alt="${e}" class="image" width="400">
        </a>
        <div class="information like">
          <h4>Likes</h4>
          <p>${r}</p>
        </div>
        <div class="information views">
          <h4>Views</h4>
          <p>${l}</p>
        </div>
        <div class="information comments">
          <h4>Comments</h4>
          <p>${w}</p>
        </div>
        <div class="information downloads">
          <h4>Downloads</h4>
          <p>${P}</p>
        </div>
      </li>
  `).join("");h.insertAdjacentHTML("beforeend",o),B.refresh()}function M(){h.innerHTML=""}function y(){f.classList.remove("hide")}function L(){f.classList.add("hide")}function b(){g.classList.remove("hide")}function n(){g.classList.add("hide")}const v=document.querySelector(".form"),H=document.querySelector(".gallery"),I=document.querySelector(".button-more");let c=1,u="";v.addEventListener("submit",O);I.addEventListener("click",D);async function O(a){a.preventDefault(),c=1;const{["search-text"]:o}=a.target.elements;if(u=o.value.trim(),!!u.length){M(),n(),y();try{const{data:t,totalPages:s}=await m(u,c);if(!t.length){n(),i.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}p(t),c>=s?(n(),i.info({message:"We're sorry, but you've reached the end of search results",position:"topRight"})):b()}catch(t){i.error({message:t.message,position:"topRight"})}finally{L()}v.reset()}}async function D(a){a.preventDefault();const o=a.currentTarget;c+=1,y(),o.disadled=!0;try{const{data:t,totalPages:s}=await m(u,c);if(!t.length){n(),i.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}p(t),c>=s?(n(),i.error({message:"We're sorry, but you've reached the end of search results",position:"topRight"})):b();const e=H.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}catch(t){n(),i.error({message:t.message,position:"topRight"})}finally{L(),o.disadled=!1}}
//# sourceMappingURL=index.js.map
