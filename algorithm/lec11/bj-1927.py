import sys
import heapq
input = lambda: sys.stdin.readline().strip()

n = int(input())
heap = []
for _ in range(n):
    data = int(input())
    if data != 0:
        heapq.heappush(heap, data)
    else:
        try:
            print(heapq.heappop(heap))
        except:
            print(0)