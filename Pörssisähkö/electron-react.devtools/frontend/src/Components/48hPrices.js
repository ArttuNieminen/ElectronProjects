

const getHours = async () => {
    try {
        const result = await fetch(`http://localhost:5002/prices`, {
            method: 'GET'
          }).then(result => result.json());
        //console.log(result);
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
};

export default getHours;
