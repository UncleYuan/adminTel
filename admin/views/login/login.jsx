var React = require('react');
var $=require('jquery');


var LoginForm = React.createClass({
	getInitialState:function(){
	    return {
	    	username:'',
	    	password:'',
	    	verify_code:'',
	    	code_time:(new Date()).valueOf(),
	    	isPhone:true
	    };
	},
	componentWillMount:function(){
		var _this=this;
		
	},
	goSub:function(e){
		var _this=this;
		this.setState({goSubing:"正在登陆中..."});
		$.post('/auth.do',$(this.refs.form).serialize(),function(data){
			alert(data.info);
			_this.setState({goSubing:false});
			if(data.code=="SUCCESS"){
				location.href="/"
			}
		},'json')

	},
	inputChange:function(name,event){
		var setVal={};
		setVal[name]=event.target.value;

		this.setState(setVal)
		//console.log(event,name)
	},
	onBlurUname:function(){
		if (!(/^1[3|4|5|7|8]\d{9}$/.test(this.state.uname))){
			this.setState({isPhone:false});
		}else{
			this.setState({isPhone:true});
		}
	},
	goToGetPsw:function(){
		location.href='/index.php?a=reg';
	},
	reChangeCode:function(){
		this.setState({code_time:(new Date()).valueOf()})
	},
    render: function () {

	        return (
	        	
	            <form className="form-signin" ref="form" action="index.html">
			        <div className="form-signin-heading text-center">
			            <h1 className="sign-title">登陆系统</h1>
			            <img src="/admin/images/login-logo.png" alt=""/>
			        </div>
			        <div className="login-wrap">
			            <input type="text" value={this.state.username} onChange={this.inputChange.bind(this,"username")} className="form-control" name="username" placeholder="用户名" autofocus />
			            <input name="password" value={this.state.password} onChange={this.inputChange.bind(this,"password")} type="password" className="form-control" placeholder="密码" />
			            <div  className="check_code_box" >
			            	<img  className="check_code" onClick={this.reChangeCode} src={"/system/verify.do?width=100&height=37&font_size=20&code_time="+this.state.code_time} />
			            	<input  type="text" value={this.state.verify_code} onChange={this.inputChange.bind(this,"verify_code")} className="form-control" name="verify_code" placeholder="验证码"  />
			            </div>
			            

			            <span className="btn btn-lg btn-login btn-block fs16"  onClick={this.goSub}>
			                {this.state.goSubing ?<div className="p5 inline-block">正在登录中...</div>:<i className="fa fs32 fa-check"></i>}
			            </span>
			        </div>
			    </form>
	        );
        }
});

	ReactDOM.render(
		<LoginForm />,
	  	document.getElementById('wrap')
	);	
	