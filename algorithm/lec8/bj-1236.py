import sys
input = lambda: sys.stdin.readline().strip()

def check(arr, r, c):
    chk = True
    for i in range(len(arr)):
        if arr[r][i] == 'X':
            chk = False
        if arr[i][c] == 'X':
            chk = False
    return chk

n, m = map(int, input().split())
cnt = 0
maps = []
for _ in range(n):
    maps.append(input())

for i in range(len(maps)):
    if check(maps, i, i):
        cnt += 1

print(cnt)