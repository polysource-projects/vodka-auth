# vodka-auth

A privacy-respecting and open-source way to prove EPFL academic status.

## How does it work?

Vodka is an OAuth app that takes care of verifying `@epfl.ch` email address ownership.

## How do I use it in my app?

> 💡 If you're serious about using Vodka, [let us know](mailto:contact@epfl.tools)! We can provide your website with verified status and improve your users' experience on Vodka.

You can request authentication by redirecting your user to this address:
```
https://vodka.epfl.tools/authorize?redirect={callback}
```
Where `{callback}` is a URL-encoded string of your callback endpoint, for instance:
```
https://www.my-epfl-related-service.ch/vodka_callback
```

Vodka takes care of verifying the student's status from there. You'll here back from them on your callback endpoint! If all went well, Vodka then redirects the user there, where `{token}` is the signed data:
```
{callback}?vodka_token={token}
```
Else, they'll land there, where `{error}` is the reason the process failed (it should be equal to `request_denied`):
```
{callback}?vodka_error={error}
```

## How to get data out of Vodka's token?

The token you receive is a [JSON Web Token](https://jwt.io/). What does that mean? It means that there's no need for an additional request, as everything you need is already neatly bundled in the string you just received.
Although it doesn't contain any particularly sensitive data, we highly recommend you remove it from your URL as soon as you've parsed it. The token's payload should look like that:
```js
{
  "iat": 1693659813,
  "sub": "john.doe@epfl.ch",
  "target": "www.my-epfl-related-service.ch",
  "user": {
    "email": "john.doe@epfl.ch",

    // May come later
    // "firstName": "John",
    // "lastName": "Doe"
  }
}
```
Note that only the user's `email` is guaranteed to be included —the rest may be omitted, as errors may be encountered on our end as we parse `people.epfl.ch` data.

**It is absolutely crucial that you fetch & cache our public key to verify every JWT you receive through this channel.** Otherwise, the data could be very easily altered. You may occasionally fetch our public key from this endpoint:
```
https://vodka-server.sys.epfl.tools/public-key
```

### Here's how that process could look in JavaScript

Trust-wise, you're expected to run this logic server-side.

```ts
import jwt from "jsonwebtoken";
import axios from "axios";

// What the client has parsed from query string "vodka_token"
const vodkaToken = "···";

// We advise you to cache the public key instead of fetching it regularly
const { data: publicKey } = await axios.get("https://vodka-server.sys.epfl.tools/public-key")

// Should return the object shown earlier
// If the signature or the data are invalid, it'll throw an error
const payload = jwt.verify(token, key);
```

## What next?

Now that you've got your user's data, you may manage their session independently. As of now, Vodka does not take care of securely managing your sessions —all it does is provide a means to verify identity ad hoc.
