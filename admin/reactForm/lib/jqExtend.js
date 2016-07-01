 define(["jquery"], function($) {
        $.extend({
                indexOf:function(arr, obj) {  
                    for(var i=0; i<arr.length;i++) {
                    if (arr[i]==obj)return i;
                    }
                    return -1;
                },
                removeArr:function(arr, obj) {  
                    var index = $.indexOf(arr,obj);
                    if (index>-1) {
                        arr.splice(index,1);          
                    }   
                },
                jqAlert:function(o){
                    var agm={
                       showClass:'bounce',
                       noBtn:false,
                       yesClose:true,
                       cont:'',
                       head:false,
                       footerBtn:{
                          warning:{name:'确定',hide:true}
                        }
                    }
                    var ops=$.extend(agm,o);
                    ops.height=$(window).height();
                    var tel='<div id="zc-modal-alert" class="modal in" style="" ><div class="modal-backdrop in" style="height:<%=height%>px"></div><div class="modal-dialog animated <%=showClass%>"><div class="modal-content"><% if(head){%><div class="modal-header"><button type="button" class="bootbox-close-button close" data-dismiss="modal" aria-hidden="true">×</button><h4 class="modal-title"><%=head %></h4></div><% }%><div class="modal-body"><% if(!head){%><button data-dismiss="modal" class="bootbox-close-button close" type="button" style="margin-top: -10px;">×</button><%}%><div class="bootbox-body"><%=cont%></div></div><div class="modal-footer"><% for(var key in footerBtn){  %><button class="btn btn-<%=key%>" type="button" <% if(footerBtn[key].hide){%> data-dismiss="modal" <%}%> data-alertBtn=true data-bb-handler="confirm"><%=footerBtn[key].name%></button><% } %> </div></div></div></div>';
                    var bt=baidu.template;                
                    var html=bt(tel,ops);
                    $('body').append(html);
                    oAlert=$('#zc-modal-alert');
                    btn=oAlert.find('[data-alertBtn=true]');
                    oAlert.jqModal({show:true,hideFn:function(){
                       oAlert.remove();
                    }});
                    var i=0;
                    for(var key in ops.footerBtn){
                      if(ops.footerBtn[key].Fn){
                          btn.eq(i).click(ops.footerBtn[key].Fn);
                      }
                      i++;
                    }
                },
                scrolltobottom:function(o){
                    if(typeof(o)=="function"){
                        var obj=$(window);
                        var wr=$(document);
                        var ex=0;

                    }else if(typeof(o)=="object"){
                        var obj=typeof(o.tar)=="object"?o.tar:$(o.tar);
                        var wr=typeof(o.wrap)=="object"?o.wrap:$(o.wrap);
                        var ex=o.ex;
                        var o=o.fn;
                    }
                    
                    $(obj).scroll(function(){ 
                        if(obj.height()+obj.scrollTop()+ex>=wr.height()){
                            o();
                        }
                    })
                },
                showProgress:function(arg){
                    var agm={
                        title:"请稍等..",
                        text:'正在加载中..'
                    }
                    var ops=$.extend(agm,arg);
                    if($('#showProgress').size()){
                        $('#showProgress').html('<h3 class="tit">'+ops.title+'</h3><div class="cont">'+ops.text+'</div>');
                    }
                    $('body').append('<div class="showProgress fadeInUp" id="showProgress"><div class="spinner"><div class="cube1"></div><div class="cube2"></div></div><h3 class="tit">'+ops.title+'</h3><div class="cont">'+ops.text+'</div></div>')
                },
                hideProgress:function(){
                    $('#showProgress').remove();
                },
                toast:function(arg){
                    var agm={
                        duration:2500,
                        msg:'',
                        hideClass:'fadeOutDownFast',
                        showClass:'fadeInUpFast'
                    }
                    var ops=$.extend(agm,arg);
                    if($('#toast').size()){
                        $('#toast').html('<div class="msg">'+ops.msg+'</div>');
                    }
                    $('body').append('<div class="toast '+ops.showClass+'" id="toast"><div class="msg">'+ops.msg+'</div></div>')
                    setTimeout(function(){
                        $('#toast').removeClass(ops.showClass).addClass(ops.hideClass);
                        setTimeout(function(){
                            $('#toast').remove()
                        },500)
                    },ops.duration)
                },
                hideToast:function(){
                    $('#toast').remove();
                },
                hashToObj:function(str){
                    str=str.replace('#','');
                    arr=str.split('&');
                    obj={};
                    for(var i=0;i<arr.length;i++){
                        var new_arr=arr[i].split('=');
                        obj[new_arr[0]]=new_arr[1];
                    }
                    return obj;
                },
                getQueryString:function(name) { 
                    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
                    var r = window.location.search.substr(1).match(reg); 
                    if (r != null) return unescape(r[2]); return null; 
                }
            });            
    
    }
)