import { deleteAnyRow } from "../Requests/DeleteRequests";
import getAnythingFromTables from "../Requests/GetAnythingFromTables";
import getAllFromTable from "../Requests/AllFromTable";
import { useEffect, useState } from 'react';

export default function DelClassattend() {
    const checkAndSend = async () => {
        if (markId === 0 || selectedCourse === 0 || selectedStudent === 0) {
            console.log("not all fields selected or given values")
        }
        else {
            let params = {
                targetTable: 'Classattendance',
                copmarisons: [`Classattendance.StudentID = ${selectedStudent}`, ` Classattendance.ID = ${markId}`]
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


    // selected student attend dropdown selection
    const [studentAttendData, setStudentAttendData] = useState([]);
    const getStudentAttend = async () => {
        let params = {
            rowsToGet: ['Course.name ', 'Course.ID'],
            tablesToUse: ['Classattendance'],
            joins: ['Student ON Classattendance.StudentID = Student.ID',' Course ON Classattendance.CourseID = Course.ID'],
            copmarisons: [`Student.ID = ${selectedStudent}`] // set with selections made by user
        }
        let getdata = await getAnythingFromTables(params);
        setStudentAttendData(getdata);
    }
    /*SELECT DISTINCT 
    Course.name, 
    Course.ID 
FROM 
    Classattendance
JOIN 
    student ON Classattendance.StudentID = student.ID
JOIN 
    Course ON Classattendance.CourseID = Course.ID
WHERE 
    student.ID = 1;*/

    const [attendData, setAttendData] = useState([]);
    const getAttendData = async () => {
        let params = {
            rowsToGet: ['Student.Forenames', 'Student.Surname', 'Student.Schoolclass', ' Course.name AS Course', 'Classattendance.mark', 'Classattendance.Madedate', 'Classattendance.ID AS AttendID'],
            tablesToUse: ['Classattendance'],
            joins:['student ON Classattendance.StudentID = Student.ID',' Course ON Classattendance.CourseID = Course.ID'],
            copmarisons: [`Student.ID = ${selectedStudent}`, ` Classattendance.CourseID = ${selectedCourse}`]
        }
        let getdata = await getAnythingFromTables(params);
        setAttendData(getdata);
        console.log(attendData);
    }
        /*SELECT DISTINCT 
    Student.Forenames, 
    Student.Surname, 
    Student.Schoolclass,  
    Course.name AS Course, 
    Classattendance.mark, 
    Classattendance.Madedate,
    Classattendance.ID AS AttendID 
FROM 
    Classattendance
JOIN 
    student ON Classattendance.StudentID = Student.ID
JOIN 
    Course ON Classattendance.CourseID = Course.ID
WHERE 
    Student.ID = 1 AND Classattendance.CourseID = 4;
 */


    useEffect(() => {
        getStudents();
    }, []);

    const MarksRows = () => {
        const dataToUse = attendData;
        const formatDate = (isoDate) => {
            const date = new Date(isoDate);
            return date.toLocaleDateString('fi-FI'); 
          };
        return (
            <div >
                {dataToUse.map(data => (
                    <div className="databox"  key={data.AttendID}>
                        <p className="dataCard">{`Nimi: ${data.Forenames} ${data.Surname} `}</p>
                        <p className="dataCard">{`Luokka: ${data.Schoolclass} `}</p>
                        <p className="dataCard">{`Kurssi: ${data.Course} `}</p>
                        <p className="dataCard">{`Merkintä: ${data.mark} `}</p>
                        <p className="dataCard">{`Päiväys: ${formatDate(data.Madedate)} `}</p>
                        <p className="dataCard">{`Tuntimerkinnän tunnus: ${data.AttendID} `}</p>
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
        getStudentAttend(); 
    }, [selectedStudent]); 

    const [selectedCourse, setSelectedCourse] = useState(0);
    const handleCourseSelectChange = async (event) => {
        setSelectedCourse(event.target.value);
    };

    useEffect(() => {
        getAttendData(); 
    }, [selectedCourse]); 

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

                <label htmlFor="courseOptions">Oppilaan kurssit:</label>
                <select name="coursesOptions"
                    value={selectedCourse}
                    onChange={handleCourseSelectChange}>
                     <option value={0} hidden>Valitse kurssi..</option>
                    {studentAttendData.map((course) => (
                        <option key={course.ID} className='none' value={course.ID}>{course.name}</option>
                    ))}
                </select>
                <p >Kurssimerkinnän tunnus: *</p>
                <textarea resize="none" rows="1" cols="20" id="courseid" name="courseid"
                    required
                    onChange={handleMarksChange}
                    value={markId}></textarea>
                <div className='post'>
                    <button onClick={() => { checkAndSend(); }}>
                        Poista</button>
                </div>
                <div>
                    <h2>Oppilaan merkinnät valitulla kurssilla.</h2>
                    {MarksRows()}
                </div>

            </div>

        </div>
    );
}