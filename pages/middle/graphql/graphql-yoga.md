
# graphql-yoga 

## base usage 
在npm.js 中找到 graphql-yoga 这个包 , 然后 install  ,在下方有示例代码 


```js
const { GraphQLServer } = require("graphql-yoga");
// 定义Query Api ,
const typeDefs = `
  type Query {
    hello(name: String): String!
    getUser(name : String) : String !
  }
`;
// 定义解析器  
const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || "World"}`,
    getUser: (_, { name }) => `user is ` + name,
  },
};
const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("Server is running on localhost:4000"));
```


之后就会弹出一个网址 ,将我们输入的描述语言给转成从解析器处理之后的和数据 

```graphql
{
  hello(name:"張三")
  getUser(name:"李四")
}
```
---> 
```json
{
  "data": {
    "hello": "Hello 張三",
    "getUser": "user is 李四"
  }
}
```
还可以在网站右侧侧拉出DOCS ,里面可以看到你的所有 query 
以及右侧的SCHEMA 
