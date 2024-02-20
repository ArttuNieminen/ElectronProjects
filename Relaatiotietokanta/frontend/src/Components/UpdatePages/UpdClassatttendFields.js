import { updateAnyRow } from "../Requests/UpdateRequests";
import getAllFromTable from "../Requests/AllFromTable";
import { useEffect, useState } from 'react';

export default function UpdClassattend() {
    const checkAndSend = async () => {
        if (studentid.trim().length === 0 || courseid.trim().length === 0 || madedate.trim().length === 0 ||
        mark.trim().length === 0 ) {
            console.log("Some fields in students are empty!!");
        }
        else {
            let params = {
                targetTable: 'Classattendance',
                targetRow: 1,
                updateColumns: ['StudentID','CourseID','Madedate','Mark'],
                updateData : [studentid,courseid,madedate,mark]
            }
            updateAnyRow(params);
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

    const [courseData, setCourseData] = useState([]);
    const getCourses = async () => {
        let getdata = await getAllFromTable("Course");
        setCourseData(getdata);
    }

    const [classAttends, setClassAttendsData] = useState([]);
    const getClassAttends = async () => {
        let getdata = await getAllFromTable("Classattendance");
        setClassAttendsData(getdata);
    }
    useEffect(() => {
        getStudents();
        getCourses();
        getClassAttends();
    }, []);


  const ClassattendanceRows = () => {
        const dataToUse = classAttends;
        return (
            <div >
                {dataToUse.map(data => (
                    <div className="databox" key={data.ID}>
                        <p className="dataName">{`Nimi: ${data.name} `}</p>
                        <p className="dataID">{`Tunnus: ${data.ID}`}</p>
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
                <textarea resize="none" rows="1" cols="100" id="studentid"
                    required
                    name="studentid"
                    onChange={handleStudentIDChange}
                    value={studentid}></textarea>
                <p >Kurssin tunnus *</p>
                <textarea resize="none" rows="1" cols="60" id="courseid" name="courseid"
                    required
                    onChange={handleCourseIDChange}
                    value={courseid}></textarea>
                    <p >Päiväys VVVV-KK-PP *</p>
                <textarea resize="none" rows="1" cols="60" id="madedate" name="madedate"
                    required
                    onChange={handleMadeDateChange}
                    value={madedate}></textarea>
                    <p >Merkintä *</p>
                <textarea resize="none" rows="1" cols="60" id="mark" name="mark"
                    required
                    onChange={handleMarksChange}
                    value={mark}></textarea>
                <div className='post'>
                    <button onClick={() => { checkAndSend(); }}>
                        Lisää</button>
                </div>
                <div className="listsContainers">
                    <div className="wholeList">
                        <h2>Oppilaiden lista</h2>
                        {StudentRows()}
                    </div>
                    <div className="wholeList">
                        <h2>Kurssien lista</h2>
                        {CourseRows()}
                    </div>
                </div>

            </div>

        </div>
    );
}