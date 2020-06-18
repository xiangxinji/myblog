# 栈 


## 先进先出 (First In Last Out)

:::tip
**数组栈**

在动态数组的基础之上,形成的一种栈结构,但是由于它的结构相对来说比较封闭,操作也比较简单所以用动态数组也非常容易改造

**链表栈**
在链表的基础之上进行改在,形成的栈结构
:::

:::warning
对于数组版本的话呢,其实是拥有一个问题的,就是对于他的时间复杂度来说,平均复杂度是O(n), 因为在动态数组中,如果长度不够他是需要进行扩容的
:::



### 接口

```java
package stack;

public interface Stack<T> {
	// 获取数据长度
	int getSize () ;
	// 是否为空
	boolean isEmpty () ; 
	// 添加一个元素
	void push(T e);
	// 弹出一个元素
	T pop () ; 
	// 栈尾的元素
	T peek () ; 
	
}

```

### 数组版
[动态数组code](./array)

总的来说,数组版的栈呢其实很简单,通过动态追加元素到数组末尾,然后弹出的时候删除掉数组末尾,这里就是这样子了 .. 
```java
package stack;

import array.Array;

public class ArrayStack<T> implements Stack<T> {
	
	private Array<T> array ; 
	
	public ArrayStack(int capacity) {
		array = new Array<T>(capacity) ; 
	}
	public ArrayStack() {
		array = new Array<T>();
	}
	
	@Override
	public int getSize() {
		return array.size();
	}

	@Override
	public boolean isEmpty() {
		return array.isEmpty();
	}

	@Override
	public void push(T e) {
		array.addLast(e);
	}

	@Override
	public T pop() {
		T e = array.removeLast();
		return e ; 
	}

	@Override
	public T peek() {
		return array.getLast();
	}

	public int getCapacity() {
		return array.getCapacity();
	}
	
	@Override
	public String toString() {
		StringBuffer sbu = new StringBuffer(); 
		sbu.append("array stack : [");
		for (int i = 0; i < array.size(); i++) {
			sbu.append(array.get(i));
			if(i != array.size() - 1) sbu.append(", ") ;  
		}
		sbu.append("] ->top") ; 
		return sbu.toString() ; 
	}

}

```


### 链表版
[链表code](./linked)
通过链表的head 来进行快速pop
```java
package stack;

import link.LinkedList;

public class LinkedStack<T> implements Stack<T> {

	private LinkedList<T> linked;

	public LinkedStack() {
		LinkedList<T> linked = new LinkedList<T>();
		this.linked = linked;
	}

	public LinkedStack(LinkedList<T> linked) {
		this.linked = linked;
	}

	@Override
	public int getSize() {
		// TODO Auto-generated method stub
		return this.linked.size();
	}

	@Override
	public boolean isEmpty() {
		// TODO Auto-generated method stub
		return this.linked.isEmpty();
	}

	@Override
	public void push(T e) {
		this.linked.addFirst(e);
	}

	@Override
	public T pop() {
		return this.linked.removeFirst();
	}

	@Override
	public T peek() {
		return this.linked.getFirst();
	}

	@Override
	public String toString() {
		StringBuffer res = new StringBuffer();
		res.append("linked stack , top [");
		int size = this.getSize();
		for (int i = 0; i < size; i++) {
			res.append(this.linked.get(i));
			if (i != size - 1)
				res.append(", ");
		}
		res.append("] bottom");
		return res.toString();
	}
}

```
