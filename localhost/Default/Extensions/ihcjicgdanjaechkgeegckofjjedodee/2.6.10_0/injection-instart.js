(()=>{var e,t={4846:e=>{let t,o=chrome||window.chrome||browser||window.browser;navigator.userAgent.includes("Edge/")&&(o=browser||window.browser);try{t=indexedDB||window.indexedDB}catch(e){t=null,console.log(`Error initializing indexedDB: ${e.message}`)}e.exports={chrome:o,indexedDB:t,performance:performance||window.performance,URL:URL||window.URL}}},o={};function n(e){var r=o[e];if(void 0!==r)return r.exports;var i=o[e]={exports:{}};return t[e](i,i.exports,n),i.exports}e=new URLSearchParams(document.currentScript.src.split("?")[1]).get("extId"),console.debug("INS: Instart scanner loaded into "+window.location.href+" by "+e),function(){function t(e){if(document.currentScript&&document.currentScript.textContent){let t=document.currentScript.textContent,o=["Instart","instart","INSTART","I10C","I11C","I12C","IXC_353_1119062411120848"];for(let n of o)if(t.includes(n))throw new Error("Instart "+e+" Logic")}}function o(e,o){console.debug("INS: "+o+" hooked for "+window.location.href);let n=e[o];Object.defineProperty(e,o,{get:function(){return t(o),n},set:function(e){t(o),n=e}})}function r(t,r){if(console.debug("INS: Sending an is-whitelisted request about "+r),console.debug("INS: Extension ID "+e),window.chrome||window.browser||"undefined"!=typeof browser){const{chrome:i}=n(4846);i.runtime.sendMessage(e,{type:"isInstartWhitelisted",parameters:{href:window.location.href,prop:r}},(e=>{e&&e.isWhitelisted?console.debug("INS: "+r+" is whitelisted for "+window.location.href):(i.runtime.lastError&&console.error("INS: Failed with is-whitelisted request for "+r+": "+i.runtime.lastError.message),o(t,r))}))}else{const e={href:window.location.href,prop:r};window.postMessage({type:"isInstartWhitelisted",parameters:JSON.stringify(e)},`${window.location.protocol}//${window.location.host}`)}}r(window,"INSTART"),r(window,"INSTART_TARGET_NAME"),r(window,"I10C"),r(window,"I11C"),r(window,"I12C"),r(window,"IXC_353_1119062411120848");let i=window.setTimeout;window.setTimeout=function(){return t("Timeout"),i.apply(window,arguments)};let s=window.setInterval;window.setInterval=function(){return t("Interval"),s.apply(window,arguments)},window.addEventListener("message",(e=>{const t=new URL(e.origin).host;if("isInstartWhitelistedResponse"===e.data.type&&t===window.location.host){const t=JSON.parse(e.data.parameters);!1===t.isWhitelisted&&o(window,t.property)}}))}()})();