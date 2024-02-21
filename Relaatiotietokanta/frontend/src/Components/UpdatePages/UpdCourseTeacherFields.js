import { updateAnyRow } from "../Requests/UpdateRequests";
import getAllFromTable from "../Requests/AllFromTable";
import getAnythingFromTables from "../Requests/GetAnythingFromTables";
import { useEffect, useState } from 'react';

export default function UpdCourseteachers() {
    const checkAndSend = async () => {
        if (teacherid.trim().length === 0 || courseid.trim().length === 0) {
            console.log("Some fields in students are empty!!");
        }
        else {
            let params = {
                targetTable: 'Courseteachers',
                targetRow: rowId,
                updateColumns: ['TeacherID', 'CourseID',],
                updateData: [teacherid, courseid]
            }
            updateAnyRow(params);
            window.location.reload();
        }
    };


    const [rowId, setRowID] = useState(0);
    const handleRowIDChange = event => {
        setRowID(event.target.value);
    };

    const [teacherid, setTeacherID] = useState(0);
    const handleTeacherIDChange = event => {
        setTeacherID(event.target.value);
    };

    const [courseid, setCourseID] = useState(0);
    const handleCourseIDChange = event => {
        setCourseID(event.target.value);
    };

    const [teachersData, setTeachersData] = useState([]);
    const getTeachers = async () => {
        let getdata = await getAllFromTable("Teacher");
        setTeachersData(getdata);
    }

    const [courseData, setCourseData] = useState([]);
    const getCourses = async () => {
        let getdata = await getAllFromTable("Course");
        setCourseData(getdata);
    }

    const [courseTeachersData, setCourseTeachersData] = useState([]);
    const getCourseTeachers = async () => {
        let params = {
            rowsToGet: ['Teacher.Forenames', 'Teacher.Surname', 'Teacher.ID AS TeacherID', 'Course.name ', 'Course.ID AS CourseID', 'Courseteachers.ID'],
            tablesToUse: ['Courseteachers'],
            joins: ['Teacher ON Courseteachers.TeacherID = Teacher.ID', ' Course ON Courseteachers.CourseID = Course.ID'],
            copmarisons: [`Course.ID = ${selectedCourse}`]
        }
        let getdata = await getAnythingFromTables(params);
        setCourseTeachersData(getdata);
    }



    const TeachersRows = () => {
        const dataToUse = teachersData;
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


    const CourseRows = () => {
        const dataToUse = courseData;
        return (
            <div >
                {dataToUse.map(data => (
                    <div className="databox" key={data.ID}>
                        <p className="dataCard">{`Nimi: ${data.name} `}</p>
                        <p className="dataCard">{`Tunnus: ${data.ID}`}</p>
                    </div>
                ))}
            </div>
        )
    };


    const CourseTeachersRows = () => {
        const dataToUse = courseTeachersData;
        return (
            <div >
                {dataToUse.map(data => (
                    <div className="databox" key={data.ID}>
                        <p className="dataCard">{`Opettaja: ${data.Forenames} ${data.Surname} `}</p>
                        <p className="dataCard">{`Kurssi: ${data.name}`}</p>
                        <p className="dataCard">{`Tämän tiedon tunnus: ${data.ID}`}</p>
                    </div>
                ))}
            </div>
        )
    };

    useEffect(() => {
        getTeachers();
        getCourses();    
    }, []);
    // näytä kaikki kurssit ja opettajat
    // näytä kaikki kurrsien opettajat

    const [selectedCourse, setSelectedCourse] = useState(0);
    const handleCourseSelectChange = async (event) => {
        setSelectedCourse(event.target.value);
    };

    useEffect(() => {
        getCourseTeachers();
    }, [selectedCourse]); 


    return (
        <div>
            <div>
                <label htmlFor="courseOptions">Kurssit:</label>
                <select name="coursesOptions"
                    value={selectedCourse}
                    onChange={handleCourseSelectChange}>
                    <option value={0} hidden>Valitse kurssi..</option>
                    {courseData.map((course) => (
                        <option key={course.ID} className='none' value={course.ID}>{course.name}</option>
                    ))}
                </select>
                <h2>Täytä kaikki kentät! *</h2>
                <p >Kurssien opettajien rivin tunnus mitä muokata: *</p>
                <textarea resize="none" rows="1" cols="100" id="rowid"
                    required
                    name="rowid"
                    onChange={handleRowIDChange}
                    value={rowId}></textarea>
                <p >Opettajan tunnus: *</p>
                <textarea resize="none" rows="1" cols="100" id="forenames"
                    required
                    name="forenames"
                    onChange={handleTeacherIDChange}
                    value={teacherid}></textarea>
                <p >Kurssin tunnus: *</p>
                <textarea resize="none" rows="1" cols="60" id="surname" name="surname"
                    required
                    onChange={handleCourseIDChange}
                    value={courseid}></textarea>
                <div className='post'>
                    <button onClick={() => { checkAndSend(); }}>
                        Tee muutokset</button>
                </div>
                <div className="listsContainers">
                    <div className="wholeList">
                        <h2>Opettajien lista</h2>
                        {TeachersRows()}
                    </div>
                    <div className="wholeList">
                        <h2>Kurssien lista</h2>
                        {CourseRows()}
                    </div>
                </div>
                <div className="wholeList">
                    <h2>Kurssien opettajien lista</h2>
                    {CourseTeachersRows()}
                </div>

            </div>

        </div>
    );
}