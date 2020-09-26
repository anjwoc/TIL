import sys
input = sys.stdin.readline

n = int(input())
arr = [[0, (0, 0, 0)]]
for i in range(1, n+1):
    area, height, weight = map(int, input().split())
    arr.append([i, (area, height, weight)])

result = [arr[0]]
for i in range(2, (n+1)):
    prevA, prevH, prevW = arr[i-1][1]
    curA, curH, curW = arr[i][1]
    print(prevA, prevW)
    print(curA, curW)
    if prevA > curA and prevW > curW:
        result.append(arr[i])

print(result)