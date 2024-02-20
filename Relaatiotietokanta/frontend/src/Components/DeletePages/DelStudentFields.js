import { deleteAnyRow } from "../Requests/DeleteRequests";
import getAllFromTable from "../Requests/AllFromTable";
import { useEffect, useState } from 'react';

export default function DelStudent() {
    const checkAndSend = async () => {
        if (studentid === 0 ) {
            console.log("not all fields selected or given values")
        }
        else {
            let params = {
                targetTable: 'Student',
                copmarisons: [`Student.ID = ${studentid}`]
            }
            deleteAnyRow(params);
            window.location.reload();
        }
    };

    const [studentid, setStudentID] = useState(0);
    const handleStudentIDChange = event => {
        setStudentID(event.target.value);
    };

    const [studentData, setStudentData] = useState([]);
    const getStudents = async () => {
        let getdata = await getAllFromTable("Student");
        setStudentData(getdata);
    }

    useEffect(() => {
        getStudents();
    }, []);

    const StudentRows = () => {
        const dataToUse = studentData;
        return (
            <div >
                {dataToUse.map(data => (
                    <div className="databox"   key={data.ID}>
                        <p className="dataCard">{`Nimi: ${data.Forenames} ${data.Surname} `}</p>
                        <p className="dataCard">{`Tunnus: ${data.ID}`}</p>
                    </div>
                ))}
            </div>
        )
    };

    return (
        <div>
            <div>
                <h2>Täytä kaikki kentät! *</h2>
                <p >Oppilaan tunnus: *</p>
                <textarea resize="none" rows="1" cols="20" id="Studentid" name="Studentid"
                    required
                    onChange={handleStudentIDChange}
                    value={studentid}></textarea>
                <div className='post'>
                    <button onClick={() => { checkAndSend(); }}>
                        Poista</button>
                </div>
                <div>
                    <h2>Oppilaat.</h2>
                    {StudentRows()}
                </div>

            </div>

        </div>
    );
}