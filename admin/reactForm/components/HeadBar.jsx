var React = require('react');

var HeadBar = React.createClass({
	getDefaultProps:function(){
	    return {
        title:"新窗口",

	    };
	},
  getInitialState: function() {
      return {
          show:this.props.show,
        };
  },
  render: function() {
      return (
        <div  className="base-bg pt05 headbar ub ub-ac  ub-pc pb05">
          <div className="head-icon left" id="nav-left">
              <div className="iconfont white-color icon-zuofan fs20" onclick="location.href='/'"></div>
          </div>
          <div className="tc white-color">{this.props.title}</div>
        </div>
          )
	}
});

module.exports = HeadBar;


