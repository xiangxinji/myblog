
# 队列 (First In First Out)

:::tip
**数组队列**

同样也是基于动态数组实现的队列,因为实现起来都是动态数组,所以相对来说比较简单,但是对于链表队列或者循环队列来说的话,数组队列不适合存储大量的数据 

综合而言他的时间复杂度是O(n) 在数据量非常大的时候,性能是惨不忍睹的!

**循环队列**
相对于数组队列,循环队列唯一的一个地方就只在于扩容,其他的操作都是O(1)


**链表队列**
使用改造后的链表,通过 head 和 tail 节点来快速 enqueue 和 dequeue
:::

## 接口
```java
package queue;

public interface Queue<T> {
	// 入队
	void enqueue(T e);
	// 出队
	T dequeue();
	// 取得前端元素
	T getFront();
	// 获取存储数据大小
	int getSize();
	// 取得该结构是否为空  
	boolean isEmpty();
}

```



## 数组队列
其实就是对于动态数组, 添加的时候添加至末尾, 删除的时候删除第一个
```java
package queue;

import array.Array;

public class ArrayQueue<T> implements Queue<T> {

	private Array<T> array ; 
		
	public ArrayQueue(int capacity) {
		array = new Array<T>(capacity);
	}
	public ArrayQueue() {
		array = new Array<T>(10);
	}
	
	@Override
	public void enqueue(T e) {
		array.addLast(e);
	}

	@Override
	public T dequeue() {
		return array.removeFirst();
	}

	@Override
	public T getFront() {
		return array.getFirst();
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
	public String toString() {
		StringBuffer sbu = new StringBuffer();
		sbu.append("array queue  front -> [");
		for (int i = 0; i < getSize(); i++) {
			sbu.append(array.get(i));
			if( i != getSize() - 1)
				sbu.append(", "); 
		}
		sbu.append("] -> tail ");
		return sbu.toString();
	}
	
	int getCapacity () {
		return array.getCapacity();
	}

}

```


## 循环队列
这个相对而言很复杂,因为我们要保证数据利用起来非常充分,只需要一个位置来判断到底是否满了,然后我们可以通过双指针来进行移位,告诉队列,当前头和尾处于哪里 
```java
package queue;

import java.util.Arrays;

public class LoopQueue<T> implements Queue<T> {
	
	private T [] data ; 
	private int front ; 
	private int tail ; 
	private int size;  
	
	public LoopQueue(int capacity) {
		this.data = (T[]) new Object[capacity + 1];
		front = 0 ; 
		tail = 0 ; 
		size = 0 ; 
	}
	public LoopQueue() {
		this(10);
	}
	
	@Override
	public void enqueue(T e) {
		// 是否是满数据 
		if((tail + 1) % data.length == front) 
			this.resize(this.getCapacity() * 2);
		System.out.println(tail);
		data[tail] = e ; 
		tail = (tail + 1) % data.length ; 
		size ++ ; 
	}

	@Override
	public T dequeue() {
		if(this.isEmpty()) 
			throw new Error("此队列为空");
		T ret = data[front] ; 
		data[front] = null ;
		size -- ; 
		front = (front + 1) % data.length ; 
		if(size == getCapacity() / 4 && getCapacity() / 2 != 0) 
			this.resize(getCapacity() / 2);
		return ret ; 
	}

	@Override
	public T getFront() {
		return data[front];
	}

	@Override
	public int getSize() {
		return size;
	}

	@Override
	public boolean isEmpty() {
		return front == tail;
	}
	
	int getCapacity () {
		return this.data.length - 1 ; 
	}
	
	private void resize (int newCapacity) {
		System.out.println("执行了resize ,n="+newCapacity+",o="+this.data.length);
		T [] newData = (T [])new Object[newCapacity + 1] ; 
		for (int i = 0; i < size ; i++) {
			newData[i] = this.data[(i + front) % data.length];
		}
		this.data = newData ; 
		this.front = 0 ; 
		this.tail = size ; 
	}
	
	@Override
	public String toString() {
		System.out.println(Arrays.toString(data));
		StringBuffer sbu = new StringBuffer();
		sbu.append("loop queue  front -> [");
		for (int i = front; i != tail; i = (i + 1) % data.length) {
			sbu.append(data[i]);
			if((i + 1) % data.length != tail) 
				sbu.append(", ");
		}
		sbu.append("] <- tail ");
		return sbu.toString();
	}

}
```



## 链表队列
```java
package queue;

import link.LinkedList;

public class LinkedQueue<T> implements Queue<T> {
	
	private int size = 0 ; 
	private Node head  ; 
	private Node tail ; 
	
	private class Node {
		public T e ; 
		public Node next ; 
		
		public Node(T e , Node next) {
			this.e = e ; 
			this.next = next ; 
		}
		public Node(T e) {
			this.e = e ; 
		}
		
		@Override
		public String toString() {
			return super.toString();
		}
		
	}

	@Override
	public void enqueue(T e) {
		Node node = new Node(e);
		// 该队列中没有元素
		if(this.size == 0) {
			// 头和尾都是同一个
			this.head = node ; 
			this.tail = node ; 
		}else {
			this.tail.next = node ; 
			this.tail = node ; 
		}
		this.size ++ ; 
	}

	@Override
	public T dequeue() {
		if(this.isEmpty())
			throw new IllegalArgumentException("该队列为空,请添加元素");
		Node node = this.head ; 
		this.head = this.head.next ; 
		node.next = null ; 
		this.size -- ; 
		return node.e;
	}

	@Override
	public T getFront() {
		if(this.isEmpty()) 
			throw new IllegalArgumentException("该队列为空,请添加元素");
		return this.head.e;
	}

	@Override
	public int getSize() {
		return this.size ; 
	}

	@Override
	public boolean isEmpty() {
		return this.size == 0 ; 
	}

	@Override
	public String toString() {
		StringBuffer res = new StringBuffer();
		int size = this.getSize() ; 
		res.append("linked queue head -> [") ; 
		Node cur = this.head ;
		for (int i = 0; i < size ; i++) {
			res.append(cur.e);
			if(i != size - 1) res.append(", ") ;  
			cur = cur.next ; 
		}
		res.append("]");
		return res.toString();
	}
}

```