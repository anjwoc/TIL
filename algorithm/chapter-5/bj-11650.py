import sys
input = lambda: sys.stdin.readline().strip()

n = int(input())
pos = []
for _ in range(n):
    pos.append(tuple(map(int, input().split())))
    
for i in sorted(pos, key=lambda x: (x[0], x[1])):
    print(*i)

