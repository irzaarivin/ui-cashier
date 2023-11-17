'use client'

import React from 'react';
import globalContext from './global-context';

function Context({children}) {
return (
  <globalContext.Provider props={{token : 'dsasa'}} >
    {children}
  </globalContext.Provider>
)
}

export default Context;
