(()=>{"use strict";(()=>{const e=(()=>{const e=["[].playerResponse.adPlacements","[].playerResponse.playerAds","playerResponse.adPlacements","playerResponse.playerAds","adPlacements","playerAds","ytInitialPlayerResponse.adPlacements","ytInitialPlayerResponse.playerAds","adPlacementRenderer","adPlacementConfig","instreamVideoAdRenderer","instreamAdPlayerOverlayRenderer","linearAdSequenceRenderer"],n=function(e,t){let o=e,l=t;for(;;){if("object"!=typeof o||null===o)return!1;const e=l.indexOf(".");if(-1===e){if("*"===l)for(const e in o)!1!==o.hasOwnProperty(e)&&(window.useLogging&&console.log("Deleting key",e,o[e]),delete o[e]);else o.hasOwnProperty(l)&&(window.useLogging&&console.log("Deleting element",l,o[l]),delete o[l]);return!0}const t=l.slice(0,e);if("[]"===t&&Array.isArray(o)||"*"===t&&o instanceof Object){const t=l.slice(e+1);let r=!1;for(const e of Object.keys(o))if(r=n(o[e],t),r)break;return r}if(!1===o.hasOwnProperty(t))return!1;o=o[t],l=l.slice(e+1)}},t=function(t){for(const o of e)n(t,o);return t};JSON.parse=new Proxy(JSON.parse,{apply:function(){return t(Reflect.apply(...arguments))}}),Response.prototype.json=new Proxy(Response.prototype.json,{apply:function(){return Reflect.apply(...arguments).then((e=>t(e)))}}),window.useLogging&&console.log("Trimmer initialized")}).toString();function n(){let e=document.querySelectorAll("button.ytp-ad-skip-button");e.length>0&&(e[0].click(),window.useLogging&&console.log("Clicked button"));let n=document.getElementsByClassName("ytp-ad-overlay-close-container");n.length>0&&(n[0].click(),window.useLogging&&console.log("Clicked button"));const t=document.querySelectorAll(".ad-showing")[0],o=document.querySelector(".ytp-ad-text.ytp-ad-preview-text"),l=document.querySelector("video");null!=t&&null!=l&&null!=o&&(l.currentTime=l.duration)}window.useLogging=!1,function(e){const n=document.createElement("script");n.type="text/javascript",n.defer=!0,n.appendChild(document.createTextNode(decodeURIComponent(`(${e})();`))),(document.head||document.documentElement).appendChild(n)}(e),n(),setInterval(n,100)})()})();