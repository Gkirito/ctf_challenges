import jwt
with open('./src/public/keys/publicKey.pem', 'rb') as publickfile:
    p = publickfile.read()
print(p)
encoded = jwt.encode({
    "role": "admin",
    "iat": 1613798737
}, p, algorithm="HS256")
print(encoded)
