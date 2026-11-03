# Nightjar IV React integration into develop

## Source and history

This feature branch starts at develop `742b5cd33cfc080ca1d6d94987df9dafc45049b4` and contains local import merge `5c21dfb75cec25bc3dc25ced3420eb752922276c` of reviewed #8 `e1f1cfccbf2ae1e82bb993fe915a0d9dda6e640d`. The import tree `32182cc20037f3efd6470119df76ecade28cce90` exactly equals the reviewed #8 tree. Every original PR head below remains an ancestor with its original commit object, authorship, merge history and source attribution. No original PR is retargeted, closed, squashed or merged remotely. Main/develop remain unchanged until an approved merge.

| Original PR | Retained exact head | Original base |
| --- | --- | --- |
| [#1](https://github.com/krigsvolddesign/react/pull/1) | `8cf7b26a9209a4fd4e3d4f072e46da0eaf00119a` | `develop` |
| [#2](https://github.com/krigsvolddesign/react/pull/2) | `25140ac4cbbdec46660f595f8b2eb6648e540b04` | `feature/independent-react-source` |
| [#3](https://github.com/krigsvolddesign/react/pull/3) | `b0e5591aeed09dd36adc08667d07668ab55afbc0` | `feature/independent-react-source` |
| [#4](https://github.com/krigsvolddesign/react/pull/4) | `9bc0e39174db28dc0156fe45a1f143afadbf8ed5` | `feature/independent-react-source` |
| [#5](https://github.com/krigsvolddesign/react/pull/5) | `7a9469019a824a202fdd430fb7c9d02bf5877b78` | `feature/combined-react-candidate` |
| [#6](https://github.com/krigsvolddesign/react/pull/6) | `4fdc39d3056b5b7db0414ea09870d97b4126628f` | `feature/local-docs-archives` |
| [#7](https://github.com/krigsvolddesign/react/pull/7) | `bbee95fd0102c683cc5c5fa4bbcd1917826d29b4` | `feature/react-r2-archive` |
| [#8](https://github.com/krigsvolddesign/react/pull/8) | `e1f1cfccbf2ae1e82bb993fe915a0d9dda6e640d` | `feature/nightjar-iv-live-source-verification` |

The standalone component and gallery attribution in `PROVENANCE.md` and `examples/react-catalog/PROVENANCE.md` remains unchanged, including workbench source `04d3e14b1b1943cbf2a90f1a727822d87327b2ae` and frozen Nightjar II `80a5635abe4de7a07a1983de0b3ef796b101e047`.

## Changes beyond the reviewed candidate

The package source, styles, fixtures, gallery, dependencies/lockfiles, archive implementation, source attribution, and Firefox runner remediation are unchanged from #8. Changes are limited to five workflow files, the package/archive browser-check runners, and this integration evidence. Gallery workflow/runner/helper/regression tests remain byte-identical to #8.

All active workflows now cancel superseded commits using workflow-specific PR/ref concurrency, avoid duplicate feature pushes, and cap every job at 10–15 minutes. Package browser and archive browser matrices each cap at two; archive history caps at one. The gallery retains its Firefox smoke gate and complete three-engine × two-base matrix. At most ten jobs from one latest integration PR can run at once across these workflows; this is not an organization-wide quota across unrelated PRs. Verification is performed one family at a time, Martlet then Krigsvold, without redundant dispatches or matrix reruns.

Other browser runners reuse the reviewed 15-second operation/font guard, 30-second navigation/launch limit, 45-second axe limit, five-second cleanup limit and three-minute script watchdog. Browser steps have four-minute limits; installation has five-minute limits. Existing assertions are retained with identical AST arguments and order. The archived documentation runner keeps its existing bounded network-idle font/asset readiness check; it does not return an in-page ready promise. Timeouts remain nonzero failures. Final source comparison and assertion evidence is in [the provenance record](docs/qa/react-integration-provenance.json); exact-head hosted results are recorded on the consolidated PR.

## Release safety and merge decision

The package remains private and all three tag-publishing jobs remain explicitly disabled. The existing workbench React publisher is untouched; this integration does not authorize authority cutover, publication, production tags, trust changes or deployment. Nonpublishing rehearsals create only disposable local Git tags and use npm dry-run against localhost.

The integration PR targets develop and requires reviewed merge-commit integration, not a squash that discards attribution. Main/develop are currently reported unprotected; effective strict GitFlow required-review/check settings need maintainer configuration/verification before merge. Production archive/attestation, npm authority-cutover and deployment acceptance remain separate release gates, not evidence established by passing these development checks. Stop for the final integration approval; do not merge under this preparation task.
