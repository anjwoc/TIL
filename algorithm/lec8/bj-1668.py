n = int(input())
arr = []

for _ in range(n):
    arr.append(int(input()))

left = 0
lmax = 0
ele1 = arr[0]

for num in arr:
    lmax = max(lmax, num)
    if ele1 > num or lmax > num:
        continue
    left += 1

print(left)

right = 0
rmax = 0
ele2 = arr[-1]
for num in reversed(arr):
    rmax = max(rmax, num)
    if ele2 > num or rmax > num:
        continue
    right += 1
print(right)
