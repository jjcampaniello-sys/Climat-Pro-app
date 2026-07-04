let mode = "indoor";
let chart;
let history = [];

function setMode(m){
mode = m;
}

function getData(){
if(mode === "indoor"){
return {
temp: 20 + Math.random()*5,
hum: 40 + Math.random()*25
};
}else{
return {
temp: 15 + Math.random()*12,
hum: 30 + Math.random()*50
};
}
}

function getComfort(t,h){
if(t > 26) return "🔥 Chaud";
if(h > 70) return "🌫️ Humide";
return "😌 Confort";
}

function initChart(){
chart = new Chart(document.getElementById("chart"), {
type: "line",
data: {
labels: [],
datasets: [{
label: "Température",
data: []
}]
}
});
}

function update(){
let d = getData();

document.getElementById("temp").innerText = d.temp.toFixed(1);
document.getElementById("hum").innerText = d.hum.toFixed(1);
document.getElementById("comfort").innerText = getComfort(d.temp, d.hum);

let time = new Date().toLocaleTimeString();

chart.data.labels.push(time);
chart.data.datasets[0].data.push(d.temp);
chart.update();

let li = document.createElement("li");
li.innerText = `${time} → ${d.temp.toFixed(1)}°C / ${d.hum.toFixed(1)}%`;
document.getElementById("history").prepend(li);

history.push(d);

if(d.temp > 26 && Notification.permission === "granted"){
new Notification("🔥 Trop chaud !");
}
}

if(Notification.permission !== "granted"){
Notification.requestPermission();
}

initChart();
setInterval(update, 3000);
