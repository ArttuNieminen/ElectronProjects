import { useEffect, useState } from 'react';
import getSearchColumns from '../Requests/SearchRequest';

export default function SearchStudent() {
    const checkAndSend = async () => {
        makeSearchCall(); // currently no conditions 
    };

    const makeSearchCall =async () => {
        // construct the call
        let TargetColumns = [];
        let TargetTables = [];
        let Joins = [];
        let Conditions = [];
    
        switch (courseAttendOption) {
            case '':
                TargetColumns = ['*'];
                TargetTables = ['Student'];
                if (studenName !== '') {
                    Conditions.push(`Student.Forenames LIKE '%${studenName}%'`);
                }
                break;
            case 'Course':
                TargetColumns = ['Coursecomplete.*', 'Student.Forenames', 'Student.Surname', 'Course.name AS CourseName'];
                TargetTables = ['Coursecomplete'];
                Joins = [
                    'RIGHT JOIN Student ON Coursecomplete.StudentID = Student.ID',
                    'RIGHT JOIN Course ON Coursecomplete.CourseID = Course.ID'
                ];
                
                if (courseOption === 'Complete') {
                    Joins = [
                        'RIGHT JOIN Student ON Coursecomplete.StudentID = Student.ID',
                        'RIGHT JOIN Course ON Coursecomplete.CourseID = Course.ID'
                    ];
                    if (studenName !== '') {
                        Conditions.push(`Student.Forenames LIKE '%${studenName}%'`);
                    }
                    
                    if(courseName !== ''){
                        Conditions.push(`Course.name LIKE '%${courseName}%'`);
                    }

                    if (courseCompleteTime !== '') {
                       
                        const [startDate, endDate] = courseCompleteTime.split('/');
                        Conditions.push(`Coursecomplete.Completedate BETWEEN '${startDate}' AND '${endDate}'`);
                    }
                } else if (courseOption === 'Uncomplete') {
                    Joins = [
                        'RIGHT JOIN Student ON Coursecomplete.StudentID = Student.ID',
                        'RIGHT JOIN Course ON Coursecomplete.CourseID = Course.ID'
                    ];
                    if (studenName !== '') {
                        Conditions.push(`Student.Forenames NOT LIKE '%${studenName}%'`);
                    }

                    if(courseName !== ''){
                        Conditions.push(`Course.name LIKE '%${courseName}%'`);
                    }
    
                    if (courseCompleteTime !== '') {
                        const [startDate, endDate] = courseCompleteTime.split('/');
                        Conditions.push(`Coursecomplete.Completedate BETWEEN '${startDate}' AND '${endDate}'`);
                    }
                }
    
                break;
            case 'Attend':
                TargetColumns = ['Classattendance.*', 'Student.Forenames', 'Student.Surname', 'Course.name AS CourseName'];
                TargetTables = ['Classattendance'];
                Joins = [
                    'RIGHT JOIN Student ON Classattendance.StudentID = Student.ID',
                    'RIGHT JOIN Course ON Classattendance.CourseID = Course.ID'
                ];
                
                if (attendOption !== '') {

                    Conditions.push(`Classattendance.Mark LIKE '%${attendOption}%'`);
                } 
                
                if (studenName !== '') {
                    Conditions.push(`Student.Forenames LIKE '%${studenName}%'`);
                }


                if (attendCompleteTime !== '') {
                   
                    const [startDate, endDate] = attendCompleteTime.split('/');
                    Conditions.push(`Classattendance.Madedate BETWEEN '${startDate}' AND '${endDate}'`);
                }
            break;
        }
    
        let params = {
            targetColumns: TargetColumns,
            targetTables: TargetTables,
            joins: Joins,
            conditions: Conditions
        };
        let getData = await getSearchColumns(params);
        setSearchData(getData);
    };
    
    /*SELECT Coursecomplete.*, Student.Forenames, Student.Surname, Course.name AS CourseName
FROM Coursecomplete
INNER JOIN Student ON Coursecomplete.StudentID = Student.ID
INNER JOIN Course ON Coursecomplete.CourseID = Course.ID
WHERE Student.Forenames LIKE '%Pekka%';
*/

    const [searchData, setSearchData] = useState([]);

    // All fields 
    const [studenName, setStudentName] = useState('');
    const handleStudenNameChange = async (event) => {
        setStudentName(event.target.value);
    };

    const [courseOption, setCourseOption] = useState('');
    const handleCourseOptionChange = async (event) =>{
        setCourseOption(event.target.value);
    }

    const [courseAttendOption, setCourseAttendOption] = useState('');
    const handleCourseAttendOptionChange = async (event) =>{
        setCourseAttendOption(event.target.value);
    }

    const [courseName, setCourseName] = useState('');
    const handleCourseNameChange = async (event) =>{
        setCourseName(event.target.value);
    }

    const [courseCompleteTime, setcourseCompleteName] = useState('');
    const handleCourseCompleteTimeChange = async (event) =>{
        setcourseCompleteName(event.target.value);
    }

    const [attendOption, setAttendOption] = useState('');
    const handleAttendOptionChange = async (event) =>{
       setAttendOption(event.target.value);
    }

    const [attendCompleteTime, setAttendCompleteName] = useState('');
    const handleAttendTimeChange = async (event) =>{
        setAttendCompleteName(event.target.value);
    }

    
    /*const [selectedCourse, setSelectedCourse] = useState(0);
    const handleCourseSelectChange = async (event) => {
        setSelectedCourse(event.target.value);
    };

    /*const getMainData = async () => {
        let getdata = await getAllFromTable("Student");
        setMainData(getdata);
    }*/


    /*useEffect(() => {
        getAttendData();
    }, [selectedCourse]);*/
    const CourseRows = () => {
        return (
            <div >
                <label htmlFor="courseOptions">Kurssi suoritusten tilanne:</label>
                <select name="coursesOptions"
                    value={courseOption}
                    onChange={handleCourseOptionChange}>
                    <option value='' >Ei valittu.</option>
                    <option value='Complete' >Suoritettu.</option>
                    <option value='Uncomplete' >Ei suoritettu.</option>
                    <option value='Both' >Suoritettu ja ei suoritettu.</option>
                </select>
                <p >Kurssin nimi: (jos tyhjä etsii kaikista kursseista)</p>
                <textarea resize="none" rows="1" cols="60" id="courseName" name="courseName"
                    required
                    onChange={handleCourseNameChange}
                    value={courseName}>  
                </textarea>
                <p >Kurssisuoritukset aikaväliltä. muodossa VVVV-KK-DD/VVVV-KK-DD*</p>
                <textarea resize="none" rows="1" cols="60" id="courseName" name="courseName"
                    required
                    onChange={handleCourseCompleteTimeChange}
                    value={courseCompleteTime}>
                </textarea>
            </div>
        )
    };

    const AttendRows = () =>{
        return (
            <div >
              <p >Kurssien paikalla olot</p>
                <textarea resize="none" rows="1" cols="60" id="courseName" name="courseName"
                    required
                    onChange={handleAttendOptionChange}
                    value={attendOption}>  
                </textarea>
                <p >Tuntimerkintä aikaväliltä. muodossa VVVV-KK-DD/VVVV-KK-DD*</p>
                <textarea resize="none" rows="1" cols="60" id="courseName" name="courseName"
                    required
                    onChange={handleAttendTimeChange}
                    value={attendCompleteTime}>
                </textarea>
            </div>
        )
    }


    const ResultRow = () => {
        const dataToUse = searchData;
        const formatDate = (isoDate) => {
            const date = new Date(isoDate);
            return date.toLocaleDateString('fi-FI');
        };
    
        return (
            <div>
                {dataToUse.map((data) => (
                    <div className="databox" key={data.ID}>
                        {Object.entries(data).map(([key, value]) => (
                           <p className="dataCard" key={key}>
                           {`${key}: ${key.endsWith('date') ? formatDate(value) : value} `}
                       </p>
                        ))}
                    </div>
                ))}
            </div>
        );
    };
    
    return (
        <div>
            <div>
                <h2>Etsi oppilaasta! </h2>
                <p >Oppilaan etunimet : *</p>
                <textarea resize="none" rows="1" cols="60" id="studentName" name="studentName"
                    required
                    onChange={handleStudenNameChange}
                    value={studenName}>
                </textarea>
                <label htmlFor="courseOrAttendOptions">Kurssi vai tuntimerkintä?:</label>
                <select name="courseOrAttendsOptions"
                    value={courseAttendOption}
                    onChange={handleCourseAttendOptionChange}>
                    <option value='' >Ei valittu.</option>
                    <option value='Course' >Kurssi.</option>
                    <option value='Attend' >Tuntimerkintä.</option>
                </select>    
                {courseAttendOption === "Course" && CourseRows()}
                {courseAttendOption === "Attend" && AttendRows()}
                <div >
                    <button onClick={() => { checkAndSend(); }}>
                        Hae</button>
                </div>
                <div>
                    <h2>Tulokset.</h2>
                    {ResultRow()}
                </div>
            </div>

        </div>
    );
}