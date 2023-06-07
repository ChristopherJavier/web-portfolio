(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function c(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(n){if(n.ep)return;n.ep=!0;const o=c(n);fetch(n.href,o)}})();let d=document.getElementById("projects_cont");document.getElementById("techs_imgs");const u=document.getElementById("techList"),p=document.getElementById("contact-form");function h(){fetch("/db.json").then(t=>t.json()).then(t=>{f(t.projects),y(t.techs)})}function f(t){let e=[];const c=t.name,i=t.description,n=t.technologies,o=t.github,r=t.links;for(let s=0;s<c.length;s++)e=e.concat({name:c[s],descriptions:i[s],technologies:n[s],github:o[s],links:r[s]});g(e)}function g(t){t.map(function(e){let c=document.createElement("div"),i=document.createElement("h3"),n=document.createElement("p"),o=document.createElement("ul"),r=document.createElement("li"),s=document.createElement("a"),l=document.createElement("span");i.innerHTML=`${e.name}`,n.innerHTML=`${e.descriptions}`,s.href=e.github,l.innerHTML=" arrow_forward ",o.className="tech_list",c.className="project-box",s.className="project-link",l.className="material-symbols-outlined",e.technologies.map(function(m){let a=document.createElement("img");a.className="tech_icons_img",r.className="tech_icons",a.src=`./${m}.png`,r.appendChild(a),o.append(r)}),c.appendChild(i),c.appendChild(n),c.appendChild(o),c.appendChild(s),s.appendChild(l),d.appendChild(c)})}function y(t){for(const e in t){const c=document.createElement("div"),i=document.createElement("h3");c.className="techCategory",i.innerHTML=e,c.append(i),t[e].map(n=>{const o=document.createElement("div"),r=document.createElement("img"),s=document.createElement("p");o.className="techCard",s.innerHTML=n,r.src=`./${n}.png`,r.id=`${e.replace(/\s/g,"")}T${t[e].indexOf(n)}`,o.append(r),o.append(s),c.append(o)}),u.append(c)}}async function E(){let t;await fetch("./db.json").then(e=>e.json()).then(e=>t=e.user);for(const e in t){e==="profile_photo"&&(document.getElementById(e).src=t[e]);for(const c in document.getElementsByClassName(`${e}_link`))isNaN(parseInt(c))||(document.getElementsByClassName(`${e}_link`)[c].href=t[e])}}function b(t){t.preventDefault();const e=new FormData(this),c=encodeURIComponent(`You received a mail from ${e.get("name")} ${e.get("lastname")}`),i=encodeURIComponent(e.get("comments"));console.log(i),window.location.href=`mailto:${{}.VITE_MAIL}?subject=${c}&body=${i}`}p.addEventListener("submit",b);h();E();
