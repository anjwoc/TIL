class Node:
    def __init__(self, data, left_node, right_node):
        self.data = data
        self.left_node = left_node
        self.right_node = right_node
    
def preOrder(node):
    print(node.data, end='')
    if node.left_node != '.':
        preOrder(tree[node.left_node])
    if node.right_node != '.':
        preOrder(tree[node.right_node])

def inOrder(node):
    if node.left_node != '.':
        inOrder(tree[node.left_node])
    print(node.data, end='')
    if node.right_node != '.':
        inOrder(tree[node.right_node])

def postOrder(node):
    if node.left_node != '.':
        postOrder(tree[node.left_node])
    if node.right_node != '.':
        postOrder(tree[node.right_node])
    print(node.data, end='')

n = int(input())
tree = {}
for _ in range(n):
    a, b, c = input().split()
    tree[a] = Node(a, b, c)

preOrder(tree['A'])
print()
inOrder(tree['A'])
print()
postOrder(tree['A'])