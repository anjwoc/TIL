import sys
input = lambda: sys.stdin.readline().strip()

tc = int(input())
for _ in range(tc):
    n, m = map(int, input().split())
    que = list(map(int, input().split()))
    que = [(i, idx) for idx, i in enumerate(que)]

    cnt = 0
    while True:
        if que[0][0] == max(que, key=lambda x : x[0])[0]:
            cnt += 1
            if que[0][1] == m:
                print(cnt)
                break
            else:
                que.pop(0)
        else:
            que.append(que.pop(0))