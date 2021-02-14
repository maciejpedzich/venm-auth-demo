# venm-auth-demo

> ⚠️ **WARNING:** This code _is not_ 100% production ready. I mean... it's just a demo.

## About this project

This is a VENM stack (basically MERN, but with Vue.js instead of React) JWT auth demo, including a silent/background refresh feature. It utilises Vue 3's Composition API alongside TypeScript and Vuex on the frontend, and as you've probably guessed by now, Node.js with Express and MongoDB (and also TypeScript) on the backend.

## Project setup

```
npm install
```

### Environment variables:

Create `.env` file in project's root directory. Add the following variables:

```sh
BACKEND_PORT= # Port of Express auth server
DB_URL= # MongoDB Connection URL
ORIGIN_URL= # URL of CORS origin; i.e. Vue app's URL
JWT_SECRET= # Secret used for signing JWTs
VUE_APP_API_URL= # Express auth server's URL
```

### Compiles and hot-reloads for development

```
npm run serve
```

For backend:

```
npm run serve:backend
```

### Compiles and minifies for production

```
npm run build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
