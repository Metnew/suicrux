### FAQ

#### Where are static assets?
You can store static assets (images, videos) in `/static` folder.

#### Where is manifest.json?
You can find it in `static/manifest.json`

#### Is SSR available?
Yes! Check `/src/server/ssr/`.

#### How lazy-loading was implemented?
Using the best solution I've found - `react-async-component`

#### How data-fetching was implemented?
Using  `react-async-bootstrapper` - a wrapper around `react-tree-walker`


#### Is theming available?
Yes, with styled-components's `<ThemeProvider>` you can specify your own theme. By default, app uses theme from [www.materialpallette.com](https://www.materialpalette.com/).
