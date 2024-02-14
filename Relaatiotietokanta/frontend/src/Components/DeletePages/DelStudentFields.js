import { addNewStudent } from "../Requests/AddRequests";
import { useEffect, useState } from 'react';


export default function DelStudent() {

    const checkAndSend = async () => {
        if (forenames.trim().length === 0 || surname.trim().length === 0 || birthdate.trim().length === 0 || schoolClass.trim().length === 0) {
            console.log("Some fields in students are empty!!");
        }
        else {
            addNewStudent(forenames, surname, birthdate, schoolClass);
        }
    };

    const [forenames, setForenames] = useState('');
    
    const handleForenamesChange = event => {
        setForenames(event.target.value);

        //console.log('value is:', event.target.value);
    };
    const [surname, setSurname] = useState('');
    const handleSurnameChange = event => {
        setSurname(event.target.value);

    };
    const [birthdate, setBirthdate] = useState('');
    const handleBirthdateChange = event => {
        setBirthdate(event.target.value);

    };

    const [schoolClass, setschoolClass] = useState('');
    const handleSchoolclassChange = event => {
        setschoolClass(event.target.value);

    };
    return (
        <div>
            <div>
                <h2>Täytä kaikki kentät! *</h2>
                <p >Etunimet: *</p>
                <textarea resize="none" rows="1" cols="100" id="forenames"
                    required
                    name="forenames"
                    onChange={handleForenamesChange}
                    value={forenames}></textarea>
                <p >Sukunimi *</p>
                <textarea resize="none" rows="1" cols="60" id="surname" name="surname"
                    required
                    onChange={handleSurnameChange}
                    value={surname}></textarea>
                <p>Syntymä-aika VVVV-KK-PP*</p>
                <textarea resize="none" rows="1" cols="20" id="birthdate" name="birthdate"
                    required
                    onChange={handleBirthdateChange}
                    value={birthdate}></textarea>
                <p>Luokka *</p>
                <textarea resize="none" rows="1" cols="20" id="schoolClass" name="schoolClass"
                    required
                    onChange={handleSchoolclassChange}
                    value={schoolClass}></textarea>
                <div className='post'>
                    <button onClick={() => { checkAndSend(); }}>
                        Lisää</button>
                </div>
            </div>
        </div>
    );
}

