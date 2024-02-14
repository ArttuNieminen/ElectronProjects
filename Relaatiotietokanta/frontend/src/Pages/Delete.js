import React, { useState } from 'react';
import DelClassattend from '../Components/DeletePages/DelClassatttendFields';
import DelCourse from '../Components/DeletePages/DelCourseFields';
import DelCoursecomplete from '../Components/DeletePages/DelCoursecompleteFields';
import DelCourseteachers from '../Components/DeletePages/DelCourseTeacherFields';
import DelStudent from '../Components/DeletePages/DelStudentFields';
import DelTeacher from '../Components/DeletePages/DelTeacherFields';

export default function DeletePage(){
    const [value, setValue] = useState("");


    return (
        <div>
            <h3>Poisto sivu</h3>
            <label htmlFor="options">Valitse mitä haluat poistaa.:</label>

            <select name="options" id="options" value={value} onChange={(event) => setValue(event.target.value)}>
                <option value="Student">Oppilas</option>
                <option value="Teacher">Opettaja</option>
                <option value="Course">Kurssi</option>
                <option value="Courseteachers">Kurssien opettajat</option>
                <option value="Coursecomplete">Kurssisuoritus</option>
                <option value="Classattend">Kurssimerkintä</option>
            </select>
            <div className='fieldsOfChoice'>
                {value === "Student" && <DelStudent/>}
                {value === "Teacher" && <DelTeacher/>}
                {value === "Course" && <DelCourse />}
                {value === "Courseteachers" && <DelCourseteachers />}
                {value === "Coursecomplete" && <DelCoursecomplete />}
                {value === "Classattend" && <DelClassattend />}
            </div>
            
        </div>
    );
}
