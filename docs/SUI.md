# Semantic.UI + React

> SUI = Semantic.UI  
> SUIR = Semantic-UI-React

### ~~SUIR?~~

You are free to choose UI framework - [best React UI frameworks.](https://hackernoon.com/the-coolest-react-ui-frameworks-for-your-new-react-app-ad699fffd651)  

## SUIR

### Good parts:

##### 1. Big UI library:

There are many great components that are ready to use.

##### 2. Based on SUI:

When you use SUIR you still use SUI CSS.

##### 3. Modular:

You can import only required components.

### Bad parts:

##### 1. SUIR use CSS styles:

SUIR is built based on [`classnames`](https://github.com/JedWatson/classnames) and CSS styles from SUI. SUI will not migrate to inline-styles library w/o community support. So if you have a free time and want to rewrite SUIR with inline-styles library -> help them!

The key problems of using SUI CSS styles:

1. Import of unused styles.

   > You can try to use PurifyCss to remove unused CSS. But probably it doesn't help because PurifyCss determinates unused styles based only on static markup.

2. SUI styles are huge and block rendering.
   <img src="./assets/sui-block.png" />
   > There is a trick for this: you can split SUI styles into 2 smaller chunks that would be downloaded faster if you use HTTP2.
   > You can import styles only for required components. Check **`src/client/index.jsx`**.

### Summary

SUIR is great, but it still lacks inline-styles.

> Every contribution to [SUIR](https://react.semantic-ui.com/introduction) and [semantic-ui-theme](https://github.com/openmastery/semantic-ui-theme/issues) is highly appreciated :)
