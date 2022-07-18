export const makeTimeStamp=()=>{

    const hour = new Date(Date.now()).getHours()    
    const min = new Date(Date.now()).getMinutes()
    const sec =  new Date(Date.now()).getSeconds()
    
    let mins=  min+''
    let secs=':'+sec
     if(min<10){
     mins = '0'+ min
     }
    
     if(sec<10){
     secs = '0' + sec
     }
    
     return hour+':'+ mins + secs
     }  
