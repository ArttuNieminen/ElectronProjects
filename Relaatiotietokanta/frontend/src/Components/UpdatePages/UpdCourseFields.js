import { updateAnyRow } from "../Requests/UpdateRequests";
import { useState, useEffect } from 'react';
import getAllFromTable from "../Requests/AllFromTable";

export default function UpdCourse() {

    const checkAndSend = async () => {
        if (coursename.trim().length === 0 || points.trim().length === 0 ) {
            console.log("Some fields in students are empty!!");
        }
        else {
            let params = {
                targetTable: 'Course',
                targetRow: rowId,
                updateColumns: ['name', 'Points',],
                updateData: [coursename, points]
            }
            updateAnyRow(params);
        }
    };

    const [rowId, setRowID] = useState(0);
    const handleRowIDChange = event => {
        setRowID(event.target.value);
    };

    const [coursename, setNames] = useState(''); 
    const handleNamesChange = event => {
        setNames(event.target.value);

        //console.log('value is:', event.target.value);
    };
    const [points, setPoints] = useState('');
    const handlePointsChange = event => {
        setPoints(event.target.value);

    };
    
    const [courseData, setCourseData] = useState([]);
    const getCourses = async () => {
        let getdata = await getAllFromTable("Course");
        setCourseData(getdata);
    }

    const CourseRows = () => {
        const dataToUse = courseData;
        return (
            <div >
                {dataToUse.map(data => (
                    <div className="databox" key={data.ID}>
                        <p className="dataCard">{`Nimi: ${data.name} `}</p>
                        <p className="dataCard">{`Opintopisteet: ${data.points} `}</p>
                        <p className="dataCard">{`Tunnus: ${data.ID}`}</p>
                    </div>
                ))}
            </div>
        )
    };

    useEffect(() => {
        getCourses();
    }, []);

    
    return (
        <div>
            <div>
                <h2>Täytä kaikki kentät! *</h2>
                <p >Kurssin tunnus mitä muokata: *</p>
                <textarea resize="none" rows="1" cols="100" id="rowid"
                    required
                    name="rowid"
                    onChange={handleRowIDChange}
                    value={rowId}></textarea>
                <p >Kurssin nimi: *</p>
                <textarea resize="none" rows="1" cols="100" id="name"
                    required
                    name="name"
                    onChange={handleNamesChange}
                    value={coursename}></textarea>
                <p >Opintopisteet *</p>
                <textarea resize="none" rows="1" cols="60" id="points" name="points"
                    required
                    onChange={handlePointsChange}
                    value={points}></textarea>
                <div className='post'>
                    <button onClick={() => { checkAndSend(); }}>
                    Tee muutokset</button>
                </div>
                <div className="wholeList">
                        <h2>Kurssien lista</h2>
                        {CourseRows()}
                    </div>
            </div>
        </div>
    );
}

