import React, { useState } from 'react';
import UpdClassattend from '../Components/UpdatePages/UpdClassatttendFields';
import UpdCourse from '../Components/UpdatePages/UpdCourseFields';
import UpdCoursecomplete from '../Components/UpdatePages/UpdCoursecompleteFields';
import UpdCourseteachers from '../Components/UpdatePages/UpdCourseTeacherFields';
import UpdStudent from '../Components/UpdatePages/UpdStudentFields';
import UpdTeacher from '../Components/UpdatePages/UpdTeacherFields';

export default function EditPage() {
    const [value, setValue] = useState("");


    return (
        <div>
            <h3>Muokkaus sivu</h3>
            <select name="options" id="options" value={value} onChange={(event) => setValue(event.target.value)}>
                <option value={''} hidden>Valitse mitä haluat muokata:</option>
                <option value="Student">Oppilas</option>
                <option value="Teacher">Opettaja</option>
                <option value="Course">Kurssi</option>
                <option value="Courseteachers">Kurssien opettajat</option>
                <option value="Coursecomplete">Kurssisuoritus</option>
                <option value="Classattend">Kurssimerkintä</option>
            </select>
            <div className='fieldsOfChoice'>
                {value === "Student" && <UpdStudent/>}
                {value === "Teacher" && <UpdTeacher/>}
                {value === "Course" && <UpdCourse />}
                {value === "Courseteachers" && <UpdCourseteachers />}
                {value === "Coursecomplete" && <UpdCoursecomplete />}
                {value === "Classattend" && <UpdClassattend />}
            </div>
        </div>
    );
}

