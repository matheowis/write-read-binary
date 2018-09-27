export const dataMap = [
  { values: 3, bytes: 4, name: 'position', type: 'float' },
  { values: 4, bytes: 1, name: 'color', type: 'int' },
  { values: 1, bytes: 2, name: 'thickness', type: 'int' },
  { values: 1, bytes: 1, name: 'sides', type: 'int' },
  { values: 6, bytes: 4, name: 'shape', type: 'float' },
];

export const bytesPerPoint = () => {
  let length = 0;
  dataMap.map(data => { length += (data.values * data.bytes) })
  return length;
}

export const GenSettings = {
  size: 50000,
  test: 35671
}

export const bitsToEndData = (dataType = dataMap[0], inputBytes = new Uint8Array()) => {
  const { bytes, type } = dataType;
  switch (type) {
    case 'float':
      switch (bytes) {
        case 4: return new Float32Array(inputBytes.buffer);
        case 8: return new Float64Array(inputBytes.buffer);
        default: console.error(`Wrong size of float! Float only supports 32 and 64 bits (got ${bytes * 8})`)
      }
    case 'int':
      switch (bytes) {
        case 1: return inputBytes
        case 2: return new Int16Array(inputBytes.buffer);
        case 4: return new Int32Array(inputBytes.buffer);
        default: console.error(`Wrong size of int! Float only supports 8, 16 and 32 bits (got ${bytes * 8})`)
      }
      console.error('Unknown type in bitsToEndData()', dataType);
  }
}