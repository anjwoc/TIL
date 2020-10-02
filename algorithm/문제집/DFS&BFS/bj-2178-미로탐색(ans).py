def pretty_print(arr):
    for i in arr:
        print(i)
def solve(start, goal, lines):
    dx = [-1, 0, 1, 0]
    dy = [0, 1, 0, -1]
    
    que = []
    que.append(start)
    while que:
        x, y = que.pop(0)
        value = lines[x][y]
        for i in range(4):
            nx = x + dx[i]
            ny = y + dy[i]
            if nx < 0 or ny < 0 or nx >= n or ny >= m:
                continue
        
            tmp_value = lines[nx][ny]

            if tmp_value < 1:
                continue

            if tmp_value == 1 or value + 1 < tmp_value:
                lines[nx][ny] = value + 1
                que.append((nx, ny))
    return lines
 
if __name__ == "__main__":
    n, m = map(int, input().strip().split())
    lines = []
    for i in range(n):
        line = list(map(int, list(input().strip())))
        lines.append(line)
    print(lines)
    start = (0, 0)
    goal = (n-1, m-1)
    print(solve(start, goal, lines))