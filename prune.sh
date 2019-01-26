#!/usr/bin/env sh

# Fork of https://github.com/tuananh/node-prune
#   ... which is a port of https://github.com/tj/node-prune to bash
#
# See also:
#   - https://github.com/tuananh/node-prune
#   - https://github.com/timoxley/cruft
#   - https://yarnpkg.com/en/docs/cli/autoclean
#   - https://github.com/ModClean/modclean
#
# Prunes common files that are unnecessarily published in npm packages
# when people don't configure `.npmignore` or package.json's `files`

echo "Before: "$(du -hs .)
echo "Files: "$(find node_modules/ -type f | wc -l)

# Common unneeded files
find . -type d -name node_modules -prune -exec find {} -type f \( \
  -name   _config.yml -or \
  -name   .appveyor.yml -or \
  -name   .babelrc -or \
  -name   .coveralls.yml -or \
  -name   .documentup.json -or \
  -iname  .ds_store -or \
  -name   .editorconfig -or \
  -name   .editorconfig -or \
  -name   .eslintignore -or \
  -name   .eslintrc -or \
  -name   .eslintrc.js -or \
  -name   .eslintrc.json -or \
  -name   .eslintrc.yaml -or \
  -name   .eslintrc.yml -or \
  -name   .flowconfig -or \
  -name   .gitattributes -or \
  -name   .gitattributes -or \
  -name   .gitlab-ci.yml -or \
  -name   .gitmodules -or \
  -name   .htmllintrc -or \
  -name   .jshintrc -or \
  -name   .lint -or \
  -name   .npmignore -or \
  -name   .npmrc -or \
  -name   .stylelintrc.js -or \
  -name   .stylelintrc.json -or \
  -name   .stylelintrc.yaml -or \
  -name   .stylelintrc.yml -or \
  -name   .tern-port -or \
  -name   .tern-project -or \
  -name   .travis.yml -or \
  -name   .yarn-integrity -or \
  -name   .yarn-metadata.json -or \
  -name   .yo-rc -or \
  -name   appveyor.yml -or \
  -iname  AUTHORS -or \
  -name   builderror.log -or \
  -iname  CHANGELOG -or \
  -iname  CHANGELOG.md -or \
  -iname  changes -or \
  -name   circle.yml -or \
  -iname  CONTRIBUTORS -or \
  -name   desktop.ini -or \
  -name   eslint -or \
  -iname  Gruntfile.js -or \
  -iname  Gulpfile.js -or \
  -name   htmllint.js -or \
  -name   jest.config.js -or \
  -name   karma.conf.js -or \
  -iname  LICENCE -or \
  -iname  LICENSE -or \
  -iname  LICENSE-BSD -or \
  -iname  LICENSE-jsbn -or \
  -iname  LICENSE-MIT -or \
  -iname  LICENSE-MIT.txt -or \
  -iname  LICENSE.BSD -or \
  -iname  LICENSE.md -or \
  -iname  LICENSE.txt -or \
  -iname  Makefile -or \
  -name   npm-debug.log -or \
  -iname  README -or \
  -iname  README.md -or \
  -name   robot.html -or \
  -iname  thumbs.db -or \
  -name   tsconfig.json -or \
  -name   "*.coffee" -or \
  -name   "*.gypi" -or \
  -name   "*.jst" -or \
  -name   "*.markdown" -or \
  -name   "*.md" -or \
  -name   "*.mkd" -or \
  -name   "*.obj" -or \
  -name   "*.sln" -or \
  -name   "*.swp" -or \
  -name   "*.vcxproj.filters" -or \
  -name   "*.vcxproj" -or \
  \( -name   '*.ts' -and \! -name '*.d.ts' \) \
\) -print0 \; | xargs -0 rm -rf

# Common unneeded directories
find . -type d -name node_modules -prune -exec find {} -type d \( \
  -name   __tests__ -or \
  -name   .circleci -or \
  -name   .github -or \
  -name   .idea -or \
  -name   .nyc_output -or \
  -name   .vscode -or \
  -name   assets -or \
  -name   coverage -or \
  -name   doc -or \
  -name   docs -or \
  -name   example -or \
  -name   examples -or \
  -name   images -or \
  -name   powered-test -or \
  -name   test -or \
  -name   tests -or \
  -name   website \
\) -print0 \; | xargs -0 rm -rf

# TODO look into issues with these
# -name node-gyp -or \
# -name node-pre-gyp -or \
# -name gyp -or \

echo "After: "$(du -hs .)
echo "Files: "$(find node_modules/ -type f | wc -l)
