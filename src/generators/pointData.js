import { lerp } from '../calc';
import { bytesPerPoint } from '../encryption/dataMap'
const random32Float = () => new Float32Array([lerp(-50000, 50000, Math.random())]).buffer;

const randomFloat = () => lerp(-50000, 50000, Math.random());
const randomInt8 = () => Math.floor(lerp(0, 255.5, Math.random()))
const randomInt16 = () => Math.floor(lerp(-32767.5, 32768.5, Math.random())) //minimum -32768 and maximum +32767

export const DataGenerator = (points = 1, indexCheck = 0) => {
  let data = new Uint8Array(points * bytesPerPoint());
  let cIndex = 0;
  const addF32 = (floats = []) => {
    const float32 = new Float32Array(floats);
    const converted = new Uint8Array(float32.buffer);
    for (var i = 0; i < converted.length; i++) {
      data[cIndex] = converted[i];
      cIndex++;
    }
  }
  const addUint8 = (ints = []) => {
    const Uint8 = new Uint8Array(ints);
    for (var i = 0; i < Uint8.length; i++) {
      data[cIndex] = Uint8[i];
      cIndex++;
    }
  }
  const addInt16 = (ints = []) => {
    const Int16 = new Int16Array(ints);
    const converted = new Uint8Array(Int16.buffer);
    for (var i = 0; i < converted.length; i++) {
      data[cIndex] = converted[i];
      cIndex++;
    }
  }

  for (var i = 0; i < points; i++) {
    const positions = [randomFloat(), randomFloat(), randomFloat()]
    const colors = [randomInt8(), randomInt8(), randomInt8(), randomInt8()];
    const thickness = [randomInt16()];
    const sides = [randomInt8()];
    const ShapeData = [randomFloat(), randomFloat(), randomFloat(), randomFloat(), randomFloat(), randomFloat()];
    if (i === 0) {
      const test = positions.length + colors.length + thickness.length + sides.length + ShapeData.length;
      console.log('PointSizeGen = ', test);
    }
    addF32(positions);
    addUint8(colors);
    addInt16(thickness);
    addUint8(sides);
    addF32(ShapeData);

    // console.log('cIndex =', cIndex);

    if (indexCheck === i) {
      console.log('Generated Test =', i, {
        positions,
        colors,
        thickness,
        sides,
        ShapeData
      });
    }
  }

  return data;
}