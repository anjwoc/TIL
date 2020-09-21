import sys
input = lambda: sys.stdin.readline()

n = int(input())
arr = [0] * 10001
for _ in range(n):
    idx = int(input())
    arr[idx] += 1

for i in range(10001):
    if arr[i] == 0: continue
    for j in range(arr[i]):
        print(i)
    