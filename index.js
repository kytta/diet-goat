/**
 * Diet Goat™ - a lightweight replacement for gc.zgo.at/count.js
 *  @author Nikita Karamov
 *  @author Martin Tournoij
 *  @license ISC
 */

/**
 * Bot type constant.
 *
 * An integer constant from the zgo.at/isbot library, which (for us)
 * should be >=150.
 * @enum {number}
 */
export const BotType = {
  NoBotKnown: 0,
  BotJSPhantom: 150,
  BotJSNightmare: 151,
  BotJSSelenium: 152,
  BotJSWebDriver: 153,
};

/**
 * GoatCounter data parameters
 * @typedef GoatData
 * @property {string} p Page path or event name
 * @property {string} [t] Page title
 * @property {string} [r] Referrer
 * @property {boolean} [e] Treat the path as an event
 * @property {string} [q] Query parameters
 * @property {[number, number, number]} [s] Screen size, as [width, height, scale]
 * @property {BotType} [b] Flag this as a "bot request"
 */

/**
 * Infer page path from the URL.
 * @returns {string} page path
 */
const getPath = () => {
  /** @type {Location | URL} */
  let location = window.location;

  /** @type {HTMLLinkElement|null} */
  const canonicalUrl = document.querySelector('link[rel="canonical"][href]');
  if (canonicalUrl) {
    // May be relative or point to different domain.
    const url = new URL(canonicalUrl.href);

    if (
      url.hostname.replace(/^www\./, "") ===
      location.hostname.replace(/^www\./, "")
    )
      location = url;
  }

  return location.pathname + location.search || "/";
};

/**
 * See if the browser looks like a bot.
 *
 * There is some additional filtering on the backend, but these properties
 * can't be fetched from there.
 * @returns {BotType} bot type
 */
const isBot = () => {
  // Headless browsers are probably a bot.
  if (window.callPhantom || window._phantom || window.phantom)
    return BotType.BotJSPhantom;
  if (window.__nightmare) return BotType.BotJSNightmare;
  if (
    document.__selenium_unwrapped ||
    document.__webdriver_evaluate ||
    document.__driver_evaluate
  )
    return BotType.BotJSSelenium;
  if (navigator.webdriver) return BotType.BotJSWebDriver;
  return BotType.NoBotKnown;
};

/**
 * Get all data we're going to send off to the counter endpoint.
 * @param {Partial<GoatData>} [variables] preset data parameters that will be merged into the final one
 * @returns {GoatData} data to be sent
 */
const getData = (variables = {}) => {
  return {
    p: variables?.p ?? getPath(),
    r: variables?.r ?? document.referrer,
    t: variables?.t ?? document.title,
    e: variables?.e ?? false,
    q: window.location.search,
    s: [
      window.screen.width,
      window.screen.height,
      window.devicePixelRatio || 1,
    ],
    b: isBot(),
  };
};

/**
 * Check if the visit should be counted
 * @returns {boolean} whether the visit should be counted
 */
const shouldCount = () => {
  //@ts-ignore: not standard property
  if ("visibilityState" in document && document.visibilityState === "prerender")
    return false; // prerender
  if (window.location !== window.parent.location) return false; // iframe
  if (
    /(localhost$|^127\.|^10\.|^172\.(1[6-9]|2\d|3[01])\.|^192\.168\.|^0\.0\.0\.0$)/.test(
      window.location.hostname,
    )
  )
    return false; // localhost
  if (window.location.protocol === "file:") return false; // local file
  if (localStorage && localStorage.getItem("skipgc") === "t") return false; //disabled
  return true;
};

/**
 * Get URL to send to GoatCounter.
 * @param {string} endpoint GC endpoint
 * @param {Partial<GoatData>} [variables] preset data parameters that will be merged into the final one
 * @returns {undefined|URL} URL to send the beacon to
 */
const getUrl = (endpoint, variables = {}) => {
  if (!endpoint) return;
  const url = new URL(endpoint);
  for (const [k, v] of Object.entries(getData(variables))) {
    if (v) url.searchParams.append(k, v.toString());
  }

  return url;
};

/**
 * Count the visit.
 * @param  {string} endpoint GoatCounter API endpoint
 * @param {Partial<GoatData>} [variables] preset data parameters that will be merged into the final one
 */
export const count = (endpoint, variables = {}) => {
  // Don't bother if we can't send beacons
  if (!navigator.sendBeacon) return;

  if (!shouldCount()) return;

  const url = getUrl(endpoint, variables);
  if (url === undefined) return;

  navigator.sendBeacon(url);
};
