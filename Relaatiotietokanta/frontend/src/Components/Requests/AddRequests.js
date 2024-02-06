
const addNewStudent = async () => {
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

const addNewTeacher = async () => {
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