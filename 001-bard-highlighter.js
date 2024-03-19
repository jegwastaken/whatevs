window.onload = function() {
    const table = document.querySelector("table");
    const regex = /(&lt;CO-CREATION-SELECTED-TEXT&gt;)([\s\S]*?)(&lt;\/CO-CREATION-SELECTED-TEXT&gt;)/g;
    table.innerHTML = table.innerHTML.replace(regex, 
        '<span style="color:blue;font-weight:bold;">$1</span><br><span style="background-color:#e0f7fa;">$2</span><br><span style="color:blue;font-weight:bold;">$3</span>');
};
