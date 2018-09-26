import React from 'react';
import { encryptData } from '../encryption/fileEncryptor';
import { GenSettings } from '../encryption/dataMap';

class FileLoader extends React.Component {
  onLoad(file) {
    var x = file.target;
    console.log(x.files[0]);
    const blob = x.files[0];
    var reader = new FileReader();
    reader.onload = obj => {
      const res = obj.target.result;
      const result = encryptData(obj.target.result);
      console.log()
      console.log('Loaded Test =', result[GenSettings.test]);
      console.log('encryptData', result);
    }
    reader.readAsBinaryString(blob);
  }
  render() {
    return (
      <div>
        <input
          id="contained-button-file"
          size="50"
          multiple
          type="file"
          onChange={this.onLoad}
        />
      </div>
    )
  }
}

export default FileLoader;