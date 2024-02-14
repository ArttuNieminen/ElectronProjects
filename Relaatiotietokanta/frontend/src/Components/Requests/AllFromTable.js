
const getAllFromTable = async (table) => {
    try {
        const result = await fetch(`http://localhost:5002/${table}`, {
            method: 'GET'
        }).then(result => result.json()) 
        return result;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }    
};

export default getAllFromTable;