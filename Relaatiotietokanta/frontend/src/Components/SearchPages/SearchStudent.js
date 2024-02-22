import { useEffect, useState } from 'react';
import getSearchColumns from '../Requests/SearchRequest';

export default function SearchStudent() {
    const checkAndSend = async () => {
        makeSearchCall(); // currently no conditions 
    };

    const makeSearchCall = async () => {
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
                TargetColumns = ['Coursecomplete.Completedate AS Kurssin_suorituspäivä', 'Student.Forenames AS Oppilaan_etunimet', 'Student.Surname AS Oppilaan_sukunimi', 'Course.name AS Kurssi'];
                TargetTables = ['Coursecomplete'];
                Joins = [
                    'RIGHT JOIN Student ON Coursecomplete.StudentID = Student.ID',
                    'RIGHT JOIN Course ON Coursecomplete.CourseID = Course.ID'
                ];

                if (courseOption === 'Complete') {

                    if (studenName !== '') {
                        Conditions.push(`Student.Forenames LIKE '%${studenName}%'`);
                    }


                    if (courseCompleteTime !== '') {

                        const [startDate, endDate] = courseCompleteTime.split('/');
                        Conditions.push(`Coursecomplete.Completedate BETWEEN '${startDate}' AND '${endDate}'`);
                    }
                } else if (courseOption === 'Uncomplete') {

                    if (studenName !== '') {
                        Conditions.push(`Student.Forenames NOT LIKE '%${studenName}%'`);
                    }

                    if (courseCompleteTime !== '') {
                        const [startDate, endDate] = courseCompleteTime.split('/');
                        Conditions.push(`Coursecomplete.Completedate BETWEEN '${startDate}' AND '${endDate}'`);
                    }
                }
                if (courseName !== '') {
                    Conditions.push(`Course.name LIKE '%${courseName}%'`);
                }


                if (courseTeachers === 'Yes') {
                    TargetColumns.push('Teacher.Forenames AS Opettajan_etunimet', 'Teacher.Surname AS Opettajan_sukunimi');
                    Joins.push('LEFT JOIN Courseteachers ON Course.ID = Courseteachers.CourseID', 'LEFT JOIN Teacher ON Courseteachers.TeacherID = Teacher.ID');
                }
                break;
            case 'Attend':
                TargetColumns = ['Classattendance.Madedate AS Merkinnän_päiväys', 'Student.Forenames AS Oppilaan_etunimet', 'Student.Surname AS Oppilaan_sukunimi', 'Course.name AS Kurssi'];
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


    /*SELECT Coursecomplete.Completedate AS Kurssin_suorituspäivä, Student.Forenames AS Oppilaan_etunimet, Student.Surname AS Oppilaan_sukunimi, Course.name AS Kurssi, Teacher.Forenames AS Opettajan_etunimet, Teacher.Surname AS Opettajan_sukunimi
FROM Coursecomplete
RIGHT JOIN Student ON Coursecomplete.StudentID = Student.ID
RIGHT JOIN Course ON Coursecomplete.CourseID = Course.ID
LEFT JOIN Courseteachers ON Course.ID = Courseteachers.CourseID
LEFT JOIN Teacher ON Courseteachers.TeacherID = Teacher.ID;
*/
    const [searchData, setSearchData] = useState([]);

    // All fields 
    const [studenName, setStudentName] = useState('');
    const handleStudenNameChange = async (event) => {
        setStudentName(event.target.value);
    };

    const [courseOption, setCourseOption] = useState('');
    const handleCourseOptionChange = async (event) => {
        setCourseOption(event.target.value);
    }

    const [courseAttendOption, setCourseAttendOption] = useState('');
    const handleCourseAttendOptionChange = async (event) => {
        setCourseAttendOption(event.target.value);
    }

    const [courseName, setCourseName] = useState('');
    const handleCourseNameChange = async (event) => {
        setCourseName(event.target.value);
    }

    const [courseCompleteTime, setcourseCompleteName] = useState('');
    const handleCourseCompleteTimeChange = async (event) => {
        setcourseCompleteName(event.target.value);
    }

    const [attendOption, setAttendOption] = useState('');
    const handleAttendOptionChange = async (event) => {
        setAttendOption(event.target.value);
    }

    const [attendCompleteTime, setAttendCompleteName] = useState('');
    const handleAttendTimeChange = async (event) => {
        setAttendCompleteName(event.target.value);
    }

    const [courseTeachers, setcourseTeachers] = useState('');
    const handlecourseTeachersChange = async (event) => {
        setcourseTeachers(event.target.value);
    }


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
                <label htmlFor="courseTeachOptions">Näytä kurssien opettajat:</label>
                <select name="coursesTeachOptions"
                    value={courseTeachers}
                    onChange={handlecourseTeachersChange}>
                    <option value='No' >Ei </option>
                    <option value='Yes' >Kyllä.</option>
                </select>
            </div>
        )
    };

    const AttendRows = () => {
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

        const formatKey = (key) => {
            if (typeof key === 'string') {
                return key.replace(/_/g, ' ');
            }
            return key;
        };

        const formatValue = (key, value) => {
            if (value === null) {
                return '---';
            }
            if (key.endsWith('päivä') || key.endsWith('päiväys') || key.endsWith('date')) {
                return formatDate(value);
            }
            return value;
        };

        return (
            <div>
                {dataToUse.map((data) => (
                    <div className="databox" key={data.ID}>
                        {Object.entries(data).map(([key, value]) => (
                            <p className="dataCard" key={key}>
                                <strong>{`${formatKey(key)}:`}</strong> {formatValue(key, value)}
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