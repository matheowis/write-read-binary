import ByteData from './ByteData'

new class BinaryStore {
  constructor() {
    // const structure = [[], [], [], [], [], [], [], [], []];
    const structure = {
      data: [[], [], [], [], [], [], [], [], []], // przyda się do decode
      branches: {},
      types: {},
      typeValues: {}
    };
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
    this.appendStructure = (type, name, slot = 0) => {
      // mian idea
      // based on state (new name for branch), i can determin how to load file
      // 0 - this.stateEnum.continue
      // this means that the next item structer will not change
      // 1 - this.stateEnum.change
      // this means that the next item structer will change
      // 2 - this.stateEnum.finish
      // this means that the next item structer will change to first one(next item)
      //code:
      if (slot >= 85) {//85 * 3 = 255, each structure have 3 states 
        console.error(`Error BinaryStore.appendStructure - maximum slot number is 85 (current ${slot / 3})`);
      }

      //end

    }
    // this.appendStructure = (type, name, branch = 0) => {
    //   structure.data[branch].push({ type, name, byteSize: typeValues[type] });
    //   structure.data[branch].sort((a, b) => {
    //     const nameA = a.name.toUpperCase();
    //     const nameB = b.name.toUpperCase();
    //     return nameA < nameB ? -1 : 1;
    //   });
    //   structure.branches[name] = branch;
    //   structure.types[name] = type;
    //   structure.typeValues[name] = typeValues[type];
    // }

    // TODO it should handle sorting! don't let any user make a mistake in order!
    // TODO clear overdecleration branches, no need for user to handle it
    this.Encode = (props = [{ name: 0, name2: 0 }]) => {
      let binaryLength = 1; // thats format uint
      const mainData = props.map(item => {
        binaryLength++; // thats branches
        const itemBranches = [];
        let branchVar = 0;
        const localData = [[], [], [], [], [], [], [], [], []];
        Object.keys(item).map(name => {
          binaryLength += structure.typeValues[name];
          if (!itemBranches.includes(structure.branches[name])) {
            branchVar += Math.pow(2, structure.branches[name] - 1);
            itemBranches.push(structure.branches[name]);
          }
          localData[structure.branches[name]].push({ name, type: structure.types[name], value: item[name] })
          localData[structure.branches[name]].sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1);
        })
        return [{ name: 'branch', type: this.typeEnum.Uint8, value: branchVar }, localData.concat(...arr)];
      })
      console.log(`size of binary data = ${(binaryLength / 1024).toFixed(2)}kb`);
      const binaryData = new ByteData(binaryLength);
      binaryData.push(1); // 1 = with branches;
      mainData.map(item => {
        item.map(v => { binaryData.pushType(v.type, v.value) });
      })
      return binaryData;
    }
    this.Decode = () => { }

  }
  stateEnum = {
    continue: 0,
    change: 1,
    finish: 2
  }
  typeEnum = {
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