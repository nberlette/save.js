#! /usr/bin/env node
const { h, render } = require('ink');
const program = require('commander');
const p = require('../package.json');
const Comp = require('./Comp');

let unmount;

const onExit = error => {
  setTimeout(() => {
    unmount();
    process.exit(error);
  }, 0);
};

program
  .version(p.version, '-V, --version')
  .arguments('<package>')
  .usage('[@scope/]<package>[@version]')
  .action(package => {
    let [ scope, pkg, version ] = (package.startsWith('@') && ~package.indexOf('/')) 
		  ? package.split('@') 
		  : [null, ...package.split('@')];

    if (scope !== null && scope !== '') pkg = `@${scope}/${pkg}`;
    unmount = render(h(Comp, { pkg, version, onExit }));
  });

program.parse(process.argv);

if (!program.args.length) {
  program.help();
}
