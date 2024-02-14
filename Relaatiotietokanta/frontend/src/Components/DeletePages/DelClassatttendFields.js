import { addNewClassAttend } from "../Requests/AddRequests";
import getAllFromTable from "../Requests/AllFromTable";
import { useEffect, useState } from 'react';

export default function DelClassattend() {
    const checkAndSend = async () => {
        if (studentid.trim().length === 0 || courseid.trim().length === 0 || madedate.trim().length === 0 ||
            mark.trim().length === 0) {
            console.log("Some fields in students are empty!!");
        }
        else {
            addNewClassAttend(studentid, courseid, madedate, mark);
        }
    };

    const [studentid, setTeacherID] = useState(0);

    const handleStudentIDChange = event => {
        setTeacherID(event.target.value);
    };

    const [courseid, setCourseID] = useState(0);
    const handleCourseIDChange = event => {
        setCourseID(event.target.value);
    };

    const [madedate, setMadeDate] = useState('');
    const handleMadeDateChange = event => {
        setMadeDate(event.target.value);
    };

    const [mark, setMarks] = useState('');
    const handleMarksChange = event => {
        setMarks(event.target.value);
    };

    const [studentData, setStudentData] = useState([]);
    const getStudents = async () => {
        let getdata = await getAllFromTable("Student");
        setStudentData(getdata);
    }

    const [marksData, setMarksData] = useState([]);
    const getMarksData = async () => {
        let getdata = await getAllFromTable("classaddentance"); // needs to be better call to show names in table
        setMarksData(getdata);
    }


    useEffect(() => {
        getMarksData(); 
        getStudents();
    }, []);

    const MarksRows = () => {
        const dataToUse = marksData;
        return (
            <div >
                {dataToUse.map(data => (
                    <div className="databox" >
                        <p className="dataName">{`Nimet: ${data.Forenames} ${data.Surname}`}</p>
                        <p className="dataDate">{`Päiväys: ${data.Madedate} Merkintä: ${data.Mark}`} </p>
                        <p className="dataID">{`Tunnus: ${data.ID}`}</p>
                    </div>
                ))}
            </div>
        )
    };

    const [selectedStudent, setSelectedStudent] = useState("");

    //need to have both student and courses selected to delete
    return (
        <div>
            <div>
                <h2>Täytä kaikki kentät! *</h2>
                <label htmlFor="studentsOptions">Valitse oppilas!</label>

                <select name="studentsOptions"
                    value={selectedStudent}
                    onChange={(event) => setSelectedStudent(event.target.value)}>

                    {studentData.map((student) => (
                        <option key={student.ID} className='none' value={student.ID}>{student.Forenames} {student.Surname}</option>
                    ))}
                </select>
                <p >Kurssimerkinnän tunnus: *</p>
                <textarea resize="none" rows="1" cols="10" id="courseid" name="courseid"
                    required
                    onChange={handleCourseIDChange}
                    value={courseid}></textarea>
                <div className='post'>
                    <button onClick={() => { checkAndSend(); }}>
                        Poista</button>
                </div>
                <div>
                    <h2>Oppilaan merkinnät.</h2>
                    {MarksRows()}
                </div>

            </div>

        </div>
    );
}