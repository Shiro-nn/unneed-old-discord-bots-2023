window.addEventListener("load", function(event) {
    $('#show_mobile_click').on('click', function (ev) {
        const el = document.getElementById('show_mobile');
        if(el.className.includes(' show')) el.className = el.className.replace(' show', '');
        else el.className += ' show';
    });
    $('#show_pc_click').on('click', function (ev) {
        const el = document.getElementById('show_pc');
        if(el.className.includes(' show')) el.className = el.className.replace(' show', '');
        else el.className += ' show';
    });
    document.addEventListener("click", (ev)=> {
        try{
            const el = document.getElementById('show_pc');
            if(ev.path.filter(x => x.id == 'show_pc' || x.id == 'show_pc_click').length < 1 && el.className.includes(' show')){
                el.className = el.className.replace(' show', '');
            }
        }catch{}
        try{
            const el = document.getElementById('show_mobile');
            if(ev.path.filter(x => x.id == 'show_mobile' || x.id == 'show_mobile_click').length < 1 && el.className.includes(' show')){
                el.className = el.className.replace(' show', '');
            }
        }catch{}
    });
});