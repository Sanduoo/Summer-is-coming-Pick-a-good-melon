const regeneratorRuntime = require('regenerator-runtime')
const tf = require('@tensorflow/tfjs-core')
// import * as tf from '@tensorflow/tfjs-core';
const tfl = require('@tensorflow/tfjs-layers')
//index.js
//获取应用实例
//python - m http.server 8080
//tensorflowjs_converter --input_format=keras mnist.h5 tfjs_mnist
const app = getApp()

Page({
  async onReady() {
    const camera = wx.createCameraContext(this)
    // lode Model
    const net = await this.loadModel()

    this.setData({ result: 'Loading' })

    let count = 0
    const listener = camera.onCameraFrame((frame) => {
      count++
      if (count === 10) {
        if (net) {
          this.predicts(net, frame)
        }
        count = 0
      }
    })
    listener.start()
  },
  async loadModel() {
    const net = await tfl.loadLayersModel('http://49.235.250.162:8888/download?filename=%2Fwww%2Fwwwroot%2Fmodel%2Fbaseline%2Fmodel.json')
    net.summary()
    return net
  },
  async predicts(net, frame) {
    const imgData = { data: new Uint8Array(frame.data), width: frame.width, height: frame.height }
    const x = tf.tidy(() => {
      const imgTensor = tf.browser.fromPixels(imgData, 4)
      const d = Math.floor((frame.height - frame.width) / 2)
      const imgSlice = imgTensor.slice([d, 0, 0], [frame.width, -1, 3])
      const imgResize = tf.image.resizeBilinear(imgSlice, [32, 32])
      return imgResize

    })

    const y = await net.predict(x.expandDims(0)).argMax(1)
    const res = y.dataSync()[0]
  

    if(res == 1){
      this.setData({ result: "甜" })
    }else{
      this.setData({ result: "不甜" })
    }
    


  },
})
