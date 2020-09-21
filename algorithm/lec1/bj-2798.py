N, M = map(int, input().split())
card = list(map(int, input().split()))
arr = []
ans = 0
length = len(card)
for i in range(0, length):
    for j in range(0, length):
        for k in range(0, length):
            if i == j or j == k or i == k:
                continue
            val = card[i] + card[j] + card[k]
            if val <= M:
                ans = max(val, ans)

print(ans)