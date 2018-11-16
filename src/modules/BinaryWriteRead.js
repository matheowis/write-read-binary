import SmartBinary from './SmartBinary';

const typeEnum = {
  float32: 'f32',
  float64: 'f64',
  int8: 'i8',
  int16: 'i16',
  int32: 'i32',
  uint8: 'ui8',
  uint16: 'ui16',
  uint32: 'ui32',
  bool: 'b8',
  string6: 's6' // first byte is the string length, can i lower the size? 
  // could allow only letters and numbers (62) using 6 bit per symbol
  // 64 if i add space and / for special characters, also, due to bit shift it would be encrypted
}

// idea for the future //
// using additional byte in each variable you could load any data
// first byte would tell what type it is and if it is an array
// it would increase the overal size and made it easy to decode
// end of the idea //


const structureItem = [
  {
    index: 0, struct: [
      { type: 'i32', isArray: true } // its an array so first two bytes are the length - max size is 2^16 = 65k
    ]
  },
  { index: 1 },
  { index: 4 },
  { index: 7 }
]

structureItem.map(structure => {

})

const BinaryWriteRead = function () {
  // dont change that directly!
  this.__structure = [];

  // dont change that directly!
  this.__buffer = [];

  // dont change that directly!
  this.__binary;

  // that will allow creating of arrays bigger then 2^21 elements
  this.enableLongArrays = false;

  // only affects Writing
  this.format = 'bin';
}

BinaryWriteRead.prototype.AppendStructure = function (type, name = '', index = 0) {

  if (name === '') { throw 'You have to assing name in AppendStructure method'; }
  const indextStruct = this.__structure.find(item.index === index);
  if (indextStruct) {
    if (!indextStruct.struct) {
      indextStruct.struct = [];
    }
    indextStruct.struct.push({ type: type, isArray: false });
  } else {
    this.__structure.push({ index: index, struct: [{ type: type, isArray: false }] });
  }
}

BinaryWriteRead.prototype.AppendStructureArray = function (type, name = '', index = 0) {
  if (name === '') { throw 'You have to assing name in AppendStructureArray method' }
  const indextStruct = this.__structure.find(item.index === index);
  if (indextStruct) {
    if (!indextStruct.struct) {
      indextStruct.struct = [];
    }
    indextStruct.struct.push({ type: type, isArray: true, name: name });
  } else {
    this.__structure.push({ index: index, struct: [{ type: type, isArray: true }] });
  }
}
// up to 8 names per byte
BinaryWriteRead.prototype.AppendStructureBool = function (names = [], index = 0) {
  if (names.length === 0 || names.length > 8) {
    throw 'names array in AppendStructureBool method has to be of length between <1,8>'
  }
  if (indextStruct) {
    if (!indextStruct.struct) {
      indextStruct.struct = [];
    }
    indextStruct.struct.push({ type: typeEnum.bool, isArray: true, name: name });
  } else {
    this.__structure.push({ index: index, struct: [{ type: typeEnum.bool, isArray: true }] });
  }
}

/// it may ba a good idea to use workers here in the future
BinaryWriteRead.prototype.AddItem = function (item = {}) {
  const localBuffer = { indexes: [] };
  for (var segment in this.__structure) {
    for (var variable in segment.struct) {
      const name = Object.keys(item).find(key => key === variable.name);
      if (name) {
        if (!localBuffer.indexes.includes(segment.index)) {
          localBuffer.indexes.push(segment.index);
        }
        localBuffer[name] = { value: item[name], type: variable.type, isArray: variable.isArray };
      }
    }
  }
  localBuffer.indexes.sort((a, b) => a - b);
  this.__buffer.push(localBuffer);
}
/// if you decide to use workers remember to rewrite Additem implementation into the worker
BinaryWriteRead.prototype.AddAllItems = function (items = []) {
  for (var item in items) {
    this.AddItem(item);
  }
}
// it probably should return a promise
BinaryWriteRead.prototype.Write = function () {
  const binaryLength = getBinarySize(this.__buffer);
  this.__binary = new SmartBinary(binaryLength);
  for (var item in this.__buffer) {
    this.__binary.Push(getFirstByte(item.indexes));
    for (var index in item.indexes) {
      const structs = this.__structure.find(id => id.index === index).struct;
      for (var struct in structs) {
        if (item[struct.name].isArray) {

        } else {
          this.__binary.AddArray(EncodeFormat(item[struct.name].type, item[struct.name].value));
        }
      }
    }
  }
}
function getFirstByte(indexes = []) {
  let binary = '';
  for (var i = 0; i < 8; i++) {
    if (indexes.includes(i)) {
      binary += '1';
    } else {
      binary += '0';
    }
  }
  return parseInt(binary, 2);
}
// will have to change in new array encoding type
function getBinarySize(buffer = []) {
  const binaryLength = 0;
  for (var item in buffer) {
    binaryLength++; //indexByte
    const itemKeys = Object.keys(item);
    for (var key in itemKeys) {
      if (item[key].isArray) {
        binaryLength += 2;//Uint16 that sets the length of the array // should depend on array size 2^8n-n, where n is amount of bytes
        binaryLength += item[key].value.length * typeSize(item[key].type);
      } else {
        binaryLength += typeSize(item[key].type);
      }
    }
  }
  return binaryLength;
}
// EncodeFormat();
function typeSize(type) {
  switch (type) {
    case typeEnum.uint8:
      return 1;
    case typeEnum.uint16:
      return 2;
    case typeEnum.uint32:
      return 4;
    case typeEnum.int8:
      return 1;
    case typeEnum.int16:
      return 2;
    case typeEnum.int32:
      return 4;
    case typeEnum.float32:
      return 4;
    case typeEnum.float64:
      return 8;
    case typeEnum.bool:
      return 1;
  }
}
function EncodeFormat(type, value) {
  switch (type) {
    case typeEnum.uint8:
      return WriteUINT8(value);
    case typeEnum.uint16:
      return WriteUINT16(value);
    case typeEnum.uint32:
      return WriteUINT32(value);
    case typeEnum.int8:
      return WriteINT8(value);
    case typeEnum.int16:
      return WriteINT16(value);
    case typeEnum.int32:
      return WriteINT32(value);
    case typeEnum.float32:
      return WriteFLOAT32(value);
    case typeEnum.float64:
      return WriteFLOAT64(value);
    case typeEnum.bool:
      return WriteBOOL(value);
    case typeEnum.string:
      return WriteSTRING6(value);
  }
}

function WriteUINT8(value) {
  return new Uint8Array([value])
}
function WriteUINT16(value) {
  return new Uint8Array(new Uint16Array([value]).buffer);
}
function WriteUINT32(value) {
  return new Uint8Array(new Uint32Array([value]).buffer);
}
function WriteINT8(value) {
  return new Uint8Array(new Int8Array([value]).buffer);
}
function WriteINT16(value) {
  return new Uint8Array(new Int16Array([value]).buffer);
}
function WriteINT32(value) {
  return new Uint8Array(new Int32Array([value]).buffer);
}
function WriteFLOAT32(value) {
  return new Uint8Array(new Float32Array([value]).buffer);
}
function WriteFLOAT64(value) {
  return new Uint8Array(new Float64Array([value]).buffer);
}
function WriteBOOL(values = []) {
  // const binary = value.toString(2);
  let binary = '';
  for (value in values) {
    if (value) binary += '1';
    else binary += '0'
  }
  return new Uint8Array(parseInt(binary, 2));
}
function WriteSTRING6(value = '') {
  const binary = '';
  for (char in value) {
    if (CharacterMapping64[char] === undefined) {
      throw `BinaryWriteRead does not support character "${value}".\n Please use standard english characters with no special symbols in Your string`//\n or use UTF type
    }
    binary += CharacterMapping64[char].toString(2);
  }
  const frontCut = 8 - binary.length % 8; // first string bit, tells how many frontal 0 have to be cut off
  for (var i = 0; i < frontCut; i++)
    binary = '0' + binary;
  const outBinary = new SmartBinary(1 + binary.length / 8);
  outBinary.Push(frontCut);
  for (var i = 0; i < binary.length / 8; i++)
    outBinary.Push(parseInt(binary.substr(0, 8), 2));
  return outBinary.binary;
}
const CharacterMapping64 = {
  ' ': 0, '.': 1,//2
  q: 2, w: 3, e: 4, r: 5, t: 6, y: 7, u: 8, i: 9, o: 10, p: 11,
  a: 12, s: 13, d: 14, f: 15, g: 16, h: 17, j: 18, k: 19, l: 20, z: 21, x: 22,
  c: 23, v: 24, b: 25, n: 26, m: 27,//26
  Q: 28, W: 29, E: 30, R: 31, T: 32, Y: 33, U: 34, I: 35, O: 36, P: 37, A: 38,
  S: 39, D: 40, F: 41, G: 42, H: 43, J: 44, K: 45, L: 46, Z: 47, X: 48, C: 49,
  V: 50, B: 51, N: 52, M: 53,//26
  '1': 54, '2': 55, '3': 56, '4': 57, '5': 58, '6': 59, '7': 60, '8': 61, '9': 62, '0': 63//10
}
// const testBuffer = [
//   {
//     name1: { type, value, isArray }
//   }
// ]

const myObj = new BinaryWriteRead();

myObj.AppendStructure(typeEnum.int32);




export default BinaryWriteRead;