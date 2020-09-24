import sys, heapq

input = lambda: sys.stdin.readline().strip()

n, m = map(int, input().split())
arr = [[] for _ in range(n+1)]
indegree = [0] * (n+1)

heap = []
result = []

for _ in range(m):
    x, y = map(int, input().split())
    arr[x].append(y)
    indegree[y] += 1

for i in range(1, n+1):
    if indegree[i] == 0:
        heapq.heappush(heap, i)

while heap:
    value = heapq.heappop(heap)
    result.append(value)
    for i in arr[value]:
        indegree[i] -= 1
        if indegree[i] == 0:
            heapq.heappush(heap, i)

print(*result)