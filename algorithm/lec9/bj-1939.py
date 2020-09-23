from collections import deque

def bfs(c):
    que = deque([start_node])
    visited = [False] * (n + 1)
    visited[start_node] = True
    while que:
        x = que.popleft()
        for y, weight in adj[x]:
            if not visited[y] and weight >= c:
                visited[y] = True
                que.append(y)
    
    return visited[end_node]

n, m = map(int, input().split())
adj = [[] for _ in range(n+1)]

start = 1000000000
end = 1
for _ in range(m):
    x, y, weight = map(int, input().split())
    adj[x].append((y, weight))
    adj[y].append((x, weight))
    start = min(start, weight)
    end = max(end, weight)

start_node, end_node = map(int, input().split())

ans = start
while(start <= end):
    mid = (start + end) // 2 # 현재 중량
    if bfs(mid):
        # 이동이 가능한 경우, 중량 증가
        ans = mid
        start = mid + 1
    else:
        # 이동이 불가능한 경우, 중량 감소
        end = mid - 1

print(ans)
