import sys
input = sys.stdin.readline

x = input()
y = input()

# 공집합을 포함한다고 했으니 행과 열이 1씩 추가된다.
dp = [[0] * (len(y) + 1) for _ in range(len(x) + 1)]

for i in range(1, len(x) + 1):
    for j in range(1, len(y) + 1):
        if x[i-1] == y[j-1]:
            dp[i][j] = dp[i-1][j-1] + 1
        else:
            dp[i][j] = max(dp[i][j-1], dp[i-1][j])

print(dp[len(x)-1][len(y)-1])