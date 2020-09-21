import sys
input = lambda: sys.stdin.readline()

n = int(input())
arr = []
for i in range(n):
    age, name = input().split()
    arr.append((i+1, (int(age), name)))

ans = sorted(arr, key = lambda x : (x[1][0], x[0]))
for i in ans:
    print(*i[1])
