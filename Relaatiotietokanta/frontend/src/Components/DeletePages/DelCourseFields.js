import { deleteAnyRow } from "../Requests/DeleteRequests";
import getAllFromTable from "../Requests/AllFromTable";
import { useEffect, useState } from 'react';

export default function DelCourse() {
    const checkAndSend = async () => {
        if (courseid === 0 ) {
            console.log("not all fields selected or given values")
        }
        else {
            let params = {
                targetTable: 'Course',
                copmarisons: [`Course.ID = ${courseid}`]
            }
            deleteAnyRow(params);
            window.location.reload();
        }
    };

    const [courseid, setCourseID] = useState(0);
    const handleCourseIDChange = event => {
        setCourseID(event.target.value);
    };

    const [courseData, setCourseData] = useState([]);
    const getCourses = async () => {
        let getdata = await getAllFromTable("Course");
        setCourseData(getdata);
    }

    useEffect(() => {
        getCourses();
    }, []);

    const CourseRows = () => {
        const dataToUse = courseData;
        return (
            <div >
                {dataToUse.map(data => (
                    <div className="databox"   key={data.ID}>
                        <p className="dataCard">{`Nimi: ${data.name} `}</p>
                        <p className="dataCard">{`Tunnus: ${data.ID}`}</p>
                    </div>
                ))}
            </div>
        )
    };

    return (
        <div>
            <div>
                <h2>Täytä kaikki kentät! *</h2>
                <p >Kurssin tunnus: *</p>
                <textarea resize="none" rows="1" cols="20" id="courseid" name="courseid"
                    required
                    onChange={handleCourseIDChange}
                    value={courseid}></textarea>
                <div className='post'>
                    <button onClick={() => { checkAndSend(); }}>
                        Poista</button>
                </div>
                <div>
                    <h2>Kurssit.</h2>
                    {CourseRows()}
                </div>

            </div>

        </div>
    );
}