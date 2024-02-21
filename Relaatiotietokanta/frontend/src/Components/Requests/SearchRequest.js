
const getSearchColumns = async (objOfArrays) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
       

        const GivenBody = objOfArrays;
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(GivenBody)
        };

       
        const result = await fetch(`http://localhost:5002/search`, requestOptions)
        .then(result => result.json()) 
        return result;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }    
};

export default getSearchColumns;