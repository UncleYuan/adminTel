var React = require('react');

var PubSub=require('/lib/PubSubJS');
window.PubSub=PubSub;
var InputEle = require('/components/InputEle');
require('/lib/jquery');



var LoginForm = React.createClass({
	getInitialState:function(){
	    return {
	        loading:true,
	        rendData:{},
	        openModal:false,
	        showUpFile1:false,
	        goSubing:false,
	        imgList1:[]
	    };
	},
	componentWillMount:function(){
		var _this=this;
		setTimeout(function(){
			_this.setState({loading:false});
		},500)
	},
	goSub:function(e){
		var _this=this;
		this.setState({goSubing:"正在登陆中..."});
		$.post('/index.php?g=Member&m=Public&a=login',$('#loginForm').serialize(),function(data){
			alert(data.info)
			_this.setState({goSubing:false});
			if(data.code=="SUCCESS"){

			}
		},'json')

	},
    render: function () {
    	
	        return (
	        	<div className="reg-mid-in">
				    <div className="fs24 tc base-color mt30 pb30 ubb1 fuzzy-border">商家登陆</div>
				    <div className="mb30 w380 mAuto">
				        <InputEle  ref="uname" title="您的用户名/手机号" name="uname" />
				        <InputEle  ref="password" title="您的密码" name="password" ispwd="true" />
				        
			
				        <div className="pt30 pb30">
				            <a className="btn base-btn btn-block ajax-btn block" id="ajax-btn" onClick={this.goSub} >{this.state.goSubing?this.state.goSubing:"立即登陆"}</a>
				        </div>
				        <div className="pb10 ">
				            <a className="base-color fr" href="/index.php?g=Member&amp;m=Public&amp;a=getpwd&amp;step=2">忘记密码</a>
				            <a className="base-color" href="/index.php?g=Member&amp;m=Public&amp;a=reg">立即注册</a>
				        </div>
				    </div>
				</div>

	        );
        }
    
});
	
	React.render(
		<LoginForm />,
	  	document.getElementById('loginForm')
	);	
	