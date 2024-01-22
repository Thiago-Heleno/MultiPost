(()=>{var e={4846:e=>{let t,r=chrome||window.chrome||browser||window.browser;navigator.userAgent.includes("Firefox/")&&(r=browser||window.browser),navigator.userAgent.includes("Edge/")&&(r=browser||window.browser);try{t=indexedDB||window.indexedDB}catch(e){t=null,console.log(`Error initializing indexedDB: ${e.message}`)}e.exports={chrome:r,indexedDB:t,performance:performance||window.performance,URL:URL||window.URL}}},t={};function r(o){var n=t[o];if(void 0!==n)return n.exports;var s=t[o]={exports:{}};return e[o](s,s.exports,r),s.exports}r.p="/",chrome||browser||(window.chrome=chrome||window.chrome||window.browser),r.p=(chrome||window.chrome).runtime.getURL(""),(()=>{"use strict";var e=r(4846);e.chrome.i18n.getUILanguage().split("-")[0],Object.freeze({LicenseStateUnknown:0,LicenseStateFree:1,LicenseStateTrial:2,LicenseStateTrialExpired:3,LicenseStateLicensed:4,LicenseStateLicenseExpired:5,LicenseStateLicenseGrace:6}),Object.freeze([2,4,6]);const t=t=>new Promise(((r,o)=>e.chrome.runtime.sendMessage({type:"MSG_IMPORT_SETTINGS",data:t},(t=>{!t||t.error||e.chrome.runtime.lastError?(console.error("INC_EXP: Failed to import settings",{error:(t?t.error:null)||e.chrome.runtime.lastError}),o((t?t.error:null)||e.chrome.runtime.lastError)):(console.log("INC_EXP: Successfully imported settings"),r())})))),o=t=>{const r=document.getElementById("img-status"),o=document.getElementById("progress-bar"),n=document.getElementById("progress-percentage"),s=document.getElementById("status-desc");if(r.setAttribute("class",""),o.setAttribute("class",""),"completed"===t)return r.classList.add("import-successful"),o.classList.add("progress-complete"),n.textContent="100%",void(s.textContent=e.chrome.i18n.getMessage("ImportStatusDescriptionComplete"));if("unauthorized"===t){const t=document.getElementById("non-premium-desc"),i=document.getElementById("non-premium-txt");return r.classList.add("import-error"),o.classList.add("progress-error"),s.style.display="none",n.textContent="Unauthorized",t.style.display="inherit",void(i.textContent=e.chrome.i18n.getMessage("ImportStatusDescriptionUnauthorized"))}const i=document.getElementById("try-again-btn");r.classList.add("import-error"),o.classList.add("progress-error"),n.textContent="Error",s.textContent=e.chrome.i18n.getMessage("ImportStatusDescriptionError"),document.getElementById("error-btns-container").style.display="inherit",i.addEventListener("click",(()=>{location.reload()}))},n=async r=>{const n=document.getElementById("drag-and-drop"),s=document.getElementById("progress-container"),i=document.getElementById("status-desc"),d=document.getElementById("file-name");if(!r)return n.classList.remove("drag-over"),console.log("No file selected");console.log("Importing File",r.name);const a=new FileReader,c=document.getElementById("import-btn");if(c.classList.add("loading"),c.disabled=!0,n.remove(),s.style.display="inherit",s.style.opacity=1,d.textContent=`${r.name} - ${e.chrome.i18n.getMessage("ImportingTxt")}`,d.style.fontWeight=500,d.style.letterSpacing="0.1px",i.textContent=e.chrome.i18n.getMessage("ImportStatusDescriptionOnLoad"),!await new Promise(((t,r)=>{e.chrome.runtime.sendMessage({type:"MSG_IS_PREMIUM"},(function(e){!e||e.error?(console.error("Failed to check if premium: "+e.error),r(e.error)):(console.debug("Is premium: "+e.success),t(e.success))}))})))return s.style.display="inherit",s.style.opacity=1,o("unauthorized");a.onload=async e=>{const r=e.target.result;try{await(async e=>{const r=JSON.parse(e);if(!r)throw new Error("Invalid import data");console.debug("INC_EXP: Importing Data",{dataAsJson:r}),await t(r)})(r),o("completed"),console.debug("INC_EXP: Import completed")}catch(e){o("error"),console.error("INC_EXP: Failed to import settings",e)}c.classList.remove("loading"),c.disabled=!1},a.onerror=e=>{c.classList.remove("loading"),c.disabled=!1,console.error("INC_EXP: Failed to import settings",e)},a.onabort=e=>{c.classList.remove("loading"),c.disabled=!1,console.error("INC_EXP: Aborted settings import",e)},a.readAsText(r)};document.addEventListener("DOMContentLoaded",(()=>{((t,r=document)=>{[{id:"dd-title",msg:"DragAndDropTitle"},{id:"dd-desc",msg:"DragAndDropDescription"},{id:"import-btn",msg:"ImportBtnText"},{id:"status-desc",msg:"ImportStatusDescription"},{id:"try-again-btn",msg:"ImportTryAgainBtn"},{id:"contact-support-btn",msg:"ImportSupportBtn"}].forEach((({id:t,msg:o,sub:n=null})=>{const s=r.getElementById(t);s&&(s.textContent=e.chrome.i18n.getMessage(o,n))}))})(),(()=>{const e=document.getElementById("drag-and-drop");e.addEventListener("dragover",(t=>{t.preventDefault(),e.classList.add("drag-over")})),e.addEventListener("dragleave",(t=>{t.preventDefault(),e.classList.remove("drag-over")})),e.addEventListener("drop",(e=>{e.preventDefault();const t=e.dataTransfer.files[0];n(t)})),document.getElementById("file-input").addEventListener("change",(e=>{const t=e.target.files[0];n(t)}))})()}))})()})();