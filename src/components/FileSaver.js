import React from 'react';
import { DataGenerator } from '../generators/pointData';
import { GenSettings } from '../encryption/dataMap';
// var data = new Uint8Array(new Float32Array([1234567.456789, 2345678.432101]).buffer);

var data = DataGenerator(GenSettings.size, GenSettings.test);

class fileSaver extends React.Component {
  componentDidMount() {
    const a = document.getElementById('downloadAnchor')
    const binary = [data]; // it has to be an square array [new Uint8Array()]
    var blob = new Blob(binary, { type: "octet/stream" });
    var url = URL.createObjectURL(blob);
    console.log(blob);
    a.href = url;
    a.download = 'test.wis';
  }
  render() {
    return (
      <a id={'downloadAnchor'}>Download</a>
    )
  }
}

export default fileSaver;