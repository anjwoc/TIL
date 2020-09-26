import sys

n = int(input())
m = int(input())

adj = [[] for _ in range(n+1)]
visited = [False] * (n+1)
cnt = 0

for _ in range(m):
    x, y = map(int, input().split())
    adj[x].append(y)
    adj[y].append(x)

print(adj)
def dfs(pos):
    global cnt
    cnt += 1
    visited[pos] = True
    for next_pos in adj[pos]:
        if not visited[next_pos]:
            dfs(next_pos)

dfs(1)
print(cnt-1)


