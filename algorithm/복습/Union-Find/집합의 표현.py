import sys
input = sys.stdin.readline

def find(x):
    while x != parent[x]:
        x = parent[x]
    return parent[x]

def union(x, y):
    a = find(x)
    b = find(y)
    if a == b:
        return
    if level[a] < level[b]:
        parent[a] = b
    else:
        parent[b] = a
    if level[a] == level[b]:
        level[a] += 1

n,m = map(int, input().split())
parent = dict()
level = [0] * (n+1)
for i in range(n+1):
    parent[i] = i
    level[i] = i
for _ in range(m):
    op, x, y = map(int, input().split())    
    
    if op == 0:
        union(x, y)
    elif op == 1:
        a = find(x)
        b = find(y)
        if a == b:
            print("YES")
        else:
            print("NO")