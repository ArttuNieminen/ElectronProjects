
const addNewStudent = async (Forenames,Surname,Birthdate,SchoolClass) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const table = "Student";

        const GivenBody = {
            forenames: Forenames,
            surname: Surname,
            birthdate: Birthdate,
            Schoolclass: SchoolClass,
        };

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(GivenBody)
        };

        await fetch(`http://localhost:5002/${table}`, requestOptions);
    } catch (error) {
        console.error('Error:', error);
    }
};

const addNewTeacher = async (Forenames,Surname) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const table = "Teacher";

        const GivenBody = {
            forenames: Forenames,
            surname: Surname,
        };

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(GivenBody)
        };

        await fetch(`http://localhost:5002/${table}`, requestOptions);
    } catch (error) {
        console.error('Error:', error);
    }
};

const addNewCourse = async (Name,Points) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const table = "Course";

        const GivenBody = {
            name: Name,
            points: Points,
        };

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(GivenBody)
        };

        await fetch(`http://localhost:5002/${table}`, requestOptions);
    } catch (error) {
        console.error('Error:', error);
    }
};

const addNewCourseteachers = async (teacherid,courseid) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const table = "Courseteachers";

        const GivenBody = {
            TeacherID: teacherid,
            CourseID: courseid,
        };

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(GivenBody)
        };

        await fetch(`http://localhost:5002/${table}`, requestOptions);
    } catch (error) {
        console.error('Error:', error);
    }
};


const addNewCoursecomplete = async (studentid, courseid,completedate,points,grade) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const table = "Coursecomplete";

        const GivenBody = {
            StudentID: studentid,
            CourseID: courseid,
            Completedate: completedate,
            Points: points,
            Grade: grade
        };

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(GivenBody)
        };

        await fetch(`http://localhost:5002/${table}`, requestOptions);
    } catch (error) {
        console.error('Error:', error);
    }
};


const addNewClassAttend = async (studentid, courseid,madedate,mark) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const table = "Classattendance"
        const GivenBody = {
            StudentID: studentid,
            CourseID: courseid,
            Madedate: madedate,
            Mark: mark,
        };

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(GivenBody)
        };

        await fetch(`http://localhost:5002/${table}`, requestOptions);
    } catch (error) {
        console.error('Error:', error);
    }
};

export {
    addNewStudent,
    addNewTeacher,
    addNewCourse,
    addNewCoursecomplete,
    addNewClassAttend,
    addNewCourseteachers
};