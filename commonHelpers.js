import{i as s,S as y}from"./assets/vendor-8c59ed88.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const c=document.querySelector(".loader");function f(){c.style.display="flex"}function l(){c.style.display="none"}async function p(a){const t="44914505-36a6b847b314a6ef1bce975f7";f();try{const o=await fetch(`https://pixabay.com/api/?key=${t}&q=${a}&image_type=photo&orientation=horizontal&safesearch=true`);if(!o.ok)throw new Error("Failed to fetch images");return await o.json()}catch(o){throw u(),o}finally{l()}}function u(a){s.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}const g=document.querySelector(".card-container");async function S(a){try{const t=a.map(({webformatURL:i,largeImageURL:e,tags:r,likes:n,views:d,comments:m,downloads:h})=>`<li class="gallery-item">
              <a class="gallery-link" href="${e}">
                  <img class="gallery-image" src="${i}" alt="${r}" width="360" height="200"/>
                  <ul class="gallery-text-list">
                      <li class="gallery-text-item"><h3>Likes</h3><p>${n}</p></li>
                      <li class="gallery-text-item"><h3>Views</h3><p>${d}</p></li>
                      <li class="gallery-text-item"><h3>Comments</h3><p>${m}</p></li>
                      <li class="gallery-text-item"><h3>Downloads</h3><p>${h}</p></li>
                  </ul>
              </a>
          </li>`).join("");g.innerHTML=t,new y(".card-container a",{captionsData:"alt",captionPosition:"bottom"}).refresh()}catch(t){console.error("Error rendering images:",t),s.error({title:"Error",message:"Failed to render images",position:"topRight"})}}const q=document.querySelector(".search-form");document.querySelector(".card-container");document.querySelector(".load-more-container");const w=document.querySelector(".load-more");document.querySelector(".loader");q.addEventListener("submit",b);w.addEventListener("click",handleLoadMore);async function b(a){a.preventDefault();const t=a.currentTarget,o=t.elements.query.value.trim();if(o===""){s.error({title:"Error",message:"Please enter a search term!",position:"topRight"});return}try{const i=await p(o);i.hits.length===0&&s.warning({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),S(i.hits)}catch{u()}finally{t.reset(),l()}}
//# sourceMappingURL=commonHelpers.js.map
