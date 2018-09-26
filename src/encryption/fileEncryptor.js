import { dataMap, bytesPerPoint, bitsToEndData } from './dataMap';

const stringToBytes = (rawData = '') => {
  var bytes = new Uint8Array(rawData.length);
  for (var i = 0; i < rawData.length; i++) {
    bytes[i] = rawData.charCodeAt(i);
  }
  return bytes;
}

export const encryptData = (rawData = '') => {
  const byteData = stringToBytes(rawData);
  const pointSize = bytesPerPoint();
  const points = byteData.length / pointSize
  if (!Number.isInteger(points)) {
    console.error(`Data not compatible with dataMap PointSize=${pointSize},DataBinarySize=${byteData.length}, val=${points}`);
    return
  }
  const pointsArray = [];
  for (var i = 0; i < points; i++) {
    const pointData = {};
    let pointDataIndex = 0;
    dataMap.map(data => {
      const cIndex = pointDataIndex + (i * pointSize);
      const add = data.bytes * data.values;
      const currentbytes = byteData.slice(cIndex, cIndex + add);
      pointDataIndex += add;
      pointData[data.name] = bitsToEndData(data, currentbytes);
    });
    pointsArray.push(pointData);
  }
  return pointsArray;
}