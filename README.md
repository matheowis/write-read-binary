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

  index is used to define items with extra variables,first byte at the begining of each iteration will tell if there are any of them, so in binary: 
  00000000 mean that only variables with indexes ( 0 ) are present in this iteration 
  01001010 mean that only variables with indexes ( 0, 2, 4, 7 ) are present in this iteration

  there will also be array definition
  ```
  BinaryWriteRead.AppendStructureArray(type,name,index);
  myBinary.AppendStructureArray(typeEnum.uint16,"myArrayName",0);
  ```
  first 2 bytes of array will define its length, so the max length of na array is 2^16

  there will also be option for boolean definition with 
  ```
  BinaryWriteRead.AppendStructureBool(names,index);
  myBinary.AppendStructureBool(["myName1","myName2"],0);
  ```

  with the function above you can append structure with up to 8 bool values

  after setting up the structure its possible to write or read

  # Write
  ```
  const allIteams = [
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

  myBinary.AddAllItems(allIteams);
  myBinary.getBlob();
  ```

  keys in the allItems object have to mach with the names in the structure!

  # Read

  I don't have any functions for that yet


