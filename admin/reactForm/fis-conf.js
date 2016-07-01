/*设置编译范围*/
fis.set('project.files', ['mod/**','components/**','site/**','lib/**']);

/*设置发布路径*/

/*指定模块化插件*/

fis.match('*', {
  deploy: fis.plugin('local-deliver', {
    to: 'D:/nodejs/Imooc/public/admin-ui'
  })
})
fis.hook('commonjs', {
    paths: {
        react: 'mod/react'
    }
});
/*指定哪些目录下的文件执行define包裹*/
fis.match('mod/**', {
  isMod: true
});
fis.match('components/**', {
  isMod: true,
  // packTo: '/staticPub/common/components/components_pkg.js'
});
fis.match('site/**', {
  isMod: true
});
/*模块化加载器配置*/

fis.match('::package', {
  postpackager: fis.plugin('loader', {
   // allInOne: true, //js&css打包成一个文件
    sourceMap: true, //是否生成依赖map文件
    useInlineMap: true //是否将sourcemap作为内嵌脚本输出
  })
});
/*支持react*/
fis.match('*.jsx', {
    rExt: '.js',
    parser: fis.plugin('react', {})
});