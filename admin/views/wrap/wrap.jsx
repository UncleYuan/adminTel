var React = require('react');
var $=require('jquery');
window.username="正在加载中...";
var Header=require('../../public_views/Header');
var Sider=require('../../public_views/Sider');
var Loading=require('../../components/Loading');
var ReactRouter = require('ReactRouter');

var Router=ReactRouter.Router;
var Route=ReactRouter.Route;
var Link=ReactRouter.Link;
var IndexRoute=ReactRouter.IndexRoute;
var Redirect=ReactRouter.Redirect;
var browserHistory=ReactRouter.browserHistory;


function typeTree(result, re_id){

   var rtn = [];
   var i;   
   for(i in result){               
      if(result[i].parent_id == re_id) {
      	result[i].icon="tasks"
         result[i].children = typeTree(result, result[i].id);
         rtn.push(result[i]);
      } 
   }
   return rtn;
}
function toggleSider(){

	$('.toggle-btn').click(function(){
		      var body = $('body');
		      var bodyposition = body.css('position');

		      if(bodyposition != 'relative') {

		         if(!body.hasClass('left-side-collapsed')) {
		            body.addClass('left-side-collapsed');
		   
		            $(this).addClass('menu-collapsed');
		         } else {
		            body.removeClass('left-side-collapsed chat-view');

		            $(this).removeClass('menu-collapsed');
		         }
		      } else {
		         if(body.hasClass('left-side-show'))
		            body.removeClass('left-side-show');
		         else
		            body.addClass('left-side-show');
		      }

		});
}

var Wrap = React.createClass({
	getInitialState:function() {
	    return {
	       menuData:[],
	       userInfo:{
			    "username": "",
			    "email": "",
			    "avatar": "",
			    "user_id": "",
			    "token": ""
		    }
	    };
	},
	componentWillMount:function() {
		var _this=this;
	    $.get('/system/my-menu.do',function(data){
	    	var arr1=[{name:"首页",icon:"home",url:"#",children:[]}]
	      	var newArr=arr1.concat(typeTree(data.data.data,0));
	    	_this.setState({menuData:newArr})
	    },'json')
	    $.get('/auth.do',function(result){
	    	if (result.code=="SUCCESS") {
	    		_this.setState({userInfo:result.data})
	    	}else{
	 			alert(data.info);
	    	}
	    },'json')
	},
	componentDidMount:function() {
	    toggleSider();
	},
    render: function () {
    	var pathname = this.props.location.pathname;
    
	    return (
	        <section>
   				<Sider menuData={this.state.menuData} userInfo={this.state.userInfo}  />
					<div className="main-content" >
				        <Header  userInfo={this.state.userInfo}/>
				        <div>
							{React.cloneElement(this.props.children || <div/>, { key:pathname })}
				        </div>
				        <footer>
				            2016 &copy; POWER BY MRP AND NLJ
				        </footer>
				    </div>
				</section>
	        );
    }
});


var routes = {
  component: Wrap,
  childRoutes: [
    
    { path: '/system/resource-list.html',
      getComponent: function(nextState, cb) {
        require.ensure([], function(require) {
          cb(null, require('../../pages/ResourceList'))
        })
      }
    },
    { path: '/system/resource-list1.html',
      getComponent: function(nextState, cb) {
        require.ensure([], function(require) {
          cb(null, require('../../components/Header'))
        })
      }
    },
    { path: '/',
      getComponent: function(nextState, cb) {
        return require.ensure([], function(require){

          cb(null,require('../../pages/Index'))
        })
      },
      indexRoute: {
        getComponent: function(nextState, cb){
   
          return require.ensure([], function(require) {
            cb(null, require('../../pages/Index'))
          })
          return cb()
        }
      }
    }

  ]
}


ReactDOM.render((
  <Router location="hash" routes={routes}>
   
 </Router>
), document.getElementById('wrap'))