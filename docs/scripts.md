# Scripts

### Install:
```bash
# clone repo without full git history
git clone --depth=1 https://github.com/Metnew/suicrux.git
cd suicrux
# You can remove .git folder if you don't want to pull new features or need your own repo
# to remove folder run: rm -rf .git
# install dependencies
npm install
```

### Development:

```bash
npm run dev
```

### Build:

```bash
npm run build # build both client and server

npm run frontend_build # build client

npm run server_build # build server
```

### Run:
```bash
npm run start
```

### Deploy:
If you use **[now](https://github.com/zeit/now)** on OSS(free) plan - you will run out of memory on `npm run build`. I recommend to disable some non-critical plugins (ModuleConcatenationPlugin) and loaders. [Demo that was deployed to "now"](https://suicrux.now.sh/)

### Test:

```bash
npm run test # run tests with Jest, BASE_API env var is required!
```

### Lint:

`eslint-loader` is already included in webpack, but if you want to lint code without webpack:

```bash
npm run lint:styles  # lint styles with Stylelint
npm run lint:scripts # lint scripts with ESlint
```
