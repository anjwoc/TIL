import sys
input = lambda: sys.stdin.readline().strip()

# F(n) = F(n-1) + F(n-2) (n>=2)

def fibo1(n):
    # 기본 형태
    if n == 0:
        return 0
    if n == 1:
        return 1
    return fibo1(n-1) + fibo1(n-2)
dp = [0] * 50

def fibo2(n):
    # dp를 사용했을 경우
    global dp
    if n == 0:
        return 0
    if n == 1:
        return 1
    if dp[n] != 0:
        return dp[n]
    dp[n] = fibo2(n-1) + fibo2(n-2)
    return dp[n]

n = int(input())
arr = [0] * 46

# dp를 함수를 이용하지 않고 사용하는 방법
arr[0] = 0
arr[1] = 1
for i in range(2, 46):
    arr[i] = arr[i-1] + arr[i-2]

print(arr[n])
