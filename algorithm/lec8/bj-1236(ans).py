import sys
input = lambda: sys.stdin.readline().strip()

n, m = map(int, input().split())
maps = []
for _ in range(n):
    maps.append(input())

row = [0]*n
col = [0]*m

for i in range(n):
    for j in range(m):
        
        if maps[i][j] == 'X':
            row[i] = 1
            col[j] = 1

r_cnt = 0
for i in range(n):
    if row[i] == 0:
        r_cnt += 1

c_cnt = 0
for j in range(m):
    if col[j] == 0:
        c_cnt += 1

print(max(r_cnt, c_cnt))