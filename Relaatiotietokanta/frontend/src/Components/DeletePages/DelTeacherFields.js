import { deleteAnyRow } from "../Requests/DeleteRequests";
import getAllFromTable from "../Requests/AllFromTable";
import { useEffect, useState } from 'react';

export default function DelTeacher() {
    const checkAndSend = async () => {
        if (teacherid === 0 ) {
            console.log("not all fields selected or given values")
        }
        else {
            let params = {
                targetTable: 'Teacher',
                copmarisons: [`Teacher.ID = ${teacherid}`]
            }
            deleteAnyRow(params);
            window.location.reload();
        }
    };

    const [teacherid, setTeacherID] = useState(0);
    const handleTeacherIDChange = event => {
        setTeacherID(event.target.value);
    };

    const [teacherData, setTeacherData] = useState([]);
    const getTeachers = async () => {
        let getdata = await getAllFromTable("Teacher");
        setTeacherData(getdata);
    }

    useEffect(() => {
        getTeachers();
    }, []);

    const TeacherRows = () => {
        const dataToUse = teacherData;
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
                <p >Opettajan tunnus: *</p>
                <textarea resize="none" rows="1" cols="20" id="Teacherid" name="Teacherid"
                    required
                    onChange={handleTeacherIDChange}
                    value={teacherid}></textarea>
                <div classame='post'>
                    <button onClick={() => { checkAndSend(); }}>
                        Poista</button>
                </div>
                <div>
                    <h2>Opettajat.</h2>
                    {TeacherRows()}
                </div>

            </div>

        </div>
    );
}