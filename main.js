
function tens(units){
    let y = String(units);
    if(units<10){
        return "0" + y;
    }
    else{
        return y;
    }
    
}


function time() {
    var d = new Date();
    let todayDate = document.getElementById("todayDate");
    let nowTime = document.getElementById("nowTime");

    let dayArray = new Array();
    daysArray = ["Sunday", "Monday", "Tuesday","Wednesday", "Thursdsay","Friday","Saturday","Sunday"];
    let monthArray = new Array();
    let h = tens(d.getHours());
    let m = tens(d.getMinutes());
    let s = tens(d.getSeconds());
    
    monthArray = ["January", "February", "March","April","May","June","July","August","September","October","November","December"];
    
    todayDate.innerHTML =  h+":"+m+":"+s +"hrs "+  daysArray[d.getDay()] + ", " + d.getDate()+" "+monthArray[d.getMonth()]+" , "+d.getFullYear();

}

setInterval(time,1000)

