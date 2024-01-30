let alerts = require('../data/alerts.json')
const{v4: uuidv4} = require('uuid')
const {writeDataToFile} = require('../controllers/writeFile')

function findAll(){
    return new Promise((resolve, reject)=>{
        resolve(alerts)
    })
}

function findOne(idn){ 
    return new Promise((resolve, reject)=>{
        var result=alerts.filter(obj=> obj.id == idn);
        resolve(result)
    })
}
function PostNew(alert){
    return new Promise((resolve, reject)=>{
      const newAlert = {id: uuidv4(), ...alert}
      alerts.push(newAlert)
      if(process.env.NODE_ENV !== 'test'){
        writeDataToFile('./data/alerts.json',alerts)
      }
      resolve(newAlert)
    })
}

function UpdateAlert(id,alert){
    return new Promise((resolve, reject)=>{
        const index = alerts.findIndex((a)=> a.id ===id)
        alerts[index]= {id, ...alert}
        writeDataToFile('./data/alerts.json',alerts)
        resolve(alerts[index])
    })
}

function DeleteAlert(idn){
    return new Promise((resolve, reject)=>{
        alerts =alerts.filter(obj=> obj.id !== idn);
        writeDataToFile('./data/alerts.json',alerts)
        resolve()
    })
}
module.exports = {
    findAll,
    findOne,
    PostNew,
    UpdateAlert,
    DeleteAlert
}