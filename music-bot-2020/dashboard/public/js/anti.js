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
document.ondragstart = false;
//запрет на перетаскивание 
document.onselectstart = false;
//запрет на выделение элементов страницы
document.oncontextmenu = false;
console.clear();
console.log('%cЧто ты тут делаешь?\nУходи', 'color:#f00;font:bold 26px "Courier New";padding:16px;padding:50px 500px');
setTimeout(console.clear(), 1000);
setTimeout(console.clear(), 1500);
setTimeout(console.clear(), 2000);
setTimeout(consolee, 3000);
async function consolee() {
  try{
    document.getElementById("wm-ipp-base").outerHTML = ``;
  }catch{}
};