# Architect node-prune plugin changelog

---

## [2.1.0] 2022-11-04

### Added

- Export synchronous `prune` method for using prune as a standalone module outside of Architect, example:

```js
let { prune } = require('@architect/plugin-node-prune')
prune('/path/to/dir/to/prune') // Pruner will only look in the node_modules/ subdir
```

- Experimental: add one or more custom ignore paths with `ARC_PRUNE_IGNORE_CUSTOM` env var (and `-not` directives for `find`), example:
`ARC_PRUNE_IGNORE_CUSTOM="-not -path *thing-to-ignore-1* -not -path *thing-to-ignore-2*'`

---

## [2.0.0 - 2.0.1] 2022-02-15

### Changed

- Updated to Arc 10 plugin API (from the old school Arc 5 series API)
- Updated dependencies
- Removed lockfile

---

## [1.0.0 - 1.0.1] 2019-02-03

### Changed

- Removes binary dists in favor of bash-based operations
  - Massively smaller module payload
  - Needed to ensure we can ignore files in `@architect/[shared|views]`, which are Architect's shared code paths copied into Functions' `node_modules`
  - No human-discernible perf impact on normal size projects

---

## [0.0.3] 2019-01-25

### Added

- Hello! Beta of a Node.js-specific Architect plugin based on [`node-prune`](https://github.com/tj/node-prune) that cleans `node_modules` cruft from your Functions during deployment
  - In our internal testing, we've seen on average ~20-30% reduction in both compressed and uncompressed weight when pruning unnecessary files from `node_modules`, and with no human-discernable impact to deploy prep times. Not bad!
  - Uses `node-prune` 1.0.1 binaries for x64 Linux, Mac, and Windows only (for now)

---

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
