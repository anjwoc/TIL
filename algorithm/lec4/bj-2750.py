import sys
input = lambda: sys.stdin.readline()
# O(nlogn)
n = int(input())
arr = []
for _ in range(n):
    arr.append(int(input()))

print(*sorted(arr))