import sys

input = lambda: sys.stdin.readline().strip()
n, r, c = map(int, input().split())
ans = 0


def solve(n, x, y):
    global ans, dx, dy
    if n == 2:
        if x == r and y == c:
            print(ans)
            return
        ans += 1
        if x == r and y + 1 == c:
            print(ans)
            return
        ans += 1
        if x + 1 == r and y == c:
            print(ans)
            return
        ans += 1
        if x + 1 == r and y + 1 == c:
            print(ans)
            return
        ans += 1
        return
    solve(n / 2, x, y)
    solve(n / 2, x, y + n / 2)
    solve(n / 2, x + n / 2, y)
    solve(n / 2, x + n / 2, y + n / 2)


solve(2 ** n, 0, 0)
