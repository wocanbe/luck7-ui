# css 规范

## 目录约定
 - common: 通用组件，不依赖皮肤（颜色字体大小等皮肤配置项），可以单独引用
    css类名约定: lc-，如lc-row，lc-col-1，lc-icon-warn
 - base.scss: 公用样式
 - _tool.scss: 公用sass方法

## 补充
 - 一般的vue组件，样式推荐使用CSS Modules用法，不推荐放到css文件夹
 - 需要关联皮肤的vue组件，css需要写到皮肤里面，皮肤单独引用，类名推荐规范: lt-组件名-用处等，如lt-tips，lt-tips-title， lt-tips-btn