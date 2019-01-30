const desiredInput = [
  // items.length is not important
  [ // item
    // always saved

    {
      index: 0,
      startBool: [0, 0, 1, 0, 0, 0, 0, 0],
      value: [
        { type: 'float64', value: 234.234 },
        { type: 'float64', value: [234, 213] },
        { type: 'bool', value: [true, false, true] },
      ]
    },
    {
      index: 3,
      value: [
        { type: 'float64', value: 534.234 },
        { type: 'float64', value: [434, 413] },
        { type: 'bool', value: true },
      ]
    }
  ],
];
// full item structure
const structureInput = [
  {
    index: 0,
    value: [
      { type: 'float64', name: 'floatA' },
      { type: 'float64', name: 'floatB' },
      { type: 'bool', name: ['boolA', 'boolB', 'boolC'] },
    ]
  },
  {
    index: 3,
    value: [
      { type: 'float64', name: 'floatA1' },
      { type: 'float64', name: 'floatB1' },
      { type: 'bool', name: 'boolA0' },
    ]
  },
  {
    index: 5,
    value: [
      { type: 'float64', name: 'floatA2' },
      { type: 'float64', name: 'floatB2' },
      { type: 'bool', name: 'boolA1' },
    ]
  }
]
const desiredOutput = [ // could be also input
  [
    {
      index: 0,
      floatA: 234.234,
      floatB: [234, 213],
      boolA: true,
      boolB: false,
      boolC: true
    },
    {
      index: 3,
      floatA0: 534.234,
      floatB0: [434, 413],
      boolA0: true
    }
  ]
]
const desiredInput2 = desiredOutput.map((d, i) => {
  const structure = structureInput.find(s => s.index === d.index).value;
  const keys = Object.keys(d).filter(k => k !== 'index');
  const output = {
    index: d.index,
    value: keys.map(key => {
      const type = structure.find(s => typeof s.name === 'string' ? s.name === key : s.name.includes(key)).type;
      const value = d[key];
      return { type, value };
    })
  }
  if (i === 0) {
    return {}
  }
})
// binary structure
// start with bool -> 8byte float -> 
// arr length if byte > 255 use another byte, go up to 3 bytes
