# venm-auth-demo

> ⚠️ **WARNING:** This code _is not_ 100% production ready. I mean... it's just a demo.

## Project setup

```
npm install
```

### Environment variables:

Create `.env` file in project's root directory. Add the following variables:

```sh
BACKEND_PORT= # Port for Express auth server
DB_URL= # MongoDB Connection URL
ORIGIN_URL= # URL of CORS origin; i.e. Vue app's URL
JWT_SECRET= # Secret used for signing JWTs
VUE_APP_API_URL= # Express auth server's URL
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
