exports.config = {
  namespace: 'myname',
  generateDistribution: true,
  generateWWW: false,
  bundles: [
    { components: ['my-name'] }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
