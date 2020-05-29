import React from 'react';
import { Provider } from 'react-redux'
import store from './redux/store'
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import ExpenseManager from './Container/ExpenseManager'

function App() {
  return (
    <Provider store={store}>
        <ExpenseManager />
    </Provider >
  );
}

export default App;
