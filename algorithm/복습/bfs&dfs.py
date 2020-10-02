import sys
input = sys.stdin.readline

n, m, start = map(int, input().split())
arr = [[0] * (n+1) for _ in range(n+1)]
for _ in range(m):
    x, y = map(int, input().split())
    arr[x][y] = 1
    arr[y][x] = 1

def dfs(cur_node, row, visited):
    visited += [cur_node]
    for search_node in range(len(row[cur_node])):
        if row[cur_node][search_node] and search_node not in visited:
            visited = dfs(search_node, row, visited)

    return visited

def bfs(start):
    que = [start]
    visited = [start]

    while que:
        cur_node = que.pop(0)
        for search_node in range(1, len(arr[cur_node], 1)):
            if arr[cur_node][search_node] and search_node not in visited:
                visited += [search_node]
                que += [search_node]
    return visited

print(*dfs(start, arr, []))
print(*bfs(start))
    