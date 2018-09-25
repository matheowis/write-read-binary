import React from 'react';
import ReactDOM from 'react-dom';
import FileSaver from './components/FileSaver';
import FileLoader from './components/FileLoader';

const DashboardPage = () => (
  <div>
    <h1>Hello World!</h1>
    <FileSaver />
    <FileLoader />
  </div>
)

const jsx = (
  <DashboardPage />
)

ReactDOM.render(jsx, document.getElementById('app'));