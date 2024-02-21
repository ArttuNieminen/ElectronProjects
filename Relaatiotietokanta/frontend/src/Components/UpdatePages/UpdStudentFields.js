import { updateAnyRow } from "../Requests/UpdateRequests";
import { useState, useEffect } from 'react';
import getAllFromTable from "../Requests/AllFromTable";

export default function UpdStudent() {

    const checkAndSend = async () => {
        if (forenames.trim().length === 0 || surname.trim().length === 0  ||birthdate.trim().length === 0  ||schoolClass.trim().length === 0 || rowId ===0) {
            console.log("Some fields in students are empty!!");
        }
        else {
            let params = {
                targetTable: 'Student',
                targetRow: rowId,
                updateColumns: ['Forenames', 'Surname', 'Birthdate', 'Schoolclass'],
                updateData: [forenames,surname,birthdate,schoolClass]
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
    const [birthdate, setBirthdate] = useState('');
    const handleBirthdateChange = event => {
        setBirthdate(event.target.value);

    };

    const [schoolClass, setschoolClass] = useState('');
    const handleSchoolclassChange = event => {
        setschoolClass(event.target.value);

    };

    const [studentData, setStudentData] = useState([]);
    const getStudents = async () => {
        let getdata = await getAllFromTable("Student");
        setStudentData(getdata);
    }

    const StudentRows = () => {
        const dataToUse = studentData;
        const formatDate = (isoDate) => {
            const date = new Date(isoDate);
            return date.toLocaleDateString('fi-FI'); 
          };
        return (
            <div >
                {dataToUse.map(data => (
                    <div className="databox" key={data.ID}>
                        <p className="dataCard">{`Nimi: ${data.Forenames} ${data.Surname}`}</p>
                        <p className="dataCard">{`Syntmyäpäivä: ${formatDate(data.Birthdate)} `}</p>
                        <p className="dataCard">{`Luokka: ${data.Schoolclass}`}</p>
                        <p className="dataCard">{`Tunnus: ${data.ID}`}</p>
                    </div>
                ))}
            </div>
        )
    };

    useEffect(() => {
        getStudents();
    }, []);


    return (
        <div>
            <div>
                <h2>Täytä kaikki kentät! *</h2>
                <p >Oppilaan tunnus mitä muokata: *</p>
                <textarea resize="none" rows="1" cols="100" id="rowid"
                    required
                    name="rowid"
                    onChange={handleRowIDChange}
                    value={rowId}></textarea>
                <p >Oppilaan etunimet: *</p>
                <textarea resize="none" rows="1" cols="100" id="name"
                    required
                    name="name"
                    onChange={handleForenamesChange}
                    value={forenames}></textarea>
                <p >Oppilaan sukunimi: *</p>
                <textarea resize="none" rows="1" cols="100" id="name"
                    required
                    name="name"
                    onChange={handleSurenamesChange}
                    value={surname}></textarea>
                <p >Oppilaan syntymäaika: *</p>
                <textarea resize="none" rows="1" cols="100" id="name"
                    required
                    name="name"
                    onChange={handleBirthdateChange}
                    value={birthdate}></textarea>
                <p >Luokka *</p>
                <textarea resize="none" rows="1" cols="60" id="points" name="points"
                    required
                    onChange={handleSchoolclassChange}
                    value={schoolClass}></textarea>
                <div className='post'>
                    <button onClick={() => { checkAndSend(); }}>
                        Tee muutokset</button>
                </div>
                <div className="wholeList">
                    <h2>Oppilaat</h2>
                    {StudentRows()}
                </div>
            </div>
        </div>
    );
}

