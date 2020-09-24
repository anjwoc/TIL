import sys
import heapq
input = lambda: sys.stdin.readline().strip()

n = int(input())
arr = []
for _ in range(n):
    heapq.heappush(arr, int(input()))

ans = 0
while len(arr) != 1:
    n1 = heapq.heappop(arr)
    n2 = heapq.heappop(arr)
    sum_value = n1 + n2
    ans += sum_value
    heapq.heappush(arr, sum_value)
print(ans)