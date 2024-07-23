function geoFindMe() {
    const status = document.querySelector("#status");
    const mapLink = document.querySelector("#map-link");
    const mgrs = document.querySelector("#mgrs");

    mapLink.href = "";
    mapLink.textContent = "";
  
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      status.textContent = "";
      mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    
       // Convert to MGRS and display
      const mgrsString = MGRSString(latitude, longitude)  
      mgrs.textContent = `MGRS: ${mgrsString}`;  
      
    }
  
    function error() {
      status.textContent = "Unable to retrieve your location";
    }
  
    if (!navigator.geolocation) {
      status.textContent = "Geolocation is not supported by your browser";
    } else {
      status.textContent = "Locating…";
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }
  
  document.querySelector("#find-me").addEventListener("click", geoFindMe);
  
  
function MGRSString (Lat, Long)
{ 
if (Lat < -80) return 'Too far South' ; if (Lat > 84) return 'Too far North' ;
var c = 1 + Math.floor ((Long+180)/6);
var e = c*6 - 183 ;
var k = Lat*Math.PI/180;
var l = Long*Math.PI/180;
var m = e*Math.PI/180;
var n = Math.cos (k);
var o = 0.006739496819936062*Math.pow (n,2);
var p = 40680631590769/(6356752.314*Math.sqrt(1 + o));
var q = Math.tan (k);
var r = q*q;
var s = (r*r*r) - Math.pow (q,6);
var t = l - m;
var u = 1.0 - r + o;
var v = 5.0 - r + 9*o + 4.0*(o*o);
var w = 5.0 - 18.0*r + (r*r) + 14.0*o - 58.0*r*o;
var x = 61.0 - 58.0*r + (r*r) + 270.0*o - 330.0*r*o;
var y = 61.0 - 479.0*r + 179.0*(r*r) - (r*r*r);
var z = 1385.0 - 3111.0*r + 543.0*(r*r) - (r*r*r);
var aa = p*n*t + (p/6.0*Math.pow (n,3)*u*Math.pow (t,3)) + (p/120.0*Math.pow (n,5)*w*Math.pow (t,5)) + (p/5040.0*Math.pow (n,7)*y*Math.pow (t,7));
var ab = 6367449.14570093*(k - (0.00251882794504*Math.sin (2*k)) + (0.00000264354112*Math.sin (4*k)) - (0.00000000345262*Math.sin (6*k)) + (0.000000000004892*Math.sin (8*k))) + (q/2.0*p*Math.pow (n,2)*Math.pow (t,2)) + (q/24.0*p*Math.pow (n,4)*v*Math.pow (t,4)) + (q/720.0*p*Math.pow (n,6)*x*Math.pow (t,6)) + (q/40320.0*p*Math.pow (n,8)*z*Math.pow (t,8));
aa = aa*0.9996 + 500000.0;
ab = ab*0.9996; if (ab < 0.0) ab += 10000000.0;
var ad = 'CDEFGHJKLMNPQRSTUVWXX'.charAt (Math.floor (Lat/8 + 10));
var ae = Math.floor (aa/100000);
var af = ['ABCDEFGH','JKLMNPQR','STUVWXYZ'][(c-1)%3].charAt (ae-1);
var ag = Math.floor (ab/100000)%20;
var ah = ['ABCDEFGHJKLMNPQRSTUV','FGHJKLMNPQRSTUVABCDE'][(c-1)%2].charAt (ag);
function pad (val) {if (val < 10) {val = '0000' + val} else if (val < 100) {val = '000' + val} else if (val < 1000) {val = '00' + val} else if (val < 10000) {val = '0' + val};return val};
aa = Math.floor (aa%100000); aa = pad (aa);
ab = Math.floor (ab%100000); ab = pad (ab);
return c + ad + ' ' + af + ah + ' ' + aa + ' ' + ab;
}

/* 51532 22726 this is the coordinates 
it gives.. But actual postion is 51335 22792 according to 
MGRS Mapper. 

Using this to try and figure out how to add in to the REACT app


*/