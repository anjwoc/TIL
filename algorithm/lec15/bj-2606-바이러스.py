import sys, collections
input = sys.stdin.readline

n = int(input())
m = int(input())

maps = [[0] * (n+1) for _ in range(n+1)]

for _ in range(m):
    x, y = map(int, input().split())
    maps[x][y] = 1
    maps[y][x] = 1

def bfs(adj, start):
    visited = []
    que = collections.deque([start])
    while(que):
        n = que.popleft()
        visited.append(n)

        for i in range(len(maps)):
            if maps[n][i] and i not in visited and i not in que:
                que.append(i)
    return len(visited)-1

print(bfs(maps, 1))