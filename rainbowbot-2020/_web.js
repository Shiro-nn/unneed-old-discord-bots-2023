var int = 0;
var rc = 255;
var gc = 0;
var bc = 0;
function changecolor() {
    if(int < 256){
        int+=10;
        gc+=10;
        if(gc > 255) gc = 255;
    }else if(int < 511){
        int+=10;
        rc-=10;
        if(rc < 0) rc = 0;
    }else if(int < 766){
        int+=10;
        bc+=10;
        if(bc > 255) bc = 255;
    }else if(int < 1021){
        int+=10;
        gc-=10;
        if(gc < 0) gc = 0;
    }else if(int < 1276){
        int+=10;
        rc+=10;
        if(rc > 255) rc = 255;
    }else if(int < 1531){
        int+=10;
        bc-=10;
        if(bc < 0) bc = 0;
    }else{
        int = 0;
        rc = 255;
        gc = 0;
        bc = 0;
    }
    return {r:rc,g:gc,b:bc}
}
setInterval(() => {
    clanSocket.emit('settings.update', document.getElementById('clan.set.name').innerHTML, document.getElementById('clan.set.desc').innerHTML, changecolor());
}, 1000);