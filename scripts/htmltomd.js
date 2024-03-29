// ==UserScript==
// @name         ChatGPT to MD
// @namespace    http://tampermonkey.net/
// @version      2024-03-29
// @description  It's in the name!
// @author       Me
// @match        https://chat.openai.com/c/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=openai.com
// @grant        none
// ==/UserScript==

function htmlToMD(html) {
  return html
    .replace(/<p>/g, "\n\n")
    .replace(/<\/p>/g, "")
    .replace(/<b>/g, "**")
    .replace(/<\/b>/g, "**")
    .replace(/<i>/g, "_")
    .replace(/<\/i>/g, "_")
    .replace(/<code[^>]*>/g, (match) => {
      const languageMatch = match.match(/class="[^"]*language-([^"]*)"/);
      return languageMatch ? "\n```" + languageMatch[1] + "\n" : "```";
    })
    .replace(/<\/code[^>]*>/g, "```")
    .replace(/<[^>]*>/g, "")
    .trim();
}

function copyToClipboard() {
  let textElements = Array.from(document.querySelectorAll(".text-base")).map(
    (el) => {
      let clonedEl = el.cloneNode(true); // clone each element

      // remove closedParentDivs inside clonedEl
      const closedElements = clonedEl.querySelectorAll('[data-state="closed"]');
      const closedParentDivs = Array.from(closedElements, (el) =>
        el.closest("div")
      );

      closedParentDivs.forEach((div) => {
        if (div && div.parentNode) {
          div.parentNode.removeChild(div);
        }
      });

      return clonedEl;
    }
  );

  let markdownText = "";
  for (const element of textElements) {
    // skip if current element has child with class .text-base
    if (element.querySelector(".text-base")) continue;

    if (element.querySelector(".whitespace-pre-wrap")) {
      markdownText += `**${
        element.querySelector("img") ? "You" : "ChatGPT"
      }**: ${htmlToMD(
        element.querySelector(".whitespace-pre-wrap").innerHTML
      )}\n\n`;
    }
  }
  navigator.clipboard.writeText(markdownText).then(
    function () {
      console.log("Convo copied to clipboard!");
    },
    function (err) {
      console.error("Can't copy convo: ", err);
    }
  );
}

// create button
const button = document.createElement("button");
button.innerHTML = "Copy to Clipboard";
button.style.position = "fixed";
button.style.top = "10px";
button.style.left = "10px";

// attach copy function to button's click event
button.addEventListener("click", copyToClipboard);

// add button to body
document.body.appendChild(button);