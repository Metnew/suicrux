### FAQ

#### Where are static assets?
You can store static assets (images, videos) in `/static` folder.

#### Where is manifest.json?
You can find it in `webpack_config/config.js`

#### Is SSR available?
Yes! Check `/src/server/ssr/`.

#### How lazy-loading implemented:
Using the best solution I've ever found - `react-async-component`

#### Is theming available?
Yes, with styled-components's `<ThemeProvider>` you can specify your own theme. By default, app uses theme from [www.materialpallette.com](https://www.materialpalette.com/).

#### "You have a components folder and containers folder..and in the container you have another components folder?"

Components inside `containers/**/components` are components that are required by container.

For example, `Dashboard`(container) has `DashboardComponent`(component). You can think about `DashboardComponent` as "Isolated component", it isn't used in app anywhere except own parent-container.

Components in components are components that:
1. Don't have own logic and connection with state (as opposite to containers)
2. Aren't "isolated".(!)
