var React = require('react');
require('mod/ueditor.config');
require('mod/ueditor.all');
require('mod/zh-cn');
require('/lib/jquery');
var editor=null;
var HtmlInputEle = React.createClass({

  componentDidMount:function(){
    editor = UE.getEditor(this.props.name+"Dom", {
             //������
                toolbars: [[
                    'fullscreen', 'source', '|', 'undo', 'redo', '|',
                    'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch',  
                    '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                    'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                    'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
                    'directionalityltr', 'directionalityrtl', 'indent', '|',
                    'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|', 
                    'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
                    'simpleupload',  
                    'horizontal', 'date', 'time',  
                ]]
                ,lang:"zh-cn"
                //����
                ,'fontfamily':[
                   { label:'',name:'songti',val:'����,SimSun'},
                   { label:'',name:'kaiti',val:'����,����_GB2312, SimKai'},
                   { label:'',name:'yahei',val:'΢���ź�,Microsoft YaHei'},
                   { label:'',name:'heiti',val:'����, SimHei'},
                   { label:'',name:'lishu',val:'����, SimLi'},
                   { label:'',name:'andaleMono',val:'andale mono'},
                   { label:'',name:'arial',val:'arial, helvetica,sans-serif'},
                   { label:'',name:'arialBlack',val:'arial black,avant garde'},
                   { label:'',name:'comicSansMs',val:'comic sans ms'},
                   { label:'',name:'impact',val:'impact,chicago'},
                   { label:'',name:'timesNewRoman',val:'times new roman'}
                ]
                //�ֺ�
                ,'fontsize':[10, 11, 12, 14, 16, 18, 20, 24, 36]
                , enableAutoSave : false
                , autoHeightEnabled : false
                , initialFrameHeight: this.props.height
                , initialFrameWidth: '100%'
                ,readonly:this.props.disabled,
                initialFrameHeight:320
        });
        var me = this;
        editor.ready( function( ueditor ) {
            var value = me.props.value?me.props.value:'<p></p>';
            editor.setContent(value); 
        }); 
  },
  componentWillReceiveProps:function(nextProps){
    if(nextProps.value!=this.props.value){
      editor.setContent(nextProps.value);
    }
  },
  componentWillUnmount:function(){

    editor.destroy();  
    $('#'+this.props.name+"Dom").remove();
  },
  render: function() {
    return( 

    <div className="form-item form-group ">
     <label >{this.props.title}</label>
      <script id={this.props.name+"Dom"} name="content" style={{"height":"400px"}} type="text/plain"></script>
    </div>
      )
	}
});

module.exports = HtmlInputEle;