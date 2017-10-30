# Semantic.UI & React

Semantic-UI-React is a great choice, almost a great choice.

> SUI = Semantic.UI        
SUIR = Semantic-UI-React

### No SUIR?
You can always select another framework - [my article with comparison of best React UI frameworks.](https://hackernoon.com/the-coolest-react-ui-frameworks-for-your-new-react-app-ad699fffd651)    
If you still don't want to use SUIR, just remove it from the boilerplate. The boilerplate is great even without Semantic.

## SUIR

### Good parts:
##### 1. Big UI library:
There are many great components that are ready to use. It's probably the biggest and most full-featured React UI framework.
##### 2. Based on SUI:
When you use SUIR you still use SUI. So you can use the power of SUI that already has many components/plugins/hacks/etc.
##### 3. Modular:
You can import only required components.

### Bad parts:

##### 1. SUIR use CSS styles:
SUIR is built based on [`classnames`](https://github.com/JedWatson/classnames) and CSS styles from SUI. SUI will not migrate to inline-styles library w/o community support. So if you have a free time and want to rewrite SUIR with inline-styles library -> check [semantic-ui-theme](https://github.com/openmastery/semantic-ui-theme/issues).

The main problems of using SUI CSS styles:
  1. SSR can't render all the things.
  2. Import of unused styles.
  > You can try to use PurifyCss to remove unused CSS. But probably it doesn't help because PurifyCss determinates unused styles based only on static markup.

  3. SUI styles are huge and block rendering.
  <img src="./assets/sui-block.png" />
  > There is a trick for this: you can split SUI styles into 2 smaller chunks that would be downloaded faster if you use HTTP2.
  > You can import styles only for required components. Check **`src/client/index.jsx`**.


### Summary
SUIR is great, but it still lacks inline-styles.
> Every contribution to [SUIR](https://react.semantic-ui.com/introduction) and [semantic-ui-theme](https://github.com/openmastery/semantic-ui-theme/issues) is highly appreciated :)
