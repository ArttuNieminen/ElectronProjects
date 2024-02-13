import { addNewCourseteachers } from "../Requests/AddRequests";
import getAllFromTable from "../Requests/AllFromTable";
import { useEffect, useState } from 'react';

export default function Courseteachers() {
    const checkAndSend = async () => {
        if (forenames.trim().length === 0 || surname.trim().length === 0) {
            console.log("Some fields in students are empty!!");
        }
        else {
            addNewCourseteachers(forenames, surname);
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

    const [teachersData, setTeachersData] = useState([]);
    const getTeachers = async () => {
        let getdata = await getAllFromTable("Teacher");
        setTeachersData(getdata);
    }

    useEffect(() => {
        getTeachers();
    }, []);

    const TeachersRows = () => {
        const dataToUse =teachersData;
        return (
            <div >
                {dataToUse.map(data => (
                    <div className="databox" key={data.id}>
                        <p className="dataName">{`Nimet: ${data.Forenames} ${data.Surname}`}</p>
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
                <div className='post'>
                    <button onClick={() => { checkAndSend(); }}>
                        Lisää</button>
                </div>
                <div>
                    <p>Opettajat lista</p>
                    {TeachersRows()}
                    <p>Kurssit lista</p>
                </div>
            </div>

        </div>
    );
}