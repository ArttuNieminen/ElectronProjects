import { updateAnyRow } from "../Requests/UpdateRequests";
import { useState } from 'react';


export default function UpdCourse() {

    const checkAndSend = async () => {
        if (coursename.trim().length === 0 || points.trim().length === 0 ) {
            console.log("Some fields in students are empty!!");
        }
        else {
            let params = {
                targetTable: 'Classattendance',
                copmarisons: [`Classattendance.StudentID = ${selectedStudent}`, ` Classattendance.ID = ${markId}`]
            }
            updateAnyRow(params);
        }
    };

    const [coursename, setNames] = useState('');
    
    const handleNamesChange = event => {
        setNames(event.target.value);

        //console.log('value is:', event.target.value);
    };
    const [points, setPoints] = useState('');
    const handlePointsChange = event => {
        setPoints(event.target.value);

    };
    
    return (
        <div>
            <div>
                <h2>Täytä kaikki kentät! *</h2>
                <p >Kurssin nimi: *</p>
                <textarea resize="none" rows="1" cols="100" id="name"
                    required
                    name="name"
                    onChange={handleNamesChange}
                    value={coursename}></textarea>
                <p >Opintopisteet *</p>
                <textarea resize="none" rows="1" cols="60" id="points" name="points"
                    required
                    onChange={handlePointsChange}
                    value={points}></textarea>
                <div className='post'>
                    <button onClick={() => { checkAndSend(); }}>
                        Lisää</button>
                </div>
            </div>
        </div>
    );
}

