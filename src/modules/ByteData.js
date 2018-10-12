class ByteData {
  constructor(size) {
    this.binaryData = new Uint8Array(size);
    this._cIndex = 0;
    this.push = this.push.bind(this);
  }
  push(...bytes) {
    for (var i = 0; i < arguments.length; i++) {
      this.binaryData[this._cIndex] = arguments[i];
      this._cIndex++;
    }
  }
  pushType(type, value) {
    switch (type) {
      case this.type.Uint8:
        this.push(value);
        break;
      case this.type.Uint16:
        const vals = new Uint8Array(new Uint16Array(value).buffer);
        this.push(vals[0], vals[1]);
        break;
      case this.type.Uint32:
        const vals = new Uint8Array(new Uint32Array(value).buffer);
        this.push(vals[0], vals[1], vals[2], vals[3]);
        break;
      case this.type.Int8:
        const vals = new Uint8Array(new Int8Array(value).buffer);
        this.push(vals[0]);
        break;
      case this.type.Int16:
        const vals = new Uint8Array(new Int16Array(value).buffer);
        this.push(vals[0], vals[1]);
        break;
      case this.type.Int32:
        const vals = new Uint8Array(new Int32Array(value).buffer);
        this.push(vals[0], vals[1], vals[2], vals[3]);
        break;
      case this.type.float32:
        const vals = new Uint8Array(new Float32Array(value).buffer);
        this.push(vals[0], vals[1], vals[2], vals[3]);
        break;
      case this.type.float64:
        const vals = new Uint8Array(new Float64Array(value).buffer);
        this.push(vals[0], vals[1], vals[2], vals[3], vals[4], vals[5], vals[6], vals[7]);
        break;
    }
  }
  type = {
    Uint8: 'Uint8',
    Uint16: 'Uint16',
    Uint32: 'Uint32',
    Int8: 'Int8',
    Int16: 'Int16',
    Int32: 'Int32',
    float32: 'float32',
    float64: 'float64',
  }

}
export default ByteData;