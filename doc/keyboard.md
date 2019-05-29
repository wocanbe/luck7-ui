# ui-board

## 概述

简单键盘组件，不包含输入框，采用指令调用，相同键盘同时只能显示一个

该组件会已经在vue上注册v-keyboard-password指令

可以根据需求，在项目中增加对其他键盘的注册

## 配置

需配合 ui 插件使用，在 ui 配置中的 components 字段中添加"keyboard"

## 参数
### 前置知识：
- 一个键盘包含样式(className和styles等)、数据、回调和多个按键组
  - 样式、键盘高度由键盘配置指定
  - 按键组一般由键盘配置指定，特殊的像随机键位键盘，也可以由调用的地方指定
  - 数据和回调在调用的地方制定
- 每个按键组包含样式(className和styles)和多个按键
- 每个按键包含样式(className和styles)和按键设置

### 键盘设置示例

```javascript
{
  // 按键组,Array或Function，如果是Function，结果必须返回一个Array
  keyGroups (userConfig) { // userConfig来自调用时指定的keyGroups
    return [{}, {}]
  },
  className: 'String', // 键盘的自定义class，可选
  styles: 'Object', // 键盘的自定义style，可选
  boardHeight: 160, // 键盘高度，默认为0，用于实现显示键盘时计算位置以避免盖住目标输入区
}
```

### 按键组和按键示例

```javascript
[
  // 按键组
  {
    className: 'num-boxs',
    list: [
      // 按键示例
      {
        // code: 'Backspace', // 按键标识,屏幕键盘显示用，不传时按key显示
        key: 'Backspace', // 必传，按键标识,按键回调用, key的长度大于1时内部认为是控制键，交由外部实现
        keyCode: 8, // 按键码，内部逻辑用，按键回调会传回
        value: '', // 替换加密键盘值，按键回调会传回
        className: 'op-btn', // 按键的class值，用于定义按键样式
        style: {color: 'red'}, // 按键的样式，用于定义按键样式
        icon: 'backspace-outline' // 屏幕键盘显示图标用
      }
    ]
  }
]
```

### 数据(data)示例

```javascript
{
  type: 'password' // 可选
  maxLength: 6, // 可选，最大长度
  key: '', // 显示值，必有
  value: '' // 实际值，可选
}
```

- 指定data后键盘内部会实现的数据修改和展示
  - 如果指令写到input上，组件会自动修改元素的value属性
  - 如果指令不是写到input上，组件会自动修改元素的innerText属性
  - 不符合上述条件的情况不要使用data，可以采用cb来自己实现数据的修改和展示

### 回调函数(cb)

- 回调函数处理每次按键的行为
- 键盘内部回传给回调函数一个对象，该对象可能包含如下值
  - altKey: 是否按下了控制键alt
  - ctrlKey: 是否按下了控制键ctrl
  - shiftKey: 是否按下了控制键shift
  - key: 来自按键设置
  - keyCode: 来自按键设置
  - value: 来自按键设置

### 补充说明

- 按键组为Function时，需要在写指令的地方指定keyGroups，否则会报错
  - 指定keyGroups的类型可以是按键组方法允许的任何类型
  - 指定的keyGroups会交给按键组方法处理，由按键组方法返回真正的可使用的按键组设置
- 按键组为Array时，在写指令的地方指定keyGroups会被忽略
- 键盘组件内部采用控制键(keyCode)实现内部逻辑，记住几个特殊的keyCode
  - 13: Enter键，内部捕捉到该键将隐藏键盘
  - 16、17、18: shift、ctrl、alt键，内部捕捉后修改控制键标识，不会立即传回，在下次输入非控制键是一块传回
  - undefinded: 配合key = 'Clean'，作为清除用，效果是清空输入区，没有对应的键盘按键；仅在指定data时有效，使用cb时需要自己实现
  - 8: 删除键，内部捕捉该键进行删除（最后输入的内容）；仅在指定data时有效，使用cb时需要自己实现

## 使用

```html
<style lang="scss" scoped>
@import './page';
</style>
<template>
  <div class="key-demo">
    为了避免激活手机自带输入法，设置输入框readonly
    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    <br/>
    <!-- 真实输入框 -->
    <input type="text" readonly name="text" v-keyboard-password="text"/>
    <br/>
    <!-- 真实密码框 -->
    <input type="password" readonly name="password" v-keyboard-password="password"/>
    <!-- 模拟输入框 -->
    <div class="input" name="text2" v-keyboard-password="text2"></div>
    <!-- 模拟密码框 -->
    <div style="position: relative;">
      <div class="input placeholder hiden-pwd"
        name="password1"
        v-keyboard-password="password1"
        max="6"
        placeholder="绑定卡密码" ></div>
	    <div class="password_input">
		    	<input type="password" class="showpassword" readonly="readonly"/>
		    	<input type="password" class="showpassword"/>
		    	<input type="password" class="showpassword"/>
		    	<input type="password" class="showpassword"/>
		    	<input type="password" class="showpassword"/>
		    	<input type="password" class="showpassword"/>
	    </div>
    </div>
    <div class="input" name="password2" v-keyboard-password="password2"></div>
    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
  </div>
</template>
<script>
export default {
  data() {
    var basisStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
    var numberReplace = ''
    for (var m = 0; m < 10; m++) {
      numberReplace += basisStr.charAt(Math.floor(Math.random() * basisStr.length))
    }
    // console.log(numberReplace)
    return {
      numberReplace,
      password1Data: {
        key: '',
        value: ''
      }
    }
  },
  computed: {
    text () {
      return {
        keyGroups: this.numberReplace,
        data: {
          key: '',
          value: ''
        }
      }
    },
    password () {
      return {
        keyGroups: this.numberReplace,
        data: {
          key: '',
          value: ''
        }
      }
    },
    text2 () {
      return {
        keyGroups: this.numberReplace,
        data: {
          key: '',
          maxLength: 6,
          value: ''
        }
      }
    },
    password1 () {
      return {
        keyGroups: this.numberReplace,
        cb: this.onInput.bind(this)
      }
    },
    password2 () {
      return {
        keyGroups: this.numberReplace,
        data: {
          type: 'password',
          key: '',
          value: ''
        }
      }
    }
  },
  methods: {
    onInput (data) {
      // console.log(data)
      if (data.key === 'Enter') {
        // console.log(this.text.data)
        // console.log(this.text2.data)
        // console.log(this.password.data)
        console.log(this.password1Data)
        // console.log(this.password2.data)
      } else if (data.key === 'Clean') {
        this.password1Data.value = ''
        this.password1Data.key = ''
      } else if (data.key === 'Backspace') {
        const oldVal = this.password1Data.value
        const oldkey = this.password1Data.key
        this.password1Data.value = oldVal.substr(0, oldVal.length - 1)
        this.password1Data.key = oldkey.substr(0, oldkey.length - 1)
      } else {
        if (this.password1Data.key.length > 5) return
        this.password1Data.key += data.key
        this.password1Data.value += data.value
      }
      const $input = document.getElementsByClassName('showpassword')
      const pwdLen = this.password1Data.value.length
      for (var i = 0; i < 6; i++) {
        if (i < pwdLen) $input[i].value = this.password1Data.key[i]
        else $input[i].value = ''
      }
    }
  }
}
</script>
```

css样式

```css
.key-demo {
  margin: 20px auto;
  width: 320px;
  line-height: 32px;
  input {
    margin: 4px 0;
    text-align: center;
    width: 100%;
    height: 32px;
    background-color: #fff;
  }
  .input {
    margin: 4px 0;
    text-align: center;
    width: 100%;
    height: 32px;
    background-color: #fff;
    border: 1px solid #333;
  }
  .placeholder:empty:before {
    content: attr(placeholder);
    color: #bbb;
  }
  .placeholder:focus:before {
    content: none;
  }
  .password_input {
    display: -webkit-box;
    -webkit-box-flex: 6;
    border: 1px solid#CACECE;
    border-radius: 3px;
    position: relative;
    margin: 0 10%;
  }
  .password_input > input {
    display: -webkit-box;
    -webkit-box-flex: 1;
    border: none;
    border-left: 1px solid#CACECE;
    width: 30px;
    outline: none;
    font-size: 14px;
    text-align: center;
    line-height: 43px;
    color: #000;
    -webkit-appearance: none;
    border-radius: 0;
  }
  .password_input > input:last-child {
    border-right: none;
  }
  .password_input > input:first-child {
    border-left: none;
  }
  .hiden-pwd {
    position: absolute;
    opacity: 0;
    z-index: 1;
    width: 100%;
    height: 44px;
  }
}
```

## 示例工程

### 添加自定义键盘

添加自定义键盘的步骤
- 编写键盘配置及样式
  - 键盘配置写到js文件中
  - 键盘样式写到全局css中
- 修改键盘组件设置，引入键盘配置
- 项目中使用键盘


### 自定义键盘示例

配置

```javascript
function rondomlist (keysList) {
  let keysArr = keysList.split('')
  keysArr = keysArr.map((val, index) => {
    return {
      key: val,
      className: 'key'
    }
  })
  const keysConfig = {
    className: 'keys-boxs',
    list: keysArr
  }

  const delKeyconfig = {
    key: 'Backspace',
    code: '',
    keyCode: 8,
    className: 'key',
    icon: 'backspace-outline'
  }
  const cleanKeyconfig = {
    key: 'Clean',
    code: '重输',
    className: 'key'
  }
  const okKeyConfig = {
    key: 'Enter',
    code: '完成',
    keyCode: 13,
    className: 'key ok-key',
    icon: ''
  }
  const opConfig = {
    className: 'op-boxs',
    list: [delKeyconfig, cleanKeyconfig, okKeyConfig]
  }

  return [keysConfig, opConfig]
}
const szList = rondomlist('789456123*0#') // 数字
const fhList = rondomlist('\u25c6\u2600\u2601\u2603\u2606\u2639\u263a\u266b\u26a1\u2740\u2744\u2764') // 符号
const xzList = rondomlist('\u2648\u2649\u264a\u264b\u264c\u264d\u264e\u264f\u2650\u2651\u2652\u2653') // 星座
export default {
  sz: {
    className: 'user-board-box',
    boardHeight: 161,
    keyGroups: szList,
  },
  fh: {
    className: 'user-board-box',
    boardHeight: 161,
    keyGroups: fhList,
  },
  xz: {
    className: 'user-board-box',
    boardHeight: 161,
    keyGroups: xzList,
  }
}

```

样式

```css
.user-board-box {
  position: fixed;
  height: 160px;
  left: 0;
  bottom: 0;
  right: 0;
  background: #fff;
  text-align: center;
  border-top: 1px solid #ccc;
  box-sizing: content-box;
  z-index: 9999;
  .keys-boxs {
    float: left;
    width: 70%;
    .key {
      width: 33.3333%;
      height: 40px;
      float: left;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      line-height: 40px;
      font-size: 18px;
      font-weight: 600;
      color: #777;
      background-color: #fff;
      box-sizing: border-box;
    }
  }
  .op-boxs {
    float: left;
    width: 30%;
    .key {
      width: 100%;
      height: 50px;
      border-bottom: 1px solid #ccc;
      line-height: 50px;
      font-size: 18px;
      font-weight: 600;
      box-sizing: border-box;
      background: #fff;
    }
    .ok-key {
      height: 60px;
      line-height: 60px;
      color: #67B1F1;
    }
  }
}
```

luck7rc配置

```javascript
module.exports = {
  // 。。。
  plugins: [
    // ...
    ['ui', {
      components: [
        // ...
        ['keyboard', {
          'boards|require': '@/libs/projectKeyBoard.js'
        }]
        // ...
      ]
    ]
  ]
}
```

使用

```html
<template>
  <div>
    <input type="text" readonly name="sz" v-keyboard-sz="sz"/>
    <br/>
    <input type="text" readonly name="fh" v-keyboard-fh="fh"/>
    <br/>
    <input type="text" readonly name="xz" v-keyboard-xz="xz"/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sz: {
        data: {
          key: '',
          value: ''
        }
      },
      fh: {
        data: {
          key: '',
          value: ''
        }
      },
      xz: {
        data: {
          key: '',
          value: ''
        }
      }
    }
  }
}
</script>
```
## 注意事项

## 已知问题
