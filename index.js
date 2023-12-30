 const http=require('http')
 const fs = require('fs');
const request=require('requests');
// const { error } = require('console');
// const { error } = require('console');
 const HomFile=fs.readFileSync("home.html","utf-8");


//  https://api.openweathermap.org/data/2.5/weather?id={city id}&appid={API key}

const replaceVal=(tempVal,OrgVal)=>{
    let temperature=tempVal.replace("{%tempVal%}",OrgVal.main.temp)
    temperature=temperature.replace("{%temp_min%}",OrgVal.main.temp_min)
    // console.log(temperature);
    temperature=temperature.replace("{%location%}",OrgVal.name)
    temperature=temperature.replace("{%temp_max%}",OrgVal.main.temp_max)
    return temperature;
}
// 85d051013894598fa521d062bd17a09c

const server=http.createServer((req,res)=>{
    if(req.url=="/"){
        request("https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=28c6707f6d96c63bbaa918e00b8d7aa5"
        )
        .on("data",(chunk)=>{
            const objdata=JSON.parse(chunk)
            const arrdata=[objdata];

            const realtimedata=arrdata.map((val)=>replaceVal(HomFile,val)).join();    
                res.write(realtimedata);
            
            // console.log(realtimedata);
            // console.log(arrdata[0].main.temp);

            // document.writeln(arrdata);
        })
        .on("end",(err)=>{
            if(err) return console.log("connection closed due to error",err);
            // console.log("end");
            res.end();
        })
    }
})
server.listen(8000,"127.0.0.1");