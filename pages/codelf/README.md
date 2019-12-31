# codelf

```javascript
/**
 *  将一个数据进行深度克隆
 * @param {*} entity 要克隆的对象
 * @param {*} result 最后的结果
 */
const deepClone = (entity, result) => {
  if (Array.isArray(entity)) {
    result = [];
    for (const item in entity) {
      result.push(deepClone(entity[item], result));
    }
  } else if (typeof entity === "object") {
    result = {};
    Object.keys(entity).forEach(i => {
      result[i] = deepClone(entity[i], result);
    });
  } else {
    return entity;
  }
  return result;
};

/**
 *  模仿出来的 createElement 方法
 * @param {*} tagName  标签名
 * @param {*} attrs     属性
 * @param {*} children  子节点
 */
const createElement = (tagName, attrs, children) => {
  let attrsString = "";
  Object.keys(attrs).forEach(key => {
    attrsString += ` ${key}="${attrs[key]}" `;
  });
  return `
        <${tagName} ${attrsString}>
            ${typeof children === "string" ? children : children.join(" ")}
        </${tagName}>
    `;
};

/**
 * 深度对比方法
 * @param {*} entity  对比对象1
 * @param {*} targetEntity  对比对象2
 */
const compare = (entity, targetEntity) => {
  // 连数据类型都不一样,匹配个毛
  if (typeof entity !== typeof targetEntity) return false;
  // 是两个数组
  if (Array.isArray(entity) && Array.isArray(targetEntity)) {
    if (entity.length !== targetEntity.length) {
      // 长度压根就不一样....
      return false;
    }
    let result = true;
    for (const index in entity) {
      if (!(result = compare(entity[index], targetEntity[index]))) break;
    }
    return result;
  } else if (typeof entity === "object" && typeof targetEntity === "object") {
    // 两个都是对象
    const entityKeys = Object.keys(entity);
    const targetEntityKeys = Object.keys(targetEntity);
    // 属性个数都不一样
    if (entityKeys.length !== targetEntityKeys.length) return false;
    let result = true;
    for (let ind = 0; ind < entityKeys.length; ind++) {
      // 对应起来的每一个值在进行比对....
      if (
        !(result = compare(
          entity[entityKeys[ind]],
          targetEntity[entityKeys[ind]]
        ))
      )
        break;
    }
    return result;
  } else {
    return entity === targetEntity;
  }
};
```
