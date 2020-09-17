N, M = map(int, input().split())
card = list(map(int, input().split()))

ans = 0 
length = len(card)

cnt = 0
for i in range(0, length):
    for j in range(i+1, length):
        for k in range(j+1, length):
            val = card[i] + card[j] + card[k]
            if val <= M:
                ans = max(ans, val)

print(ans)
