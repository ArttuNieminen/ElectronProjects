import { addNewCourseteachers } from "../Requests/AddRequests";
import getAllFromTable from "../Requests/AllFromTable";
import { useEffect, useState } from 'react';

export default function Courseteachers() {
    const checkAndSend = async () => {
        if (teacherid.trim().length === 0 || courseid.trim().length === 0) {
            console.log("Some fields in students are empty!!");
        }
        else {
            addNewCourseteachers(teacherid, courseid);
        }
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

    useEffect(() => {
        getTeachers();
        getCourses();
    }, []);

    const TeachersRows = () => {
        const dataToUse = teachersData;
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
                <p >Opettajan tunnus: *</p>
                <textarea resize="none" rows="1" cols="100" id="forenames"
                    required
                    name="forenames"
                    onChange={handleTeacherIDChange}
                    value={teacherid}></textarea>
                <p >Kurssin tunnus *</p>
                <textarea resize="none" rows="1" cols="60" id="surname" name="surname"
                    required
                    onChange={handleCourseIDChange}
                    value={courseid}></textarea>
                <div className='post'>
                    <button onClick={() => { checkAndSend(); }}>
                        Lisää</button>
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

            </div>

        </div>
    );
}