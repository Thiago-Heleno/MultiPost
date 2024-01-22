import {chrome} from "@/utils/typed-polyfill";

export const uiLanguage = chrome.i18n.getUILanguage().split('-')[0];

/**
 * Finds an element by ID and replaces its text with the appropriate internationalized string
 * @param {Array<{id: String, msg: String, sub: String}>} nodes - `id` corresponds to the dom element's ID | `msg` corresponds to the appropriate translation name in messages.json | `sub` is any substitution text
 * @param {HTMLElement} dom - (optional) the document to find the element in [defaults to `document`]
 * @return {undefined}
 */
export function translateText(key: string, sub: string|undefined = undefined): string {
    return chrome.i18n.getMessage(key, sub);
}

