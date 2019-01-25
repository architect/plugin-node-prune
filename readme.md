[<img src="https://s3-us-west-2.amazonaws.com/arc.codes/architect-logo-500b@2x.png" width=500>](https://www.npmjs.com/package/@architect/architect)

## [`@architect/arc-plugin-node-prune`](https://www.npmjs.com/package/@architect/arc-plugin-node-prune)

> Node.js-specific Architect plugin based on [`node-prune`](https://github.com/tj/node-prune) that cleans `node_modules` cruft from your Functions during deployment


## Installation

1. Run: `npm i @architect/arc-plugin-node-prune`

2. Then add the following to your Architect project file (usually `.arc`):

```
@plugins
architect/arc-plugin-node-prune
```

> Note, no `@` in the plugin name!

3. Deploy your project (`npx deploy`) and watch the filesizes drop!


## Disabling the plugin

If for whatever reason you need to disable the plugin, simply comment it out in (or remove it from) your Architect project file:

```
@plugins
# architect/arc-plugin-node-prune
```
