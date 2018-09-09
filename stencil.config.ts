<<<<<<< HEAD:stencil.config.js
exports.config = {
  namespace: 'stencomp',
=======
import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'mycomponent',
>>>>>>> 69a1829c93a44b1b324d8a5646032cafcdd40306:stencil.config.ts
  outputTargets:[
    {
      type: 'dist'
    },
    {
      type: 'www',
      serviceWorker: null
    }
  ]
};
