import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import { Link } from "react-router-dom"

/* eslint-disable no-extra-semi */

function MedEvacForm() {
  const [status, setStatus] = useState("Locating...");
  const [mapLink, setMapLink] = useState("");
  const [mgrs, setMgrs] = useState("");
  const [formData, setFormData] = useState({
    location: '',
    frequency: '',
    patientsByPrecedence: '',
    specialEquipment: '',
    patientsByType: '',
    pickupAreaSecurity: '',
    markingMethod: '',
    patientNationality: '',
    nbcContamination: ''
  });
  const { getToken } = useAuth();
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Update the location in formData whenever mgrs changes
    setFormData(prevFormData => ({
      ...prevFormData,
      location: mgrs
    }));
  }, [mgrs]);

  const geoFindMe = useCallback(() => {
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      setStatus("");
      setMapLink(`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`);
      const mgrsString = MGRSString(latitude, longitude);
      setMgrs(mgrsString);
    }
    function error() {
      setStatus("Unable to retrieve your location");
    }

    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, []);

  useEffect(() => {
    geoFindMe();
  }, [geoFindMe]);

  function MGRSString(Lat, Long) {
    if (Lat < -80) return 'Too far South';
    if (Lat > 84) return 'Too far North';
    const c = 1 + Math.floor((Long + 180) / 6);
    const e = c * 6 - 183;
    const k = Lat * Math.PI / 180;
    const l = Long * Math.PI / 180;
    const m = e * Math.PI / 180;
    const n = Math.cos(k);
    const o = 0.006739496819936062 * Math.pow(n, 2);
    const p = 40680631590769 / (6356752.314 * Math.sqrt(1 + o));
    const q = Math.tan(k);
    const r = q * q;
    // eslint-disable-next-line no-unused-vars
    const s = (r * r * r) - Math.pow(q, 6);
    const t = l - m;
    const u = 1.0 - r + o;
    const v = 5.0 - r + 9 * o + 4.0 * (o * o);
    const w = 5.0 - 18.0 * r + (r * r) + 14.0 * o - 58.0 * r * o;
    const x = 61.0 - 58.0 * r + (r * r) + 270.0 * o - 330.0 * r * o;
    const y = 61.0 - 479.0 * r + 179.0 * (r * r) - (r * r * r);
    const z = 1385.0 - 3111.0 * r + 543.0 * (r * r) - (r * r * r);
    let aa = p * n * t + (p / 6.0 * Math.pow(n, 3) * u * Math.pow(t, 3)) + (p / 120.0 * Math.pow(n, 5) * w * Math.pow(t, 5)) + (p / 5040.0 * Math.pow(n, 7) * y * Math.pow(t, 7));
    let ab = 6367449.14570093 * (k - (0.00251882794504 * Math.sin(2 * k)) + (0.00000264354112 * Math.sin(4 * k)) - (0.00000000345262 * Math.sin(6 * k)) + (0.000000000004892 * Math.sin(8 * k))) + (q / 2.0 * p * Math.pow(n, 2) * Math.pow(t, 2)) + (q / 24.0 * p * Math.pow(n, 4) * v * Math.pow(t, 4)) + (q / 720.0 * p * Math.pow(n, 6) * x * Math.pow(t, 6)) + (q / 40320.0 * p * Math.pow(n, 8) * z * Math.pow(t, 8));
    aa = aa * 0.9996 + 500000.0;
    ab = ab * 0.9996;
    if (ab < 0.0) ab += 10000000.0;
    const ad = 'CDEFGHJKLMNPQRSTUVWXX'.charAt(Math.floor(Lat / 8 + 10));
    const ae = Math.floor(aa / 100000);
    const af = ['ABCDEFGH', 'JKLMNPQR', 'STUVWXYZ'][(c - 1) % 3].charAt(ae - 1);
    const ag = Math.floor(ab / 100000) % 20;
    const ah = ['ABCDEFGHJKLMNPQRSTUV', 'FGHJKLMNPQRSTUVABCDE'][(c - 1) % 2].charAt(ag);
    function pad(val) {
      if (val < 10) { val = '0000' + val }
      else if (val < 100) { val = '000' + val }
      else if (val < 1000) { val = '00' + val }
      else if (val < 10000) { val = '0' + val };
      return val;
    }
    aa = Math.floor(aa % 100000); aa = pad(aa);
    ab = Math.floor(ab % 100000); ab = pad(ab);
    return c + ad + ' ' + af + ah + ' ' + aa + ' ' + ab;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken();
      const response = await axios.post(
        'http://localhost:3000/save-med-evac-data',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        setMessage('Data saved successfully');
      } else {
        setMessage('Failed to save data');
      }
    } catch (error) {
      console.error('Failed to save data', error);
      setMessage('Failed to save data');
    }
  };

  return (
    <div>
        <Link to="/"><button>Return Home</button></Link>
        <Link to="/location"><button>Map</button> </Link>
    <div>
    
     { <p id="status">{status}</p>}
      
    </div>
      

      <form onSubmit={handleSubmit}>
        <h3>Line 1: Location and Pickup Site</h3>
        <p>This is given in an MGRS 6 to 8 digit grid</p>
        <input 
          type="text" 
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
        
        <h3>Line 2: Frequency and call sign at the pickup site</h3>
        <p>This is the frequency and callsign that you will be talking to the incoming MEDEVAC aircraft on. In most cases, this is a predetermined, non-encrypted channel that is set-aside for MEDEVAC. If possible write this on all 9Line cards before the mission.</p>
        <input 
          type="text" 
          name="frequency"
          value={formData.frequency}
          onChange={handleChange}
        />
        
        <h3>Line 3: Number of Patients by Precedence</h3>
        <input 
          type="text" 
          name="patientsByPrecedence"
          value={formData.patientsByPrecedence}
          onChange={handleChange}
        />
        
             
        <h3>Line 4: Special Equipment Required</h3>
        <input 
          type="text" 
          name="specialEquipment"
          value={formData.specialEquipment}
          onChange={handleChange}
        />
        
        <h3>Line 5: Number of Patients by Type</h3>
        <input 
          type="text" 
          name="patientsByType"
          value={formData.patientsByType}
          onChange={handleChange}
        />
        
     
      
      <h3>Line 6: Security of Pickup area</h3>
      <p>N- No enemy troops in area P- Possible enemy troops in area (approach with caution) E- Enemy troops in area (approach with caution) X-Enemy troops in area (armed escort required)</p>
      <input 
        type="text" 
        name="pickupAreaSecurity"
        value={formData.pickupAreaSecurity}
        onChange={handleChange}
      />
      
      <h3>Line 7: Method of Marking at the pickup site</h3>
      <p>(important: always ensure marking equipment is available to the marking personnel. If you are going to throw purple smoke, ensure you have purple smoke on hand) A- Panels- i.e. VF-17 panel B- Pyrotechnical equipment- i.e. pen flare, red star cluster C- Smoke Signal- (provide smoke color) D- None E- Other- i.e. IR flash or beacon.</p>
      <input 
        type="text" 
        name="markingMethod"
        value={formData.markingMethod}
        onChange={handleChange}
      />
      
      <h3>Line 8: Patient Nationality and Status</h3>
      <p>A- US Military B- US Civilian C- Non-US Military D- Non-US Citizen E- EPW</p>
      <input 
        type="text" 
        name="patientNationality"
        value={formData.patientNationality}
        onChange={handleChange}
      />
      
      <h3>Line 9: NBC Contamination</h3>
      <p>A- Nuclear B- Biological C- Chemical *During peacetime provide terrain of pickup site</p>
      <input 
        type="text" 
        name="nbcContamination"
        value={formData.nbcContamination}
        onChange={handleChange}
      />
      
      <button type="submit">Submit</button>
      {message && <p>{message}</p>}
   
    </form>
    </div>
  );
};

export default MedEvacForm;
