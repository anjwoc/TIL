import sys
input = sys.stdin.readline    
n, r, c = map(int, input().split())
cnt = 0

def recursive(n, x, y):
    global cnt
    if n == 2:
        if x == r and y == c:
            print(cnt)
            return
        cnt += 1
        if x == r and y+1 == c:
            print(cnt)
            return
        cnt += 1
        if x+1 == r and y == c:
            print(cnt)
            return
        cnt += 1
        if x+1 == r and y+1 == c:
            print(cnt)
            return
        cnt += 1
        return

    recursive(n / 2, x , y)
    recursive(n / 2, x , y + n / 2)
    recursive(n / 2, x + n / 2 , y)
    recursive(n / 2, x + n / 2 , y + n / 2)

recursive(2 ** n, 0, 0)