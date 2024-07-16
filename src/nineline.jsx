import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';


/*Researching useAuth and needing to capture token from the clerk sessions
so I can send the needed data to the backend to make sure each 
user can be linked to their data sent from the form from the frontend to the
backend. https://clerk.com/docs/backend-requests/handling/manual-jwt
https://clerk.com/docs/backend-requests/resources/session-tokens
Note need to verify that the code below works correctly and need to build
the backend with the correct tables to hold the data when submitted. 
*/
const MedEvacForm = () => {
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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
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
            
            <h3>Line 3: Number of patients by precedence</h3>
            <p>A- Urgent (surgical)- i.e. requires the in-flight surgeon to perform surgery while en route to the hospital. B- Urgent (non-surgical)- the i.e. patient has an arterial bleed that can be stabilized until arriving at the hospital. C- Priority- i.e. injuries that are not immediately life-threatening but could become fatal eventually. D- Routine- i.e. patient requires regular medical care, but the unit cannot transport them by their means. E- Convenience- i.e. nonlife-threatening care provided to personnel in a combat zone.</p>
            <input 
                type="text" 
                name="patientsByPrecedence"
                value={formData.patientsByPrecedence}
                onChange={handleChange}
            />
            
            <h3>Line 4: Special Equipment required</h3>
            <p>A- None B- Hoist C- Extraction Equipment- i.e. jungle penetrator D- Ventilation</p>
            <input 
                type="text" 
                name="specialEquipment"
                value={formData.specialEquipment}
                onChange={handleChange}
            />
            
            <h3>Line 5: Number of Patients by type</h3>
            <p>A- Litter- cannot walk on their own B- Ambulatory- able to self-move to MEDEVAC platform</p>
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
    );
};

export default MedEvacForm;
