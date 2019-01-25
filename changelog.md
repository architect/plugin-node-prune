# Architect node-prune plugin changelog

---

## [0.0.1] 2019-01-25

### Added

- Hello! Beta of a Node.js-specific Architect plugin based on [`node-prune`](https://github.com/tj/node-prune) that cleans `node_modules` cruft from your Functions during deployment
  - In our internal testing, we've seen on average ~20-30% reduction in both compressed and uncompressed weight when pruning unnecessary files from `node_modules`, and with no human-discernable impact to deploy prep times. Not bad!
  - `node-prune` doesn't appear to be versioned, so this release uses the latest publicly available stable build as 2019-01-25


---

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
