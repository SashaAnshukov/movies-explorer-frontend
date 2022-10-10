import React from 'react';
import {Navigate} from 'react-router-dom';

function ProtectedRoute ({loggedIn, children}) {
  return loggedIn ? children : <Navigate to="/" />
}

export default ProtectedRoute;