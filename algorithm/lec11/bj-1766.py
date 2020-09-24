import sys
import heapq
input = lambda: sys.stdin.readline().strip()

n, m = map(int, input().split())
arr = [[] for i in range(n+1)] 
indegree = [0] * (n + 1) # 진입 차수를 기록

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
    data = heapq.heappop(heap)
    result.append(data)
    for y in arr[data]:
        indegree[y] -= 1
        if indegree[y] == 0:
            heapq.heappush(heap, y)

for i in result:
    print(i, end=" ")
