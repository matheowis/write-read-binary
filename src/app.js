import React from 'react';
import ReactDOM from 'react-dom';
import FileSaver from './components/FileSaver';
import FileLoader from './components/FileLoaderMapped';
import BinaryWriteRead from './modules/BinaryWriteRead';
const testInt16 = new Uint8Array(new Int16Array([-13389]).buffer);
console.log('the int =',new Int16Array(testInt16.buffer));

const test = new  BinaryWriteRead();
test.AppendStructure();

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