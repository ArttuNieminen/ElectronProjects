import { addNewCoursecomplete } from "../Requests/AddRequests";
import getAllFromTable from "../Requests/AllFromTable";
import { useEffect, useState } from 'react';

export default function DelCoursecomplete() {
    const checkAndSend = async () => {
        if (studentid.trim().length === 0 || courseid.trim().length === 0 || completedate.trim().length === 0 ||
        grade.trim().length === 0 || points.trim().length === 0 ) {
            console.log("Some fields in students are empty!!");
        }
        else {
            addNewCoursecomplete(studentid, courseid,completedate,points,grade);
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

    useEffect(() => {
        getStudents();
        getCourses();
    }, []);

    const StudentRows = () => {
        const dataToUse = studentData;
        return (
            <div >
                {dataToUse.map(data => (
                    <div className="databox" >
                        <p className="dataName">{`Nimet: ${data.Forenames} ${data.Surname}`}</p>
                        <p className="dataID">{`Tunnus: ${data.ID}`}</p>
                    </div>
                ))}
            </div>
        )
    };

    
    const CourseRows = () => {
        const dataToUse = courseData;
        return (
            <div >
                {dataToUse.map(data => (
                    <div className="databox" >
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
                    <p >Suorituspäivä VVVV-KK-PP *</p>
                <textarea resize="none" rows="1" cols="60" id="comdate" name="comdate"
                    required
                    onChange={handleCompleteDateChange}
                    value={completedate}></textarea>
                    <p >Opintopisteet *</p>
                <textarea resize="none" rows="1" cols="60" id="points" name="points"
                    required
                    onChange={handlePointsChange}
                    value={points}></textarea>
                    <p >Arvosana *</p>
                <textarea resize="none" rows="1" cols="60" id="grade" name="grade"
                    required
                    onChange={handleGradeChange}
                    value={grade}></textarea>
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