import sys
from collections import deque

def bfs(x, y):
    visited[x][y] = True
    que = deque([(x, y)])
    directions = [(-1, 0), (1, 0), (0, 1), (0, -1)]
    while que:
        x, y = que.popleft()
        for dx, dy in directions:
            nx, ny = x + dx, y + dy
            if nx < 0 or nx >= n or ny < 0 or ny >= m:
                continue
            if arr[nx][ny] and not visited[nx][ny]:
                visited[nx][ny] = True
                que.append((nx, ny))

for _ in range(int(input())):
    m, n, k = map(int, input().split())
    arr = [[0]*m for _ in range(n)]
    visited = [[False]*m for _ in range(n)]
    for _ in range(k):
        y, x = map(int, input().split())
        arr[x][y] = 1
    ans = 0

    for i in range(n):
        for j in range(m):
            if arr[i][j] and not visited[i][j]:
                bfs(i, j)
                ans += 1
    print(ans)

