# baseline介绍
  
        baseline.ipynb-模型训练
        resize2.ipynb-制作训练集resize样本尺寸、生成对应的标注信息
        baseline.h5-保存的模型（使用tensorflowjs_converter --input_format=keras model.h5 tfjs_model可将模型转化为TFjs可以导入的格式）
        tfjs_baseline-tfjs可导入的模型格式（model.json-模型的结构、group1-shard1of1.bin-模型的参数）
  
# 环境
  
        微信小程序开发工具
        TensorflowJS-Anaconda
        Node.js(regenerator-runtime/@tensorflow/tfjs-core/@tensorflow/tfjs-layers)