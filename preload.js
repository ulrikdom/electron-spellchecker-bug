const { webFrame, ipcRenderer } = require("electron");

/**
 * The preload script runs before `index.html` is loaded
 * in the renderer. It has access to web APIs as well as
 * Electron's renderer process modules and some polyfilled
 * Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */
window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type]);
  }

  console.log("ENABLE SPELLCHECKER");
  let isRunningSpellcheck = false;

  // Set spellcheck provider
  webFrame.setSpellCheckProvider("sv_SE", {
    spellCheck: (words, callback) => {
      console.log("DO SPELLCHECK", words);
      if (isRunningSpellcheck) {
        console.warn("SPELLCHECK ALREADY EXECUTING");
        // Workaround is to return here without ever calling the callback-method.
        //return;
      }

      isRunningSpellcheck = true;
      return new Promise((resolve) => {
        setTimeout(() => {
          isRunningSpellcheck = false;
          callback([]);
        }, 2000);
      });
    },
  });
});
