# README #

### Work in progress - It doesn't work yet!
 
 ## Plan

  The idea is to create a class that will let you simply write and read binary files

  I believe it could help saving light data that would be hard to read without proper structure setup, of course its far from secure, in the future i could probably make some bit shifts to improve security

 # First of all user will have to set up file structure
  ```
  const myBinary = new BinaryWriteRead();

  BinaryWriteRead.AppendStructure(type,name,index);
  myBinary.AppendStructure(typeEnum.float32,"myFloatName",0);
  ```

  The above code means that in each iteration there will be a variable of type float32 and name myName

  index is used to define items with extra variables,first byte at the beggining of each iteration will tell if there are any of them, so in binary: 
  - 00000000 mean that only variables with indexes ( 0 ) are present in this iteration 
  - 01001010 mean that only variables with indexes ( 0, 2, 4, 7 ) are present in this iteration

  there will also be array definition
  ```
  BinaryWriteRead.AppendStructureArray(type,name,index);
  myBinary.AppendStructureArray(typeEnum.uint16,"myArrayName",0);
  ```
  first 2 bytes of array will define its length, so the max length of na array is 2^16

  Another idea for length definition:

  length bytes could be set like UTF-8 encoding, so first bits would tell how much bytes we need
  in case of 2 bytes the maximum number of uint would be 2^14 instead of 2^16,
  but it could decrease size on numbers lower than 2^7 and it wouldn't have any length limits
  it probably should have limit of 4 or 5 byte anyway to prevent some precision errors
  in such encoding using 32bit and maximum lengths it would take
  - 1 byte - 0.5kb - 2^7 * 4 bytes
  - 2 byte - 64kb  - 2^14 * 4 bytes
  - 3 byte - 8mb   - 2^21 * 4 bytes
  - 4 byte - 1gb   - 2^28 * 4 bytes
  - 5 byte - 128gb - 2^35 * 4 bytes

  i personaly can't see the need of saving arrays that are larger than 2^21, so i'll probably create an error if anyone will try creating any bigger array

  ```
  myBinary.enableLongArrays = true; // no more length errors
  ```

  there will also be option for boolean definition with 
  ```
  BinaryWriteRead.AppendStructureBool(names,index);
  myBinary.AppendStructureBool(["myName1","myName2"],0);
  ```

  with the function above you can append structure with up to 8 bool values

  after setting up the structure its possible to write or read

  # Write
  ```
  const allItems = [
    {
      myFloatName:5.765,
      myArrayName:[ 56, 78, 23 ],
      myName1:true,
      myName2:false,
    },
    {
      myFloatName:56.952,
      myArrayName:[ 21, 531, 917 ],
      myName1:false,
      myName2:false,
    }
  ]

  myBinary.AddAllItems(allItems);
  myBinary.getBlob();
  ```

  keys in the allItems object have to mach with the names in the structure!

  # Read

  I plan to give back the same object as allItems
  
  I don't have any functions for that yet



