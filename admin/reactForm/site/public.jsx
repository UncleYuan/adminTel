var React = require('react');

var PubSub=require('/lib/PubSubJS');
window.PubSub=PubSub;
var Header = require('/components/Header');
var Sider = require('/components/Sider');
require('/lib/jquery');



React.render(
	<Header />,
	document.getElementById('headerBox')
);	
React.render(
	<Sider openMenuId="1" />,
	document.getElementById('siderBox')
);	
		

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