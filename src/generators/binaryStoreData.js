import { lerp } from '../calc';
const generateData = (size) => {
  const item = (anim = false) => {
    const obj = {
      // 0 empty, 1 base, 2 anim
      positionx: lerp(-1000, 1000, Math.random()),//float32
      positiony: lerp(-1000, 1000, Math.random()),//float32
      positionz: lerp(-1000, 1000, Math.random()),//float32
      colorr: Math.ceil(lerp(0, 255.9, Math.random())),//uint8
      colorg: Math.ceil(lerp(0, 255.9, Math.random())),//uint8
      colorb: Math.ceil(lerp(0, 255.9, Math.random())),//uint8
      thick: Math.ceil(lerp(0, 65535.9, Math.random())),//uint16
      sides: Math.ceil(lerp(0, 255.9, Math.random())),
    }

  }
}
const objStruct = {
  points: [
    {
      positionx: 0,//float32
      positiony: 0,//float32
      positionz: 0,//float32
      colorr: 0,//uint8
      colorg: 0,//uint8
      colorb: 0,//uint8
      thick: 0,//uint16
      sides: 0,//uint8
      materialId: 0,//uint8
    }
  ],
  AnimPoints: [
    {
      time: [0, 0, 0, 0, 0],//uint8
      positionx: [0, 0, 0, 0, 0],//float32
      positiony: [0, 0, 0, 0, 0],//float32
      positionz: [0, 0, 0, 0, 0],//float32
    }
  ]
}