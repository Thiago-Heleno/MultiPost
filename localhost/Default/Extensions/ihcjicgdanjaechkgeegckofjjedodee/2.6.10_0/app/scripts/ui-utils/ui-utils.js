import{MSG_IS_PREMIUM,MSG_IS_TRIAL,MSG_SETTINGS_GET,MSG_SETTINGS_SET,MSG_TAB_DATA_GET,RELOAD_ON_CLOSE_PORT,SETTING_KILLSWITCH,SETTING_NATIVE_MESSAGING,SETTING_TELEMETRY_CONSENT}from"../app-consts";import{chrome}from"../../../utils/polyfill";import{msgPromptNativeMsg,msgRemoveNativeMessaging}from"../../../utils/native-messaging";export const PageType={NORMAL:"NORMAL",SYSTEM:"SYSTEM",EXTENSION:"EXTENSION",BROWSER_GUARD:"BROWSER_GUARD",BLANK_NEW_TAB:"BLANK_NEW_TAB",CHROME_WEBSTORE:"CHROME_WEBSTORE"};const port={reload:null};export const reloadOnClose=function(){port.reload||(port.reload=chrome.runtime.connect({name:RELOAD_ON_CLOSE_PORT}),console.debug("Began listening for a popup close event"))};const settingsGet=function(e,t,s){s||(s=e=>console.error(e)),chrome.runtime.sendMessage({type:MSG_SETTINGS_GET,payload:e},(function(e){!e||e.error?s("Error calling settingsGet: "+(e?e.error:"No response received")):t(e.success)}))};export const settingsGetAsync=e=>new Promise(((t,s)=>{chrome.runtime.sendMessage({type:MSG_SETTINGS_GET,payload:e},(function(e){!e||e.error?(console.debug("SETTINGS GET ASYNC: ERROR CALLING settingsGet"),s(`Error calling settingsGet: ${e?e.error:"No response received"}`)):t(e.success)}))}));export const settingsSetAsync=e=>new Promise(((t,s)=>{chrome.runtime.sendMessage({type:MSG_SETTINGS_SET,payload:e},(function(e){!e||e.error?s(`Error calling settingsSet: ${e?e.error:"No response received"}`):t(e.success)}))}));export const updateCheckboxDisabledState=function(e,t){$(e).prop("disabled",t),updateCheckboxParentToState(e)};const linkCheckboxToKillswitch=async function(e,t){if(t!==SETTING_KILLSWITCH&&t!==SETTING_TELEMETRY_CONSENT&&t!==SETTING_NATIVE_MESSAGING&&e){const t=await getKillswitchStateAsync();$(e).prop("disabled",!1===t)}};export const getKillswitchState=function(e){var t,s,r;t=SETTING_KILLSWITCH,s=e,r||(r=e=>console.error(e)),chrome.runtime.sendMessage({type:MSG_SETTINGS_GET,payload:t},(function(e){!e||e.error?r("Error calling settingsGet: "+(e?e.error:"No response received")):s(e.success)}))};export const getKillswitchStateAsync=()=>settingsGetAsync(SETTING_KILLSWITCH);export const updateCheckboxParentToState=e=>{let t=$(e).parent();e.checked?t.addClass("checked"):t.removeClass("checked"),!0===$(e).prop("disabled")?t.addClass("disabled"):t.removeClass("disabled")};const bindSettingsCheckboxEvent=async function(e,t,s){e.addEventListener("change",(async()=>{let r=$(e).prop("disabled");console.debug("CB: Default state of "+e.id+" is "+(r?"disabled":"active")),$(e).prop("disabled",!0);let o={};var a;o[t]=$(e).prop("checked"),updateCheckboxParentToState(e),t===SETTING_NATIVE_MESSAGING&&(o[t]?o[t]=await msgPromptNativeMsg():o[t]=await msgRemoveNativeMessaging()),t!==SETTING_KILLSWITCH&&await(a=o,new Promise(((e,t)=>{chrome.runtime.sendMessage({type:MSG_SETTINGS_SET,payload:a},(function(s){!s||s.error?t(`Error calling settingsSet: ${s?s.error:"No response received"}`):e(s.success)}))}))),console.debug("CB: Setting has been stored for "+e.id),s&&s(),setTimeout((()=>{console.debug("CB: Restoring "+e.id+" to "+(r?"disabled":"active")),updateCheckboxDisabledState(e,r)}),750),t!==SETTING_KILLSWITCH&&(port.reload||(port.reload=chrome.runtime.connect({name:RELOAD_ON_CLOSE_PORT}),console.debug("Began listening for a popup close event")))}))},validatePageForInjection=e=>new Promise(((t,s)=>{let r={id:e.id,url:e.url,isValid:!0,pageType:PageType.NORMAL,host:e.url,blocked:{totals:{}},redirectType:null,redirectSubType:null};if(r.url.startsWith("chrome://"))r.isValid=!1,r.url.startsWith("chrome://newtab/")?r.pageType=PageType.BLANK_NEW_TAB:r.pageType=PageType.SYSTEM;else if(r.url.startsWith("chrome-extension://")||r.url.startsWith("moz-extension://")||r.url.startsWith("extension://"))if(r.isValid=!1,r.url.startsWith(`chrome-extension://${chrome.runtime.id}/`)||window.browser&&r.url.startsWith(`moz-extension://${chrome.i18n.getMessage("@@extension_id")}/`)||r.url.startsWith(`extension://${chrome.runtime.id}/`)){r.pageType=PageType.BROWSER_GUARD;let t=new URL(e.url).searchParams;t.has("url")&&(r.url=t.get("url")),t.has("host")&&(r.host=t.get("host")),t.has("type")&&(r.redirectType=t.get("type")),t.has("subtype")&&(r.redirectSubType=t.get("subtype"))}else r.pageType=PageType.EXTENSION;else r.url.startsWith("about:")?(r.isValid=!1,["about:newtab","about:blank"].some((e=>r.url.startsWith(e)))?r.pageType=PageType.BLANK_NEW_TAB:r.pageType=PageType.SYSTEM):r.url.startsWith("edge://")?(r.isValid=!1,r.url.startsWith("edge://newtab/")?r.pageType=PageType.BLANK_NEW_TAB:r.pageType=PageType.SYSTEM):r.url.indexOf("chrome.google.com/webstore")>=0&&(r.isValid=!1,r.pageType=PageType.CHROME_WEBSTORE);t(r)}));export const sharedAddBackground=()=>{document.body.classList.add("mb-landscape")};export const sharedRemoveBackground=()=>{document.body.classList.remove("mb-landscape")};export const sharedSwitchToAppBar=(e,t)=>{$(".mb-current-website-tab span").text(e),$(".header-container-tabs .first-tab").removeAttr("style"),$(".header-container-tabs .first-tab").removeClass("mb-tabs"),$(".header-container-tabs .first-tab").addClass("mb-dynamic-tab"),!0===t&&$(".mb-current-website-tab span").addClass("needs-premium"),$("#dashboard-stats-tab").css("display","none"),$("#dashboard-upsell-tab").css("display","none"),$(".back-span").css("display","flex"),$(".globe").css("display","none"),$(".mb-stats-tab").addClass("hidden")};export const linkCheckboxToSetting=async function(e,t,s,r){s&&$(s).addClass("active");let o=document.getElementById(e);if(!o)return;await linkCheckboxToKillswitch(o,t);const a=await settingsGetAsync(t);o.checked=t!==SETTING_NATIVE_MESSAGING?!1!==a:a,updateCheckboxParentToState(o),s&&$(s).removeClass("active"),await bindSettingsCheckboxEvent(o,t,r)};export const isTrial=(e,t)=>{t||(t=e=>console.error(e)),chrome.runtime.sendMessage({type:MSG_IS_TRIAL},(function(s){!s||s.error?t("Error calling isTrial: "+(s?s.error:"No response received")):e(s.success)}))};export const isPremium=()=>new Promise(((e,t)=>{chrome.runtime.sendMessage({type:MSG_IS_PREMIUM},(function(s){!s||s.error?(console.error("Failed to check if premium: "+s.error),t(s.error)):(console.debug("Is premium: "+s.success),e(s.success))}))}));export const getCurrentTabData=(e,t)=>{t||(t=e=>console.error(e)),new Promise((e=>{chrome.tabs.query({currentWindow:!0,active:!0},(function(t){e(t)}))})).then((e=>{return t=e[0],new Promise(((e,s)=>{let r={id:t.id,url:t.url,isValid:!0,pageType:PageType.NORMAL,host:t.url,blocked:{totals:{}},redirectType:null,redirectSubType:null};if(r.url.startsWith("chrome://"))r.isValid=!1,r.url.startsWith("chrome://newtab/")?r.pageType=PageType.BLANK_NEW_TAB:r.pageType=PageType.SYSTEM;else if(r.url.startsWith("chrome-extension://")||r.url.startsWith("moz-extension://")||r.url.startsWith("extension://"))if(r.isValid=!1,r.url.startsWith(`chrome-extension://${chrome.runtime.id}/`)||window.browser&&r.url.startsWith(`moz-extension://${chrome.i18n.getMessage("@@extension_id")}/`)||r.url.startsWith(`extension://${chrome.runtime.id}/`)){r.pageType=PageType.BROWSER_GUARD;let e=new URL(t.url).searchParams;e.has("url")&&(r.url=e.get("url")),e.has("host")&&(r.host=e.get("host")),e.has("type")&&(r.redirectType=e.get("type")),e.has("subtype")&&(r.redirectSubType=e.get("subtype"))}else r.pageType=PageType.EXTENSION;else r.url.startsWith("about:")?(r.isValid=!1,["about:newtab","about:blank"].some((e=>r.url.startsWith(e)))?r.pageType=PageType.BLANK_NEW_TAB:r.pageType=PageType.SYSTEM):r.url.startsWith("edge://")?(r.isValid=!1,r.url.startsWith("edge://newtab/")?r.pageType=PageType.BLANK_NEW_TAB:r.pageType=PageType.SYSTEM):r.url.indexOf("chrome.google.com/webstore")>=0&&(r.isValid=!1,r.pageType=PageType.CHROME_WEBSTORE);e(r)}));var t})).then((t=>{t.isValid?chrome.runtime.sendMessage({type:MSG_TAB_DATA_GET,payload:t.id},(function(s){!s||s.error?(e(t),console.error("Error calling getCurrentTabData: "+(s?s.error:"No response received"))):(t.blocked=s.success.blocked,t.host=s.success.host,t.excluded=s.success.excluded,e(t))})):e(t)})).catch((e=>{t(e)}))};export const ellipsisSlice=(e,t=22)=>`${e.slice(0,t)}...`;