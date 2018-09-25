import React from 'react';

class FileLoader extends React.Component {
  onLoad(file) {
    var x = file.target;
    console.log(x.files[0]);
    const blob = x.files[0];
    var reader = new FileReader();
    reader.onload = obj => {
      const res = obj.target.result;
      var bytes = new Uint8Array(res.length);
      for(var i =0;i<res.length;i++){
        bytes[i] = res.charCodeAt(i);
      }
      console.log('bytes=',bytes);
      const floats = new Float32Array(bytes.buffer);
      console.log('floats=',floats);
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