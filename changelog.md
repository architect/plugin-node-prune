# Architect node-prune plugin changelog

---

## [On `bash` branch] 2019-01-27

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
