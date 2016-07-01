var React = require('react');

var Panel = React.createClass({
  getDefaultProps:function(){
      return {
        title:"新窗口",
        type:'info',
        noWrap:false
      };
  },
  componentWillMount:function(){
   
   
  },
  render: function () {
      var bodyHtml=this.props.noWrap?this.props.children:<div className="panel-body">{this.props.children}</div>;
      return( 
        <div className={"panel panel-"+this.props.type} >
          <div className="panel-heading">
            <h3 className="panel-title">{this.props.title}</h3>
          </div>
          {bodyHtml}
        </div>
      );
    }
});

module.exports = Panel;


