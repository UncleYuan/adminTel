require.config({
    baseUrl: '/public/admin-ui/',
    shim: {
      '../../ueditor/ueditor.config': { exports: 'UE_Config' },
      '../../ueditor/ueditor.all.min': { exports: 'UE' },
      '../../ueditor/lang/zh-cn/zh-cn': [''],
      'ueditor.zh-cn': [''],
    },
    paths:{
    	"webuploader":'lib/webuploader/webuploader.min',
    	"jquery": "lib/jquery",
    	"site/list.jsx": "site/list",
    	"site/public.jsx": "site/public",
    	"components/RenderForm.jsx": "components/RenderForm",
    	"components/Modal.jsx": "components/Modal",
    	"components/Sider.jsx": "components/Sider",
    	"components/Header.jsx": "components/Header",
    	"components/CheckRadio.jsx":"components/CheckRadio",
		"components/SelUpImg.jsx":"components/SelUpImg",
		"components/SetMobileCont.jsx":"components/SetMobileCont",
		"components/DropdownMenu.jsx":"components/DropdownMenu",
		"components/Alert.jsx":"components/Alert",
		"components/InputEle.jsx":"components/InputEle",
		"components/UpImgFileM.jsx":"components/UpImgFileM",
		"components/GetMsgCode.jsx":"components/GetMsgCode",
		"components/Loading.jsx":"components/Loading",
        "components/HtmlInputEle.jsx":"components/HtmlInputEle"
    }
});