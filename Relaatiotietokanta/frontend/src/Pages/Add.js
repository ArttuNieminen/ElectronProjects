import React, { useState } from 'react';
import Student from '../Components/AddPages/StudentFields';
import Teacher from '../Components/AddPages/TeacherFields';
import Course from '../Components/AddPages/CourseFields';
import Courseteachers from '../Components/AddPages/CourseTeacherFields';
import Classattend from '../Components/AddPages/ClassatttendFields';
import Coursecomplete from '../Components/AddPages/CoursecompleteFields';

export default function AddPage() {
    const [value, setValue] = useState("");


    return (
        <div>
            <h3>Lisäys sivu</h3>
            <select name="options" id="options" value={value} onChange={(event) => setValue(event.target.value)}>
                <option value={''} hidden>Valitse mitä haluat lisätä:</option>
                <option value="Student">Oppilas</option>
                <option value="Teacher">Opettaja</option>
                <option value="Course">Kurssi</option>
                <option value="Courseteachers">Kurssien opettajat</option>
                <option value="Coursecomplete">Kurssisuoritus</option>
                <option value="Classattend">Kurssimerkintä</option>
            </select>
            <div className='fieldsOfChoice'>
                {value === "Student" && <Student/>}
                {value === "Teacher" && <Teacher/>}
                {value === "Course" && <Course />}
                {value === "Courseteachers" && <Courseteachers />}
                {value === "Coursecomplete" && <Coursecomplete />}
                {value === "Classattend" && <Classattend />}
            </div>
            
        </div>
    );
}

