
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

const addNewCourse = async () => {
    try {
        const table = "Student"
        const result = await fetch(`http://localhost:5002/${table}`, {
            method: 'GET'
        }).then(result => result.json()) 
        console.log(result)
        //return result;
        return result[0].ID;
    } catch (error) {
        console.error('Error:', error);

    }    
};

const addNewCourseteachers = async () => {
    try {
        const table = "Student"
        const result = await fetch(`http://localhost:5002/${table}`, {
            method: 'GET'
        }).then(result => result.json()) 
        console.log(result)
        //return result;
        return result[0].ID;
    } catch (error) {
        console.error('Error:', error);

    }    
};

const addNewCoursecomplete = async () => {
    try {
        const table = "Student"
        const result = await fetch(`http://localhost:5002/${table}`, {
            method: 'GET'
        }).then(result => result.json()) 
        console.log(result)
        //return result;
        return result[0].ID;
    } catch (error) {
        console.error('Error:', error);

    }    
};

const addNewClassAttend = async () => {
    try {
        const table = "Student"
        const result = await fetch(`http://localhost:5002/${table}`, {
            method: 'GET'
        }).then(result => result.json()) 
        console.log(result)
        //return result;
        return result[0].ID;
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