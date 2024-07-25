import { Link } from "react-router-dom"

function sitrep() {
  return (


    <div>
      <Link to="/"><button>Return Home</button></Link>
        
  <h1>Sitrep</h1> 
  
    
<h5>LINE 1 — DATE AND TIME<input></input>(DTG)</h5>

<h5>LINE 2 — UNIT<input></input>(Unit Making Report)
</h5>
<h5>LINE 3 — REFERENCE <input></input>(Provide Reference: Report Title, Originator, and DTG)</h5>

<h5>LINE 4 — ORIGINATOR<input></input>(Unit Identification Code of the Unit Originating the Report)
</h5>
<h5>LINE 5 — REPORTED UNIT<input></input>(Unit Identification Code of the Reported Unit)
</h5>
<h5>LINE 6 — HOME LOCATION<input></input>(UTM or Six-Digit Grid Coordinate With MGRS Grid Zone Designator for the Home Location of the Reported Unit)</h5>

<h5>LINE 7 — PRESENT LOCATION<input></input>(UTM or Six-Digit Grid Coordinate With MGRS Grid Zone Designator for the Present Location of the Reported Unit)
</h5>
<h5>LINE 8 — ACTIVITY<input></input>(Brief Description of Reported Unit’s Current Activity)</h5>

<h5>LINE 9 — EFFECTIVE<input></input>(Commander’s Evaluation of the Reported Unit’s Combat Effectiveness)
</h5>
<h5>LINE 10 — OWN SITUATION DISPOSITION/STATUS<input></input>(A Summary Updating Changes to or Not Previously Reported Major Combatant and Support Force Locations; Significant Mission Readiness Degradation on Units; Current Deployments; Proposed Deployments; Changes in Task Force Designations; Organization or Operational Control (CHOP); and Projected Requirements for Additional Forces)
</h5>
<h5>LINE 11 — LOCATION<input></input>(UTM or Six-Digit Grid Coordinate With MGRS Grid Zone Designator)</h5>

<h5>LINE 12 — SITUATION OVERVIEW<input></input>(A Brief Overall Assessment of the Situation to Include Circumstances or Conditions Which Increase or Materially Detract From the Capability and Readiness of Forces Assigned or Under Operational Control of the Command or Service)
</h5>
<h5>LINE 13 — OPERATIONS<input></input>(A Brief Description and Results of Offensive and Defensive Operations Carried Out by Major Combatant Elements During the Period of the Report; Information on Allied Forces’ Operations; Summary of Plans for Combat Operations During Next 24 Hours Including Objectives and Probable Enemy Reaction; Deviations or Variations From Previously Reported Intentions/Plans)
</h5>
<h5>LINE 14 — INTELLIGENCE/RECONNAISSANCE<input></input>(Brief Overview of the Situation, Including Operations, Order of Battle, Capabilities, and Threat Changes; Reference: Any Significant Spot Intelligence Reports (SPIREPs) or Intelligence Reports (INTREPs) Submitted in Previous 24 Hours)</h5>

<h5>LINE 15 — LOGISTICS<input></input>(Significant Deficiencies Affecting Support for Planned Operations; Problem Areas Beyond the Commander’s or Services’ Capability to Overcome or Alleviate in a Timely Manner)</h5>

<h5>LINE 16 — COMMUNICATIONS/CONNECTIVITY<input></input>(Significant Outages, Traffic Volume, Incompatibilities, and Quantitative Equipment Deficiencies; an Assessment of the Mission Impact Caused by Communications Outages and Degradations Should be Provided by the CINC’s J-6/J-3 Staff and Contained in This Section)</h5>

<h5>LINE 17 — PERSONNEL<input></input>(Factors Affecting Readiness of Forces/Units; Mobilization Status; Daily Battle Casualties (Ex: KIA, WIA, MIA) Aggregated by Service and Impact of All Casualties Sustained (Battle, Nonbattle, Critical Skills, Key Personnel Upon the Commands’ Mission Capability))
</h5>
      
    </div>
    



  )
}

export default sitrep