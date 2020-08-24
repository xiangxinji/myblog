# 二分搜索树(Binrary Seach Tree) 二叉树

:::tip
二分搜索树和之前的数据结构不同,二分搜索树是一种非线性的数据结构,但是和链表很类似, 都是引用结构 

bst 他拥有 left 和 right 节点, 那么在添加的时候他会自动判断你的值比你当前的节点 > 还是 < , 如果小于则继续往left 节点去比对, 如果
大于则去right节点继续比对 , 直到有一个合适的位置 
:::

:::warning
对于删除操作来说,比较麻烦
:::
```java
package bst;

import java.util.ArrayList;
import java.util.List;
import java.util.Queue;
import java.util.Random;
import java.util.Stack;

import link.LinkedList;

public class BST <T extends Comparable<T>> {
	
	private class Node {
		public T e ; 
		// 左节点和右节点 
		public Node left ; 
		public Node right ; 
		
		public Node(T e) {
			this.e = e ; 
			this.left = null ; 
			this.right = null ;
		}
		
		@Override
		public String toString() {
			return "Node : " + this.e; 
		}
		
	}
	
	private Node root ; 
	private int size ; 
	
	// 添加节点 
	public void add (T  e) {
		this.root = this.add(this.root , e);
		this.size ++ ; 
	}
	// -> 真正的添加节点的方法 , 使用递归进行动态添加
	/**
	 * 当前这个节点如果为null ,那么它将会生成一个节点 
	 * 如果当前不为null , 就进行判断 , 进行生成分支 
	 * @param node
	 * @param e
	 * @return
	 */
	private Node add(Node node ,T e) {
		if(node == null) node = new Node(e) ;
		if(node.e.compareTo(e) > 0) {
			node.left = add(node.left , e) ; 
		}else if (node.e.compareTo(e) < 0) {
			node.right = add(node.right , e); 
		}
		return node ;
	}
	// 前序遍历(递归)
	public void preOrder () {
		this.preOrder(this.root);
	}
	private void preOrder (Node node) {
		if(node == null) return ;
		System.out.println(node.e);
		this.preOrder(node.left);
		this.preOrder(node.right);
	}
	// 前序遍历(非递归)
	public void preOrderNR () {
		Stack<Node> s = new Stack<Node>();
		s.push(root);
		while(!s.isEmpty()) {
			Node node = s.pop();
			System.out.println(node.e);
			if(node.right != null) s.push(node.right);
			if(node.left != null) s.push(node.left) ; 
		}
	}
	// 广度优先遍历 
	public void levelOrder () {
		Queue<Node> q = new java.util.LinkedList<BST<T>.Node>();
		q.add(root) ; 
		while(!q.isEmpty()) {
			Node node = q.remove();
			System.out.println(node.e);
			if(node.left != null) 
				q.add(node.left);
			if(node.right != null) 
				q.add(node.right);
		}
	}
	//取得最大值最小值 
	public Node maximum (Node node) {
		if(this.isEmpty())
			throw new IllegalArgumentException("结构为空,请添加数据");
		Node cur = node == null ? this.root : node ; 
		while(cur.right != null) {
			cur = cur.right ; 
		}
		return cur ; 
	}
	public Node minimum (Node node) {
		if(this.isEmpty())
			throw new IllegalArgumentException("结构为空,请添加数据");
		Node cur = node == null ? this.root : node ;
		while(cur.left != null) {
			cur = cur.left ; 
		}
		return cur ; 
	}
	//删除最大值和最小值 
	public Node removeMaximum () {
		Node temp = this.maximum(null) ; 
		this.removeMaximum(this.root);
		this.size -- ; 
		return temp; 
	}
	public Node removeMinimum () {
		Node temp = this.minimum(null) ; 
		this.removeMinimum(this.root);
		this.size -- ; 
		return temp ; 
	}
	private Node removeMaximum (Node node) {
		if(node.right == null) {
			Node leftNode = node.left ; 
			node.left = null ; 
			return leftNode ; 
		}
		node.right = this.removeMaximum(node.right); 
		return node ; 
	}
	private Node removeMinimum (Node node) {
		if(node.left == null) {
			Node rightNode = node.right ; 
			node.right = null ; 
			return rightNode;  
		}
		node.left = this.removeMinimum(node.left); 
		return node ; 
	}
	
	public void remove (T  e) {
		root = this.remove(root, e);
	}
	private Node remove (Node node , T e ) {
		if(node == null) 
			return null ; 
		if(e.compareTo(node.e) < 0) {
			node.left = this.remove(node.left, e);
			return node ; 
		}else if(e.compareTo(node.e) > 0) {
			node.right = this.remove(node.right, e);
			return node ; 
		}else {
			// 如果左节点 = null , 则需要吧右节点给放在左节点上 
			if(node.left == null) {
				Node rightNode = node.right ; 
				node.right = null ; 
				this.size -- ; 
				return rightNode ; 
			}
			// 如果右节点 = null , 则需要吧左节点的值给右节点
			if(node.right == null) {
				Node leftNode = node.left ; 
				node.left = null ; 
				this.size -- ; 
				return leftNode; 
			}
			// 采用  1962年 Hibbard 提出 , 二叉树的 Hibbard Deletion 策略 
			// 将要删除的当前节点的右节点 代替当前的位置 
			// 1, 找到最小值的节点 .. 
			Node successor = this.minimum(node.right) ; 
			// 2, 将最小值的右节点规划为移除最小值的相对根节点 (node.right), 
			successor.right = this.removeMaximum(node.right);
			// 3, 将原先的left 给这个最小节点  , 相当于替代 
			successor.left = node.left ; 
			// 4, 清理 
			node.left = node.right = null ; 
			// 5, 返回给父元素, 他会进行赋值.. 
			return successor ; 
		}
	}
	
	
	// 中序遍历(排序了的)
	public void inOrder () {
		this.inOrder(this.root);
	}
	private void inOrder (Node node) {
		if(node ==null) return ; 
		this.inOrder(node.left);
		System.out.println(node.e);
		this.inOrder(node.right);
	}
	// 后序遍历 
	public void postOrder () {
		this.postOrder(this.root);
	}
	private void postOrder (Node node) {
		if(node == null) return ;
		this.postOrder(node.left);
		this.postOrder(node.right);
		System.out.println(node.e);
	}
	
	public int size () {
		return this.size ; 
	}
	public boolean isEmpty () {
		return this.size == 0 ; 
	}
	public static void main(String[] args) {
		// 测试用例 
		BST<Integer> b = new BST<Integer>(); 
		b.add(3);
		b.add(5);
		b.add(10);
		b.add(7);
		b.add(4);
		b.add(20);
		b.add(11);
		b.remove(4);
		b.inOrder();
	}
}

```