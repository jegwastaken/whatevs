window.onload = function () {
  const elements = document.querySelectorAll(".rendered-markdown");

  elements.forEach((element) => {
    let htmlString = element.innerHTML;

    const regex1 = /&lt;MODELGENERATED&gt;([\s\S]*?)&lt;\/MODELGENERATED&gt;/g;
    const regex2 = /<span class="hljs-tag">&lt;<span class="hljs-name">MODELGENERATED<\/span>&gt;<\/span>([\s\S]*?)<span class="hljs-tag">&lt;\/<span class="hljs-name">MODELGENERATED<\/span>&gt;<\/span>/g;
    const regex3 = /<span class="hljs-operator">&lt;<\/span>MODELGENERATED<span class="hljs-operator">&gt;<\/span>([\s\S]*?)<span class="hljs-operator">&lt;<\/span><span class="hljs-operator">\/<\/span>MODELGENERATED<span class="hljs-operator">&gt;<\/span>/g;

    htmlString = htmlString.replace(regex1, '<span style="background:rgba(255,255,0,.1);display:inline-block;">$1</span>');
    htmlString = htmlString.replace(regex2, '<span style="background:rgba(255,255,0,.1);display:inline-block;">$1</span>');
    htmlString = htmlString.replace(regex3, '<span style="background:rgba(255,255,0,.1);display:inline-block;">$1</span>');

    element.innerHTML = htmlString;
  });
};
