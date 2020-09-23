n, c = map(int, input().split())

arr = []
for _ in range(n):
    arr.append(int(input()))
arr.sort()

# 정렬 후 최소, 최대 값 찾기
start = arr[1]-arr[0]
end = arr[-1]-arr[0]
ans = 0

while start <= end:
    # mid는 gap을 의미
    mid = (start + end) // 2
    value = arr[0]
    cnt = 1
    for i in range(1, len(arr)):
        if arr[i] >= value + mid:
            value = arr[i]
            cnt += 1
    if cnt >= c:
        start = mid + 1
        ans = mid
    else:
        end = mid - 1

print(ans)


