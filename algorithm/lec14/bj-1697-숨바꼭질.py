import sys, collections
input = sys.stdin.readline

n, k = map(int, input().split())

times = [0] * 100001
que = collections.deque([n])
while que:
    x = que.popleft()
    if x == k:
        print(times[k])
        break
    for cur_x in [x-1, x+1, 2*x]:
        if 0 <= cur_x < 100001 and not times[cur_x]:
            times[cur_x] += times[x] + 1
            que.append(cur_x)

