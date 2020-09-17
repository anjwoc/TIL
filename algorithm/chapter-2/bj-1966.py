import sys
input = lambda: sys.stdin.readline().strip()

t = int(input())
while(t):
    n, m = map(int, input().split())
    pr = list(map(int, input().split()))
    isIncludeSameValue = not (len(pr) == len(set(pr)))
    if not isIncludeSameValue:
        num = pr[m]
        pr.sort(reverse=True)
        print(pr.index(num)+1)
    if isIncludeSameValue:
        num = pr[m]
        higher = sorted(list(filter(lambda x: x > num, pr)), reverse=True)
        print(higher)
        cnt = 0
        print(cnt)
    t-=1