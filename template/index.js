module.exports = function() {
  const pkg = require('./package.json');
  return `${pkg.name}@${pkg.version} - ${pkg.description}`;
};
