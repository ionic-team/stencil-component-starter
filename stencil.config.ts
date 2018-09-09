import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'stencomp',
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
