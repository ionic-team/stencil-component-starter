exports.config = {
  namespace: 'webcomponent',
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
