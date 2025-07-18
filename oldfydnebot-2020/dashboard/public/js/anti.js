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
 console.log('%cЧто ты тут делаешь?\nУходи', 'color:#f00;font:bold 26px "Courier New";padding:16px;padding:50px 500px');
 console.log('%cВ противном случае мы можем занести ваш ip+клиент в чс, одумайся', 'color:#f00;font:bold 26px "Courier New";padding:16px;padding:50px 500px');

 setTimeout(consolee, 5000);
 async function consolee() {
    console.log('%cЧто ты тут делаешь?\nУходи', 'color:#f00;font:bold 26px "Courier New";padding:16px;padding:50px 500px');
    console.log('%cВ противном случае мы можем занести ваш ip+клиент в чс, одумайся', 'color:#f00;font:bold 26px "Courier New";padding:16px;padding:50px 500px');
   };
