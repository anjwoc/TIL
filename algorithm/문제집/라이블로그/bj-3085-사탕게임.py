import sys
input = lambda: sys.stdin.readline().strip()

n = int(input())
maps = [list(input()) for _ in range(n)]
ans = 0

def checkVertical(pos):
  x, y = pos
  ret = -1
  tmp = maps[0][y]
  acc = 1
  for i in range(1, n, 1):
    if tmp == maps[i][y]:
      acc += 1
      tmp = maps[i][y]
    else:
      ret = max(ret, acc)
      acc = 1
  ret = max(ret, acc)
  return ret

def checkHorizon(pos):
  x, y = pos
  ret = -1
  tmp = maps[x][0]
  acc = 1
  for i in range(1, n, 1):
    if tmp == maps[x][i]:
      acc+=1
      tmp = maps[x][i]
    else:
      ret = max(ret, acc)
      acc=1
  ret = max(ret, acc)
  return ret


for i in range(n):
  for j in range(n):
    # swap check 후 line 검사
    if 0 <= j+1 <n:
      # 왼쪽 사탕과 바꾸기
      maps[i][j], maps[i][j+1] = maps[i][j+1], maps[i][j]
      ans = max(ans, checkVertical((i, j)), checkHorizon((i, j)))
      ans = max(ans, checkVertical((i, j+1)), checkHorizon((i, j+1)))
      maps[i][j], maps[i][j+1] = maps[i][j+1], maps[i][j]

      maps[j][i], maps[j+1][i] = maps[j+1][i], maps[j][i]
      ans = max(ans, checkVertical((j, i)), checkHorizon((j, i)))
      ans = max(ans, checkVertical((j+1, i)), checkHorizon((j+1, i)))
      maps[j][i], maps[j+1][i] = maps[j+1][i], maps[j][i]

print(ans)

