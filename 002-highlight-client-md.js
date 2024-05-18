window.onload = function () {
  const elements = document.querySelectorAll(".rendered-markdown");

  elements.forEach((element) => {
    let htmlString = element.innerHTML;
    const regex = /&lt;MODELGENERATED&gt;([\s\S]*?)&lt;\/MODELGENERATED&gt;/g;

    htmlString = htmlString.replace(
      regex,
      '<span style="background:rgba(255,255,0,.1);display:inline-block;">$1</span>'
    );

    element.innerHTML = htmlString;
  });
};
