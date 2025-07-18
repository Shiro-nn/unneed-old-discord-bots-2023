window.oncontextmenu = function () {
  return false;
}
document.onkeydown = function (e) { 
  if (window.event.keyCode == 123 ||  e.button==2)
  return false;
};
document.onkeydown = function(e) {
  if(event.keyCode == 123) {
    return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){
    return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){
    return false;
  }
  if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){
    return false;
  }
  if(e.ctrlKey && e.keyCode == 'S'.charCodeAt(0)){
    return false;
  }
  if(e.ctrlKey && e.keyCode == 'P'.charCodeAt(0)){
    return false;
  }
}
setInterval(() => {
  try{
    document.getElementById("wm-ipp-base").outerHTML = ``;
  }catch{}
}, 1000);
document.ondragstart = false;
document.onselectstart = false;
document.oncontextmenu = false;

try{
  $(document).ready(function () {
      $.getScript("https://cdn.scpsl.store/scpsl.store/js/md.js", function() {
      document.querySelectorAll(".md_change").forEach((element) => element.innerHTML = marked(element.innerHTML));
    });
  });
}catch{}