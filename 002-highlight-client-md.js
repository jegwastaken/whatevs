window.onload = function () {
  const elements = document.querySelectorAll(".rendered-markdown");

  elements.forEach((element) => {
    let htmlString = element.innerHTML;
    // yellow highlight
    const openingSpan =
      '<span style="background:rgba(255,255,0,.1);display:inline-block;">';

    // replace ~~~~MODEL-GENERATED~~~~ with `openingSpan` tag
    htmlString = htmlString.replace("~~~~MODEL-GENERATED~~~~", openingSpan);
    htmlString = htmlString.replace(
      /~~~~\s*<span class="(.*?)">\s*MODEL<\/span>\s*-\s*<span class="(.*?)">GENERATED<\/span>\s*~~~~/g,
      openingSpan
    );

    // replace ~~~~/MODEL-GENERATED~~~~ with </span>
    htmlString = htmlString.replace("~~~~/MODEL-GENERATED~~~~", "</span>");
    htmlString = htmlString.replace(
      /~~~~\/\s*<span class="(.*?)">\s*MODEL<\/span>\s*-\s*<span class="(.*?)">GENERATED<\/span>\s*~~~~/g,
      "</span>"
    );

    element.innerHTML = htmlString;
  });
};
