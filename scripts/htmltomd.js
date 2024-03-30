// ==UserScript==
// @name         ChatGPT to MD
// @namespace    http://tampermonkey.net/
// @version      2024-03-29
// @description  It's in the name!
// @author       It's ah-me, Mario!
// @match        https://chat.openai.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=openai.com
// @grant        none
// ==/UserScript==

function htmlToMD(html) {
  return (
    html
      .replace(/<p>/g, "")
      .replace(/<\/p>/g, "\n\n")
      .replace(/<b>/g, "**")
      .replace(/<\/b>/g, "**")
      .replace(/<i>/g, "_")
      .replace(/<\/i>/g, "_")

      // headings
      .replace(/<h1>(.*?)<\/h1>/g, "# $1\n\n")
      .replace(/<h2>(.*?)<\/h2>/g, "## $1\n\n")
      .replace(/<h3>(.*?)<\/h3>/g, "### $1\n\n")
      .replace(/<h4>(.*?)<\/h4>/g, "#### $1\n\n")
      .replace(/<h5>(.*?)<\/h5>/g, "##### $1\n\n")
      .replace(/<h6>(.*?)<\/h6>/g, "###### $1\n\n")

      // TODO: nested lists?
      // lists
      .replace(/<ul>(<li>.*?<\/li>)*<\/ul>/gs, (match) => {
        return match
          .replace(/<li>(.*?)<\/li>/g, "- $1\n")
          .replace(/<.*?>/g, "");
      })
      .replace(/<ol>(<li>.*?<\/li>)*<\/ol>/gs, (match) => {
        let index = 1;
        return match
          .replace(/<li>(.*?)<\/li>/g, (m, item) => `${index++}. ${item}\n`)
          .replace(/<.*?>/g, "");
      })

      // code blocks
      .replace(/<code[^>]*>(.*?)<\/code>/gs, (match, codeContent) => {
        const languageMatch = match.match(/class="[^"]*language-([^"]*)"/);
        const classMatch = match.match(/class="([^"]*)"/);
        if (languageMatch) {
          return "```" + languageMatch[1] + "\n" + codeContent + "\n```\n\n";
        } else if (classMatch) {
          return "```\n" + codeContent + "\n```\n\n";
        } else {
          return "`" + codeContent + "`";
        }
      })

      // remove html tags
      .replace(/<[^>]*>/g, "")

      // unescape html entities
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .trim()
  );
}

function copyToClipboard() {
  let textElements = Array.from(document.querySelectorAll(".text-base")).map(
    (el) => {
      let clonedEl = el.cloneNode(true); // clone each element

      // Remove the closedParentDivs that are inside clonedEl
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
    // Skip if the current element has a child with the class .text-base
    if (element.querySelector(".text-base")) continue;

    if (element.querySelector(".whitespace-pre-wrap")) {
      markdownText += `**${
        element.querySelector("img") ? "You" : "ChatGPT"
      }**:\n\n${htmlToMD(
        element.querySelector(".whitespace-pre-wrap").innerHTML
      )}\n\n`;
    }
  }

  // Check if markdownText is empty
  if (!markdownText || markdownText.trim() === "") {
    alert("No convo yet.");
    return; // Exit the function early
  }

  navigator.clipboard.writeText(markdownText).then(
    function () {
      alert("Convo copied to clipboard!");
    },
    function (err) {
      alert("Failed to copy convo. Check your browser's console for details.");
      console.error("Failed to copy convo: ", err);
    }
  );
}

// create button
const button = document.createElement("button");
button.innerHTML = "Copy Convo";
button.style.position = "fixed";
button.style.top = "17px";
button.style.right = "72px";

// attach copy function to button's click event
button.addEventListener("click", copyToClipboard);

// add button to body
document.body.appendChild(button);
