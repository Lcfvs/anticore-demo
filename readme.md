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

## License

[MIT](./license.md)
