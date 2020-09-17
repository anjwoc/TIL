import hashlib
data = input()
encoded_data = data.encode()
result = hashlib.sha256(encoded_data).hexdigest()
print(result)