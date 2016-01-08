var id_dialogInfo="#CommonDialogInfo";

function openDialogInfo(info){
	$(id_dialogInfo).find(">div>span").text(info);
	$(id_dialogInfo).modal("view",{
        speed : 400,
        easing : 'easeInOutQuad',
        animation : 'none',
        position: 'center',
        overlayClose : true
    });
}
function closeDialogInfo(){
	$(id_dialogInfo).modal("close");
}
function openDialogCustom(info,options){
	$(id_dialogInfo).find(">div>span").text(info);
	$(id_dialogInfo).modal("view",{
        speed : options.speed || 400,
        easing : options.easing || 'easeInOutQuad',
        animation : options.animation || 'none',
        position: options.position || 'center',
        overlayClose : options.overlayClose || true
    });
}
