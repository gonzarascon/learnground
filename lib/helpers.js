const dev = process.env.NODE_ENV !== "production";

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    console.log("Fallback: Copying text command was " + msg);
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
}

/**
 * @function copyTextToClipboard
 * @param {string} text
 */

export function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      console.log("Async: Copying to clipboard was successful!");
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    }
  );
}

/**
 * @function pxToRem
 * @param {number}  value
 * @returns {string} Parsed px number to rem size
 * 
 
 */
export const pxToRem = (value) => `${value / 16}rem`;

/**
 * @function getCurrentYear
 * @returns {number} Current year
 */

export const getCurrentYear = () => new Date().getFullYear();

/**
 * @function logEvent
 * @description Logs action events with label to Google Analytics / TagManager
 * @param {{action: string, label:string}} Object
 */

export const logEvent = ({ action, label }) => {
  if (!dev) {
    window.gtag("event", action, {
      event_category: "Acciones",
      event_label: label,
      value: undefined,
    });
  }
  return;
};
