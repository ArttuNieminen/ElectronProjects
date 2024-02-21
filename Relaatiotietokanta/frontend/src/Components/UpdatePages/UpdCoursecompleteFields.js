import { updateAnyRow } from "../Requests/UpdateRequests";
import getAnythingFromTables from "../Requests/GetAnythingFromTables";
import getAllFromTable from "../Requests/AllFromTable";
import { useEffect, useState } from 'react';

export default function UpdCoursecomplete() {
    const checkAndSend = async () => {
        if (rowId === 0 || selectedStudent === 0 ||completedate.trim().length === 0||points=== 0||grade=== 0) {
            console.log("not all fields selected or given values")
        }
        else {
            let params = {
                targetTable: 'Coursecomplete',
                targetRow: rowId,
                updateColumns: ['Completedate', 'Points', 'Grade'],
                updateData: [completedate, points,grade]
            }
            updateAnyRow(params);
            window.location.reload();
        }
    };

    // what makring to delete
    const [rowId, setRowID] = useState(0);
    const handleRowIDChange = event => {
        setRowID(event.target.value);
    };

    const [completedate, setCompleteDate] = useState('');
    const handleCompleteDateChange = event => {
        setCompleteDate(event.target.value);
    };

    const [points, setPoints] = useState('');
    const handlePointsChange = event => {
        setPoints(event.target.value);
    };

    const [grade, setGrade] = useState('');
    const handleGradeChange = event => {
        setGrade(event.target.value);
    };




    //data gets....

    //student dropdown seletion
    const [studentData, setStudentData] = useState([]);
    const getStudents = async () => {
        let getdata = await getAllFromTable("Student");
        setStudentData(getdata);
    }

    const [completeData, setCompleteData] = useState([]);
    const getCompleteData = async () => {
        let params = {
            rowsToGet: ['Course.name AS Course', 'Coursecomplete.Points','Coursecomplete.Grade',
            'Coursecomplete.Completedate', 'Coursecomplete.ID AS CompleteID' ],
            tablesToUse: ['Coursecomplete'],
            joins:['student ON Coursecomplete.StudentID = Student.ID','Course ON Coursecomplete.CourseID = Course.ID'],
            copmarisons: [`Student.ID = ${selectedStudent}`]
        }
        let getdata = await getAnythingFromTables(params);
        setCompleteData(getdata);
        console.log(completeData);
    }
        /*SELECT DISTINCT 
    Student.Forenames, 
    Student.Surname, 
    Student.Schoolclass,  
    Course.name AS Course, 
	Coursecomplete.Points,
	Coursecomplete.Grade,
    Coursecomplete.Completedate,
    Coursecomplete.ID AS CompleteID 
FROM 
    Coursecomplete
JOIN 
    student ON Coursecomplete.StudentID = Student.ID
JOIN 
    Course ON Coursecomplete.CourseID = Course.ID
WHERE 
    Student.ID = 1  //test numbers
;
 */


    useEffect(() => {
        getStudents();
    }, []);

    const CompleteRows = () => {
        const dataToUse = completeData;

        const formatDate = (isoDate) => {
            const date = new Date(isoDate);
            return date.toLocaleDateString('fi-FI'); 
          };
        return (
            <div >
                {dataToUse.map(data => (
                    <div className="databox" key={data.CompleteID}>
                        <p className="dataCard">{`Kurssi: ${data.Course} `}</p>
                        <p className="dataCard">{`Pisteet: ${data.Points} `}</p>
                        <p className="dataCard">{`Arvosana: ${data.Grade} `}</p>
                        <p className="dataCard">{`Päiväys: ${formatDate(data.Completedate)} `}</p>
                        <p className="dataCard">{`Kurssisuorituksen tunnus: ${data.CompleteID} `}</p>
                    </div>
                ))}
            </div>
        )
    };


    const [selectedStudent, setSelectedStudent] = useState(0);
    const handleStudentSelectChange = (event) => {
        setSelectedStudent(event.target.value);
    };


    useEffect(() => {
        getCompleteData();
    }, [selectedStudent]);

    return (
        <div>
            <div>
                <h2>Täytä kaikki kentät! *</h2>
                <label htmlFor="studentsOptions">Oppilaat:</label>
                <select
                    name="studentsOptions"
                    value={selectedStudent}
                    onChange={handleStudentSelectChange}
                >
                    <option value={0} hidden>Valitse oppilas..</option>
                    {studentData.map((student) => (
                        <option key={student.ID} value={student.ID}>
                            {student.Forenames} {student.Surname}
                        </option>
                    ))}
                </select>
                <p >Kurssisuorituksen tunnus: *</p>
                <textarea resize="none" rows="1" cols="20" id="courseid" name="courseid"
                    required
                    onChange={handleRowIDChange}
                    value={rowId}></textarea>
                <p >Uusi päiväys VVVV-KK-PP *</p>
                <textarea resize="none" rows="1" cols="60" id="madedate" name="madedate"
                    required
                    onChange={handleCompleteDateChange}
                    value={completedate}></textarea>
                <p >Uusi opintopistemäärä *</p>
                <textarea resize="none" rows="1" cols="60" id="mark" name="mark"
                    required
                    onChange={handlePointsChange}
                    value={points}></textarea>
                <p >Uusi arvosana *</p>
                <textarea resize="none" rows="1" cols="60" id="mark" name="mark"
                    required
                    onChange={handleGradeChange}
                    value={grade}></textarea>
                <div className='post'>
                    <button onClick={() => { checkAndSend(); }}>
                        Tee muutokset</button>
                </div>
                <div>
                    <h2>Oppilaan kurssisuoritukset.</h2>
                    {CompleteRows()}
                </div>

            </div>

        </div>
    );
}