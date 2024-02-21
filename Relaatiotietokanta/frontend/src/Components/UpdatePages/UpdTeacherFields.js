import { updateAnyRow } from "../Requests/UpdateRequests";
import { useState, useEffect } from 'react';
import getAllFromTable from "../Requests/AllFromTable";

export default function UpdTeacher() {

    const checkAndSend = async () => {
        if (forenames.trim().length === 0 || surname.trim().length === 0  || rowId ===0) {
            console.log("Some fields in students are empty!!");
        }
        else {
            let params = {
                targetTable: 'Teacher',
                targetRow: rowId,
                updateColumns: ['Forenames', 'Surname'],
                updateData: [forenames,surname]
            }
            updateAnyRow(params);
            window.location.reload();
        }
    };

    const [rowId, setRowID] = useState(0);
    const handleRowIDChange = event => {
        setRowID(event.target.value);
    };

    const [forenames, setForenames] = useState('');
    const handleForenamesChange = event => {
        setForenames(event.target.value);
    };

    const [surname, setSurenames] = useState('');
    const handleSurenamesChange = event => {
        setSurenames(event.target.value);
    };
    
    const [teacherData, setTeacherData] = useState([]);
    const getTeacher = async () => {
        let getdata = await getAllFromTable("Teacher");
        setTeacherData(getdata);
    }

    const TeacherRows = () => {
        const dataToUse = teacherData;
        return (
            <div >
                {dataToUse.map(data => (
                    <div className="databox" key={data.ID}>
                        <p className="dataCard">{`Nimi: ${data.Forenames} ${data.Surname}`}</p>
                        <p className="dataCard">{`Tunnus: ${data.ID}`}</p>
                    </div>
                ))}
            </div>
        )
    };

    useEffect(() => {
        getTeacher();
    }, []);


    return (
        <div>
            <div>
                <h2>Täytä kaikki kentät! *</h2>
                <p >Opettajan tunnus mitä muokata: *</p>
                <textarea resize="none" rows="1" cols="100" id="rowid"
                    required
                    name="rowid"
                    onChange={handleRowIDChange}
                    value={rowId}></textarea>
                <p >Opettajan etunimet: *</p>
                <textarea resize="none" rows="1" cols="100" id="name"
                    required
                    name="name"
                    onChange={handleForenamesChange}
                    value={forenames}></textarea>
                <p >Opettajan sukunimi: *</p>
                <textarea resize="none" rows="1" cols="100" id="name"
                    required
                    name="name"
                    onChange={handleSurenamesChange}
                    value={surname}></textarea>
                <div className='post'>
                    <button onClick={() => { checkAndSend(); }}>
                        Tee muutokset</button>
                </div>
                <div className="wholeList">
                    <h2>Opettajat</h2>
                    {TeacherRows()}
                </div>
            </div>
        </div>
    );
}

