// const models = require('../db')
const express = require('express')
const router = express.Router()
// const mysql = require('mysql')
const music = require('../sqlMap')

// const jsonWrite = function (res, ret) {
//     if (typeof ret === 'undefined') {
//         res.json({
//             code: '1', msg: '操作失败'
//         })
//     } else {
//         res.json(
//             ret
//         )
//     }
// }
router.all("*", (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "get,path,post,delete")
    // 继续执行后续代码
    next()
  })
// 接口：增加信息
router.post('/addStu', (req, res) => {
    music.find("user", {}, (err, data) => {
        if (err) throw err
        else {
          let open = true;
          let arr = []
          for (let i = 0; i < data.length; i++) {
            if (data[i].name == req.body.name) {
              open = false
            }
            if(data[i].id) arr.push(parseInt(data[i].id))
            else{
                arr.push(0)
            }
          }       
          if (open) {
            music.add("user", { id: Math.max(...arr) + 1, name: req.body.name , age: req.body.age }, (err) => {
              if (err) throw err
              else {
                res.send({
                    code:200,
                  data: '新增成功！'
                })
              }
            })
          } else {
            res.send({
                code:0,
              data: '已存在该用户'
            })
          }
        }
      })
})

// 接口：查询全部
router.get('/showStu', (req, res) => {
    music.find("user", {
    }, (err, data) => {
        if (err) throw err
        else {
            res.send({
                code:200,
                data: data
            })
        }
    })
})

// 接口：删除信息
router.post('/delStu', (req, res) => {
    music.del("user", {
        id: parseInt(req.body.id)
    }, (err, data) => {
        if (err) throw err
        else {
            res.send({
                code:200,
                data: '删除成功！'
            })
        }
    })
})

// 接口：修改信息
router.post('/updateStu', (req, res) => {
    music.update("user", { id: parseInt(req.body.id) },  req.body , (err, data) => {
        if (err) throw err
        else {
          res.send({
              code:200,
              data: '更新成功！'
          }
          )
        }
      })
})

module.exports = router