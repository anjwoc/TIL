import sys
input = lambda: sys.stdin.readline()
# O(n^2)
n = int(input())
arr = []
for _ in range(n):
    arr.append(int(input()))
    
for i in range(n):
    m_idx = i
    for j in range(i+1, n):
        if arr[m_idx] > arr[j]:
            m_idx = j
    arr[i], arr[m_idx] = arr[m_idx], arr[i]

for i in arr:
    print(i)