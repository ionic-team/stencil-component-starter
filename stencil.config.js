exports.config = {
  namespace: 'myname',
  generateDistribution: true,
  bundles: [
    { components: ['my-name'] }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
