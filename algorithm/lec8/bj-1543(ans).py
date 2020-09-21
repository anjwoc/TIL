document = input()
word = input()

idx = 0
ans = 0

while len(document) - idx >= len(word):
    if document[idx : idx+len(word)] == word:
        ans += 1
        idx += len(word)
    else:
        idx += 1

print(ans)