/* eslint-disable no-unused-vars */
import React from 'react'

//import { Provider } from 'react-redux';
// import store from './redux/store';
import { ThemeProvider } from './context/ThemeContext';
import AppRouter from './AppRouter';

/**
 * The main component of the Baby Steps application.
 * This component serves as the entry point for the app.
 *
 * @component
 */
const App = () => {


  return (
  
      <ThemeProvider>
        <div className='App'>
          <AppRouter />
        </div>
      </ThemeProvider>
   
  )
}

export default App
