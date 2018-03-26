exports.config = {
  namespace: 'mycomponent',
  outputTargets:[
    { type: 'dist' },
    { type: 'www' }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
