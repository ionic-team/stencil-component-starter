exports.config = {
  namespace: 'mycomponent',
  outputTargets:[{type: 'dist'}]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
