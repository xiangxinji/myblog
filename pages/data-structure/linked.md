
# 链表 

:::tip
在链表中,每一个数据都是一个节点,他们通过 next 的一个引用,能索引到下一个,在删改的时候,我们可以通过虚拟的头节点来更改上一个和下一个的引用,但是在平常情况下,我们只能通过模拟索引的方式去取到元素,这与普通的数组是不同的,因为数组自带索引 

链表有许多种形式,如单向链表,双向链表,循环链表 等等! 
:::

## 单向链表 

```java
package link;
/**
 * 链表
 * @author tryca
 *
 */
public class LinkedList<T> {
	
	
	// 虚拟节点 
	private Node dummyHead ; 
	
	private int size = 0 ; 
	
	private class Node {
		// 存储的元素
		public T e ; 
		// 下一个节点
		public Node next ; 

		public Node(T e , Node next) {
			this.e = e ; 
			this.next = next ; 
		}
		public Node() {
			this(null,null) ; 
		}
	}
	
	public LinkedList() {
		this.dummyHead = new Node() ; 
	}
	
	
	public void add (int index , T e ) {
		if(index < 0 || index > this.size) {
			throw new IllegalArgumentException("请传入合法的索引") ;
		}
		Node pre = this.dummyHead ; 
		for (int i = 0 ; i < index ; i ++) pre = pre.next ; 
		Node node = new Node(e , pre.next);
		pre.next = node ;
		this.size ++ ; 
	}
	
	public void addFirst (T  e) {
		this.add(0, e);
	}
	public void addLast (T e) {
		this.add(this.size, e);
	}
	
	public int size() {
		return this.size ; 
	}
	public boolean isEmpty () {
		return this.size == 0 ; 
	}

	public T get (int index) {
		if(index < 0 || index >= this.size) {
			throw new IllegalArgumentException("请输入合法索引");
		}
		Node cur = this.dummyHead.next ; 
		for (int i = 0; i < index; i++) cur = cur.next ; 
		return cur.e ; 
	}
	public T getFirst () {
		return this.get(0);
	}
	public T getLast() {
		return this.get(this.size - 1);
	}
	public int find (T e) {
		Node cur = this.dummyHead.next ; 
		for (int i = 0; i < this.size ; i++) {
			if(cur.e.equals(e)) return i ; 
			cur = cur.next ; 
		}
		return -1 ; 
	}
	public boolean contains (T e ) {
		return this.find(e) != -1 ; 
	}
	
	@Override
	public String toString() {
		StringBuffer sbu = new StringBuffer(); 
		sbu.append("linked list:") ; 
		sbu.append(" head -> ") ; 
		sbu.append("[");
		Node cur = this.dummyHead.next ; 
		for (int i = 0; i < this.size; i++) {
			sbu.append(cur.e) ; 
			if(i != this.size - 1) sbu.append(",");
			cur = cur.next ; 
		}
		sbu.append("]");
		return sbu.toString();
	}
	
	public T remove (int index) {
		if(index < 0 || index >= this.size) {
			throw new IllegalArgumentException("请输入合法索引");
		}
		Node pre = this.dummyHead ; 
		for (int i = 0; i < index; i++)pre = pre.next ;
		Node temp = pre.next ; 
		pre.next = pre.next.next ;
		this.size -- ; 
		return temp.e ; 
	}
	
	public T removeElement (T e ) {
		int index = this.find(e) ; 
		if(index == -1) return null ; 
		return this.remove(index);
	}
	
	public T removeFirst () {
		return this.remove(0) ; 
	}
	public T removeLast () {
		return this.remove(this.size - 1);
	}
	
	
}

```