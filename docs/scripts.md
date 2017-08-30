# Development

### How `npm run dev` currently works?
When you run `npm run dev` you run 2 commands using `concurrently`.
The first command is `npm run frontend_dev` - run development server with webpack-dev-middleware/webpack-hot-middleware/express. This server serves your bundle + require react-hot-loader for HMR.
The second command is `npm run server_dev` - compile your server-side code with webpack(with `watch` option) and then run compiled code with `nodemon`.

So you have development server for frontend and separate server (it's your server-side code inside `/src/server`).

### Also
I hope you've heard about Next.js/Nuxt.js  - frameworks for Server-side rendering.    
These frameworks have certain restrictions like:
1. You can't use your own inline-styles library
2. You don't know how next.js compiles your code (there is a lot of black magic inside their webpack configuration)
3. etc (many other small issues)

I'm working on [noir](https://github.com/Metnew/noir).   
As you know both server inside `src/server` and development server are powered by **Express**.
Noir use webpack to create development server based on the instance of your(!) server.
And that server can serve HMR client build + SSR + your API.
But right now it doesn't work as expected, hope it will work soon.
