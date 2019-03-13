
## 什么是asch-web?

__[asch-web - Developer Document](https://github.com/AschPlatform/asch-docs/blob/master/http_api/zh-cn.md)__
asch-web是一个通过HTTP请求与ASCH节点进行通信的js库。asch-web提供常用的交易写操作API和常用的工具函数，诸如XAS转账，合约执行，账户创建，助记词，公钥和地址转和交易离线签名等等，asch-web受到Ethereum的[web3.js](https://github.com/ethereum/web3.js/)库的设计思想，提供统一的，无缝的开发体验。我们用核心思想对其进行了扩展，集成了ASCH常用的API，asch-web用typescript语言进行编写，可以build生成浏览器环境和node环境的js库，也可以直接在typescript项目中直接引用使用，对于DAapps与asch节点的交互提供了极大的方便。

## 兼容性
- 支持Node.js v8及更高版本构建的版本
- 支持Chrome浏览器环境

您可以从`dist /`文件夹中专门访问这两个版本。
asch-web还兼容前端框架，如Angular，React和Vue。
您也可以在Chrome扩展程序中集成asch-web。

## Build

首先使用git克隆asch-web项目, 安装依赖并且运行示例：

```
git clone https://github.com/AschPlatform/asch-web
cd asch-web
npm install
npm run build

```
dist目录下生成了两个文件夹tsc和webpack, 可供不同环境的项目使用，其中tsc可以拷贝到typescript项目中直接使用，webpack生成的文件可以拷贝到node项目或者web项目直接使用。


## 安装

 1. npm安装

```
npm install asch-web

```
 
2. 本地安装
  
```
npm install path/to/asch-web  #本地路径

```

3. 通过github安装
  
```
npm install git://github.com/AschPlatform/asch-web.git   #master分支
npm install git://github.com/AschPlatform/asch-web.git#kim  #kim分支

```

## 

## 实例

实例源码在`examples`目录下，这个目录分有三个子目录：typescript, browser和server,分别对应typescript, 浏览器和node三种不同运行环境的实例。


### typescript项目实例

```
cd  example/typescript
npm install
npm run build #生成js文件
npm run start #运行js文件

```

```
import Asch  from 'asch-web'
import {AschWeb, Keys, Transaction, Utils ,Network , Provider, HTTPProvider} from 'Asch'

const host = 'http://testnet.asch.io'// 'http://mainnet.asch.cn/'
const net = Network.Test//   Network.Main

let secret = 'quantum jelly guilt chase march lazy able repeat enrich fold sweet sketch'
let secondSecret = '' //'11111111a'
let address = 'ACFi5K42pVVYxq5rFkFQBa6c6uFLmGFUP2'
let to = 'AHcGmYnCyr6jufT5AGbpmRUv55ebwMLCym'

let unsignedTrx =
{
    type: 1,
    fee: 10000000,
    args: [1000000, 'AHcGmYnCyr6jufT5AGbpmRUv55ebwMLCym'],
    timestamp: 84190767,
    message: '',
    senderPublicKey: '',
    senderId: 'ACFi5K42pVVYxq5rFkFQBa6c6uFLmGFUP2',
}

//utils用法
let keys: Keys = Utils.getKeys(secret)
console.log('keys:' + JSON.stringify(keys))

let addr: string = Utils.getAddressByPublicKey(keys.publicKey)
console.log('get address by publicKey:' + addr)


let signedTrx:  Transaction = Utils.fullSign(unsignedTrx, secret, secondSecret)
console.log('full sign transaction:' + JSON.stringify(signedTrx))

const provider:Provider = new HTTPProvider(host, net)
const aschWeb = new AschWeb(provider, secret, secondSecret)

aschWeb.api
    .transferXAS(1000000, to, 'test')
    .then(res => {
        console.log('transfer XAS response:' + JSON.stringify(res))
    })
    .catch(err => {
        console.error(err)
    })

const host2 = 'http://mainnet.asch.cn/'
const net2 = Network.Main
const provider2:Provider = new HTTPProvider(host2, net2)
//切换provider
aschWeb.setProvider(provider2)

aschWeb.api
    .get('api/v2/blocks', {})
    .then(res => {
        console.log('get blocks response:' + JSON.stringify(res))
    })
    .catch(err => {
        console.error(err)
    })




```
