'use client'

'use client'
import React from 'react';
import globalContext from './global-context';
const tes = "text"

function Context({children}) {
return (
  <globalContext.Provider value={tes}  >
    {children}
  </globalContext.Provider>
)
}

export default Context;
