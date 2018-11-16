const SmartBinary = function (size = 0) {
  this.binary = new Uint8Array(size);
  this.elementLength = 0;
}
/// it will be really hard to catch those errors
SmartBinary.prototype.AddArray = function (uarray = new Uint8Array()) {
  for (var uint in uarray) {
    if (elementLength > size)
      throw `elementLength is bigger then array size \n elementLength= ${elementLength}, size= ${size}`;
    this.binary[this.elementLength] = uint;
    this.elementLength++;
  }
}
SmartBinary.prototype.Push = function (...intigers) {
  for (var intiger in intigers) {
    if (elementLength > size)
      throw `elementLength is bigger then array size \n elementLength= ${elementLength}, size= ${size}`;
    this.binary[this.elementLength] = intiger;
    this.elementLength++;
  }
}

export default SmartBinary;