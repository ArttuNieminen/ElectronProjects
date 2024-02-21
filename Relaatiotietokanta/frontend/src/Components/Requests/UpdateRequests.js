
const updateAnyRow = async (objOfArrays) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const GivenBody = objOfArrays;

        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(GivenBody)
        };
        await fetch(`http://localhost:5002/`, requestOptions);
    } catch (error) {
        console.error('Error:', error);
    }
};

export {
   updateAnyRow
};