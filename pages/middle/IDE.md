# IDE 命令大全
## vscode 
快捷键
```dash
Ctrl+Shift+P,F1 展示全局命令面板

Ctrl+P 快速打开最近打开的文件

Ctrl+Shift+N 打开新的编辑器窗口

Ctrl+Shift+W 关闭编辑器

Ctrl + X 剪切

Ctrl + C 复制

Alt + up/down 移动行上下

Shift + Alt up/down 在当前行上下复制当前行

Ctrl + Shift + K 删除行

Ctrl + Enter 在当前行下插入新的一行

Ctrl + Shift + Enter 在当前行上插入新的一行

Ctrl + Shift + | 匹配花括号的闭合处，跳转

Ctrl + ] 或 [ 行缩进

Home 光标跳转到行头

End 光标跳转到行尾

Ctrl + Home 跳转到页头

Ctrl + End 跳转到页尾

Ctrl + up/down 行视图上下偏移

Alt + PgUp/PgDown 屏视图上下偏移

Ctrl + Shift + [ 折叠区域代码

Ctrl + Shift + ] 展开区域代码

Ctrl + / 添加关闭行注释

Shift + Alt +A 块区域注释

Alt + Z 添加关闭词汇包含
```
插件列表 

```dash
Code Spell Checker  检查变量是否符合拼写风格
import cost 显示 包 大小 
node require 快捷导入nodejs 包
npm  npm 支持 
path autocomplete 自动导入路径 
css-auto-prefix，自动添加 CSS 私有前缀。
Minify，压缩 HTML、CSS、JS 代码。
project manager 项目管理

```

代码片段

    $0 代表代码指令结束之后你的鼠标位置 , $1,$2... 之后就是你执行代码指令中间需要聚焦的地方 按次序来

vue 的  
```json
{
    "vue-template": {
		"prefix": "!v",
		"body": [
			"<template>",
			"    <div class='$1'>" , 
			"        $0" , 
			"    </div>" , 
			"</template>",
			"<script>", 
			"export default {", 
			"    name : '$1',", 
			"    data () {",
			"        return {}" , 
			"    }",
			"}",
			"</script>",
			"<style>",
			"" , 
			"</style>"
		]
	},

	"vue-for" : {
		"prefix": "vfor" , 
		"body": [
			"<div v-for=\"(item , index) in $1\" :key=\"$2\" >" , 
			"    $0" , 
			"</div>"
		]
	}
}

```


## webstorm 
```dash
ctrl+shift+N   通过文件名快速查找工程内的文件 
ctrl+shift+alt+N 通过一个字符快速查找位置
ctrl+F 在文件内快速查找代码 
ctrl+R 文件内代码替换
alt+ 左 或 右 切换代码选项卡
ctrl+D  复制当前行
ctrl+<-或->  以单词作为边界跳光标位置
ctrl+alt+L  格式化代码 
shift+tab 减少缩进
ctrl+Y  删除一行 
esc 直接进入代码编辑
ctrl+G 直接跳转当前文件指定行
alt + 上 或者 下  来跳转上一个方法和下一个方法 
Ctrl+/ 或 Ctrl+Shift+/  快捷注释  
Shift+F6  文件重命名
Ctrl+Shift+上/下 当前选中代码  向上或者向下移动 
F2 警告或者报错进行快速定位 
Ctrl+Shift+F7 高亮显示所有该文本，按Esc高亮消失
Ctrl 左键单击方法 跳转 
Ctrl+E 最近打开的文件 
Ctrl+P 方法参数提示 
Ctrl + Shift + U 将选中代码  进行大小写转换 
shift + 回车  直接开始新的一行 
```



