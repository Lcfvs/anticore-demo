# anticore-demo

An `anticore` demo just to provide a very simple example to see how to start a real world project.

Under the hood, it uses the following dependencies to simplify the job:
 * [anticore](https://github.com/Lcfvs/anticore) (to play with the front things)
 * [anticore-server](https://github.com/Lcfvs/anticore-server) (even if `anticore` doesn't requires a specific type of server)
 * [@anticore-contracts/tree-insert](https://github.com/anticore-contracts/tree-insert) (an `anticore` contract to simply define how to insert some elements without extra front code)
 * [@anticore-contracts/tree-view](https://github.com/anticore-contracts/tree-view) (an `anticore` contract to manage the main AJAX navigation/history, without extra front code)
 * [jspmi](https://github.com/Lcfvs/jspmi/) (to generate your [import-map](https://github.com/WICG/import-maps))

## Install

```sh
git clone https://github.com/Lcfvs/anticore-demo
cd anticore-demo
npm i
npm start
```

Alternatively, you can simply make [your own the Glitch project](https://glitch.new/github.com/Lcfvs/anticore-demo)


## The demo architecture

### The front

You can find it into the [`./src/assets`](./src/assets)

The JS part is divided like this (but you can choose the structure you want, it's just an example):
 * `contracts`: A directory containing all your `anticore` contracts
   * `generics.js`: A module importing the **generic** contracts, not related to a specific view, to declare some **behaviors**
   * `trees.js`: A module importing the **tree** contracts, altering the document
   * `views.js`: A module importing the **view** contracts, to handle the view-related behaviors
 * `generics`: A directory containing the **lazy-loaded** generic features, **when** a matching element is received by `anticore`
 * `utils`: A directory for your utilities, basically, it only contains a **selectors** shorthand
 * `views`: A directory containing the **lazy-loaded** view features, **when** a matching element is received by `anticore`
 * `dist.js`: A bundled version of your front code, for the browsers not yet supporting the **import-map**
 * `main.js`: The main entrypoint importing your contracts and triggering `anticore`
   In order, it imports the `generics`, the `views`, the `trees`, then the `anticore/trigger.js`
   **You're strongly encouraged to preserve that order to keep your front optimized**

### External references

* For the server-side things, read the `anticore-server` readme
* To see how to install/uninstall some dependencies, read the `jspmi` one

## License

[MIT](./license.md)
