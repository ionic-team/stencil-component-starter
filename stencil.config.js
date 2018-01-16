exports.config = {
  namespace: 'my-components',
  generateDistribution: true,
  bundles: [
    { components: ['my-component'] }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
