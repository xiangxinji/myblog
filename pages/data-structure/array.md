

# 数组(Array)


:::tip
一种线性数据结构,所有的数据都可以通过一种叫索引来进行访问. 此结构比较简单,也比较静态,在某些语言中数组的容量只能在申明的时候规定死,所以是静态的,如果超出限制必须得重新开辟一个新的长度更大的数组... 

索引: 如果能采用语义化的话,将会更好!
:::

:::warning
关于时间复杂度的问题 , 数组的一些操作方法时间复杂度是 O(n) , 而有的操作方法时间复杂度是O(1) 

例如,在我们add的时候,我们如果要在中间插入一个值,那么之后的元素就必须移位,那这个时间复杂度算上平均值,那就是O(n),也就表示这个操作与我们的元素个数保持着一个线性关系 , 但是如果我们之间根据一个索引来进行get 的话, 那么时间复杂度为O(1) , 因为你不管怎么get , 都是一个常量时间

如果我们的操作有这种线性关系,我们可以进行**时间复杂度的均摊**,求一个平均值. 如果说我们的某些操作使时间复杂度不稳定,我们可以称他为**时间复杂度的动荡**
:::

```java
package array;
/**
 * 数组类
 * 
 * @author tryca
 *
 */
public class Array<T> {
	// 存储的数据
	private T[] data;
	// 存储真实数据的大小
	private int size;

	public Array(int capacity) {
		this.data = (T[]) new Object[capacity];
		this.size = 0;
	}

	// 默认构造方法 ， 初始化length = 10
	public Array() {
		this(10);
	}

	/**
	 * 
	 * @return 返回当前存储数据量
	 */
	public int size() {
		return size;
	}

	/**
	 * 
	 * @return 返回当前是否存储数据
	 */
	public boolean isEmpty() {
		return this.size == 0;
	}

	/**
	 * 将用户添加的元素，作为最后一个元素
	 * 
	 * @param e
	 */
	public void addLast(T e) {
		this.add(size, e);
	}
	// 取得當前數組的容量
	public int getCapacity () {
		return this.data.length ; 
	}
	/**
	 * 将用户添加的元素，放入指定索引，将其他元素后置
	 * 
	 * @param index
	 * @param e
	 */
	public void add(int index, T e) {
		if (index < 0 || index > size)
			throw new Error("请输入合法的索引位置 ， index = " + index + ",允许的最大值为:" + size);
		if (size == data.length)
			this.resize(this.size * 2);
		// 先将当前位置的元素进行移位
		for (int i = size - 1; i >= index; i--) {
			data[i + 1] = data[i];
		}

		data[index] = e;
		size++;
	}

	// 取得
	public T get(int index) {
		if (index < 0 || index >= size)
			throw new Error("请输入合法的索引");
		return data[index];
	}
	// 取得第一个
	public T getFirst () {
		return get(0) ; 
	}
	// 取得最后一个
	public T getLast() {
		return get(size - 1); 
	}

	// 修改
	public void set(int index, T e) {
		if (index < 0 || index >= size)
			throw new Error("请输入合法的索引");
		data[index] = e;
	}

	// 刪除
	public T remove(int index) {
		if (index < 0 || index >= size)
			throw new Error("请输入合法的索引");
		T temp = data[index];
		// 进行移位操作
		for (int i = index; i < size - 1; i++) {
			data[i] = data[i + 1];
		}
		size--;
		data[size] = null ; 
		// 当删除之后的大小 < 长度的四分之一时 , 将长度更改为二分之一1 , (layz)
		if(size < this.data.length / 4 && this.data.length / 2 != 0) {
			this.resize(this.data.length / 2);
		}
		return temp;
	}

	// 删除第一个
	public T removeFirst() {
		return remove(0);
	}

	// 删除最后一个
	public T removeLast() {
		return remove(size - 1);
	}

	// 是否包含
	public boolean contains(T e) {
		return find(e) > -1;
	}

	// 根据元素返回索引
	public int find(T e) {
		for (int i = 0; i < size; i++) {
			if (data[i].equals(e))
				return i;
		}
		return -1;
	}
	

	// 删除某个元素
	public boolean removeElement(T e) {
		int i = find(e);
		if (i != -1) {
			remove(i);
			return true;
		}
		return false;
	}

	@Override
	public String toString() {
		StringBuffer sbu = new StringBuffer();
		sbu.append("当前数据为:[");
		for (int i = 0; i < size; i++) {
			sbu.append(data[i]);
			if (i != size - 1)
				sbu.append(", ");
		}
		sbu.append("]");
		return sbu.toString();
	}
	
	public void resize (int newCapacity) {
		// 将数组进行扩容 
		T [] temp = (T[]) new Object[newCapacity];
		for (int i = 0; i < size; i++) {
			temp[i] = this.data[i] ; 
		}
		this.data = temp ; 
	}
}

```
