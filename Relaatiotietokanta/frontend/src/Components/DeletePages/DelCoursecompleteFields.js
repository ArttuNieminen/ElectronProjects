import { deleteAnyRow } from "../Requests/DeleteRequests";
import getAnythingFromTables from "../Requests/GetAnythingFromTables";
import getAllFromTable from "../Requests/AllFromTable";
import { useEffect, useState } from 'react';

export default function DelCoursecomplete() {
    const checkAndSend = async () => {
        if (markId === 0 || selectedStudent === 0) {
            console.log("not all fields selected or given values")
        }
        else {
            let params = {
                targetTable: 'Coursecomplete',
                copmarisons: [`Coursecomplete.StudentID = ${selectedStudent}`, ` Coursecomplete.ID = ${markId}`]
            }
            deleteAnyRow(params);
            window.location.reload();
        }
    };

    // what makring to delete
    const [markId, setMarks] = useState(0);
    const handleMarksChange = event => {
        setMarks(event.target.value);
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
    
    //this is needed to wait for selection so it matches fetched data
    useEffect(() => {
        getCompleteData (); 
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
                    onChange={handleMarksChange}
                    value={markId}></textarea>
                <div className='post'>
                    <button onClick={() => { checkAndSend(); }}>
                        Poista</button>
                </div>
                <div>
                    <h2>Oppilaan suoritukset.</h2>
                    {CompleteRows()}
                </div>

            </div>

        </div>
    );
}