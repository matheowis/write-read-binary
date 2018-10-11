new class binaryStore {
  constructor() {
    const structure = [];
    let branches = 0;
    const typeValues = {
      Uint8: 1,
      Uint16: 2,
      Uint32: 4,
      Int8: 1,
      Int16: 2,
      Int32: 4,
      float32: 4,
      float64: 8,
    }
    this.appendStructure = (type, name, branch) => {
      structure.push({ type, name, branch, byteSize: typeValues[type] });
      if (branch !== undefined && branches - 1 < branch) {
        branches = branch + 1;
      }
    }

    // TODO it should handle sorting! don't let any user make a mistake in order!
    this.Encode = (props = [[{
      name: 'branches',
      value: [false, false, false, false, false, false, false, false]
    }]]) => {


      let length = 1;// fist byte drfines format// if branches not used(undefined) than 0 else 1

      ///BINARY-LENGTH//////BINARY-LENGTH//////BINARY-LENGTH///
      ///BINARY-LENGTH//////BINARY-LENGTH//////BINARY-LENGTH///
      ///BINARY-LENGTH//////BINARY-LENGTH//////BINARY-LENGTH///
      if (branches === 0) {
        let singleLength = 0;
        structure.map(variable => {
          singleLength += variable.byteSize;
        })
        length += props.length * singleLength;
      } else {
        props.map(prop => {
          const localBranches = [];
          length++;//which branches (up to 8);
          prop.map(variable => {
            const localBranch = structure.find(sVariable => sVariable.name === variable.name).branch;
            if (!localBranches.includes(localBranch)) {
              localBranches.push(localBranch);
            }
          })
          structure.map(variable => {
            if (variable.branch === undefined || localBranches.includes(variable.branch)) {
              length += variable.byteSize;
            }
          })
        })
      }

      const binary = new Uint8Array(length);
      let cIndex = 0;
      props.map(prop => {
        prop.map(variable => {
          structureItem = structure.find(item => item.name === variable.name);
          switch (structureItem.type) {
            case this.type.Uint8:

              break;
            case this.type.Uint16:

              break;
            case this.type.Uint32:

              break;
            case this.type.Int8:

              break;
            case this.type.Int16:

              break;
            case this.type.Int32:

              break;
            case this.type.float32:

              break;
            case this.type.float64:

              break;
            default:
              console.warn(`Invalid type! There is no ${structureItem.type} type.\nAvaible types are inside binaryStore.type object `, this.type);
              break;
          }
        })
      })
    }
    this.Decode = () => { }

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