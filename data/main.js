setInterval(async ()=>{
    let raw = await(await fetch("/raw")).json();
    document.getElementById("pitch").innerText = raw.pitch;
    document.getElementById("yaw").innerText = raw.yaw;
    document.getElementById("roll").innerText = raw.roll;
}, 20);