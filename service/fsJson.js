//过滤无效数据

const fs = require('fs')

fs.readFile('./data_json/goods.json','utf8',(error,data)=>{
  let newData = JSON.parse(data)
  let pushData = []
  let i = 0
  newData.RECORDS.map((value,idnex)=>{
    if(value.IMAGE1!=null){
      i++
      console.log(value.NAME)
      pushData.push(value)
    }
  })
  console.log(i)
  //console.log(pushData)
  fs.writeFile('./newGoods.json',JSON.stringify(pushData),error =>{
    if(error)
      console.log('写文件操作失败')
    else
      console.log('操作成功')
  })
})
