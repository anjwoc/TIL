import sys
input = sys.stdin.readline

n = int(input())
arr = []
arr = list(map(int, input().split()))
dp = [1] * (n+1)

for i in range(1, n):
    for j in range(i+1):
        if arr[i] > arr[j]:
            dp[i] = max(dp[i], dp[j] + 1) 
            

print(max(dp))