import SearchStudent from "../Components/SearchPages/SearchStudent";
import React, { useState } from 'react';

export default function SearchPage(){
    const [value, setValue] = useState("");


    return (
        <div>
            <h3>Etsimis sivu</h3>
            <select name="options" id="options" value={value} onChange={(event) => setValue(event.target.value)}>
                <option value={''} hidden>Valitse mitä haluat etsiä:</option>
                <option value="Student">Oppilas</option>
                <option value="Teacher">Opettaja</option>
                <option value="Course">Kurssi</option>
                <option value="Courseteachers">Kurssien opettajat</option>
                <option value="Coursecomplete">Kurssisuoritus</option>
                <option value="Classattend">Kurssimerkintä</option>
            </select>
            <div className='fieldsOfChoice'>
                {value === "Student" && <SearchStudent/>}
                
            </div>
        </div>
    );
}

