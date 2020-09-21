def ascending(arr):
    now = arr[0]
    ans = 1
    for i in range(1, len(arr)):
        if now < arr[i]:
            ans += 1
            now = arr[i]
    return ans

n = int(input())
arr = []
for _ in range(n):
    arr.append(int(input()))

print(ascending(arr))
arr.reverse()
print(ascending(arr))