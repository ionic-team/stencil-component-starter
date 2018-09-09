'use strict';
const vinylFile = require('vinyl-file');
const Compiler = require('@stencil/core/dist/compiler').Compiler;
const nodeSys = require('@stencil/core/dist/sys/node');

function buildFile (file, distPath) {

  let logger = new nodeSys.NodeLogger();
  let sys = new nodeSys.NodeSystem();
  let config = { 
    logger,
    sys,
    srcDir: file.dirname,
    rootDir: file.cwd,
    outputTargets:[
      {
        type: 'dist',
        dir: distPath
      },
    ]
  };
  let compiler = new Compiler(config);
  if (!compiler.isValid) {
      return null;
  }
  return compiler.build()
    .then(res => {
      return res.filesWritten.map(f => {
        return vinylFile.readSync(f);
      }) 
    });  
};

function compile(files, distPath) {
  let compiledFiles = files.filter(f => f.extname === '.tsx');
  let buildFiles = compiledFiles.map(f => {
    return buildFile(f, distPath);
  });
  return Promise.all(buildFiles);
}

module.exports = {
  compile
};
