window.onload = function () {
  const els = document.querySelectorAll('[data-testid=fields-text]');

  els.forEach((element) => {
    let htmlString = element.innerHTML;

    const regexes = [
      /&lt;MODELGENERATED&gt;([\s\S]*?)&lt;\/MODELGENERATED&gt;/g,
      /<MODELGENERATED>([\s\S]*?)<\/MODELGENERATED>/g,
      /<span class="[\w -]*">&lt;<span class="[\w -]*">MODELGENERATED<\/span>&gt;<\/span>([\s\S]*?)<span class="[\w -]*">&lt;\/<span class="[\w -]*">MODELGENERATED<\/span>&gt;<\/span>/g,
      /<span class="[\w -]*">&lt;<\/span>MODELGENERATED<span class="[\w -]*">&gt;<\/span>([\s\S]*?)<span class="[\w -]*">&lt;<\/span><span class="[\w -]*">\/<\/span>MODELGENERATED<span class="[\w -]*">&gt;<\/span>/g,
    ];

    regexes.forEach((regex) => {
      htmlString = htmlString.replace(
        regex,
        '<span style="background:rgb(0, 255, 255, 0.15);display:inline-block;">$1</span>'
      );
    });

    element.innerHTML = htmlString;
  });

  const spans = document.querySelectorAll('span');

  spans.forEach((span) => {
    if (span.style.whiteSpace === 'pre-wrap') {
      span.style.overflowWrap = 'break-word';
    }
  });
};
