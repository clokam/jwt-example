# JWT and Open SSL Learning - December 2017

The following repository contains a sample application with self-signed certs generated with openssl and tokens generated and verified by JWT(From Auth0).

## Learning Notes

The following notes and links will assist in terms of getting started with the fundamentals,

• Install Open SSL - (Used brew on Mac)

```
https://github.com/openssl/openssl/blob/master/INSTALL
```

• Generate the required Self-Signed Key and Cert using `openssl`,

```shell
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```

This will generate a Private Key and a Public Key for you to use

• Go ahead and run the Node JS Implementation on JWT here and see how tokens are generated and then verified

```shell
npm install

node example/app.js
```

You can try giving invalid token values (or) invalid username values to see how the validation is done
