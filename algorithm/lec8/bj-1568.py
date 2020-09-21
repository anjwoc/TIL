bird = int(input())
cnt = 0
song = 0
while(bird != 0):
    song += 1
    if bird < song:
        song = 0
        continue
    bird -= song
    cnt += 1

print(cnt)
    