window.addEventListener('load',()=>{
  let lon;
  let lat;
  let location=document.querySelector('.location-timezone');
  let temperatureDegree=document.querySelector('.degree');
  let temperatureDescription=document.querySelector('.temperature-description');
  let feCel=document.querySelector('.feCel');
  let temperatureSection=document.querySelector('.temperature');
  let currentTime=document.querySelector('.time');


  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position =>{
      lon = position.coords.longitude;
      lat = position.coords.latitude;
      const proxy = 'https://cors-anywhere.herokuapp.com/'
      const api = `${proxy}https://api.darksky.net/forecast/48c2865c34b8c0b6e0db21bc08751804/${lat},${lon}`;
      fetch (api)
        .then (response =>{ return response.json();
        })
          .then(data => { 
            console.log(data);
            const{temperature, summary, icon, time}= data.currently;
            //Set Dom elements
            temperatureDegree.textContent = Math.floor(temperature);
            temperatureDescription.textContent = summary;
            location.textContent = data.timezone;
            //ConvertFormula
            let celcius=Math.floor((temperature-32)*(5/9));
            //Set Icon
            setIcon(icon, document.querySelector(".icon"));
            //Click to change temperature Unit
            temperatureSection.addEventListener("click", ()=>{
              if (feCel.textContent==="F"){
                feCel.textContent="C";
                temperatureDegree.textContent=celcius;
              } else{
                feCel.textContent="F";
                temperatureDegree.textContent=Math.floor(temperature);
              }
            });
        });
    });
  }
  function time() {
    let d = new Date();
    let s = ("0" + d.getSeconds()).slice(-2);
    let m = ("0" + d.getMinutes()).slice(-2);
    let h = ("0" + d.getHours()).slice(-2);
    currentTime.textContent = h + ":" + m + ":" + s;  
  }
  setInterval(time, 1000);
  function setIcon(icon, iconClass){
    const skycons = new Skycons({color: "black"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconClass, Skycons[currentIcon]);
  }
});
