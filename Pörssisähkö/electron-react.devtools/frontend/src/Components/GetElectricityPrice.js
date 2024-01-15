

const getHour = async () => {
    try {

        const dateAndTimeNow = new Date();
        const date = dateAndTimeNow.toISOString().split('T')[0];
        const hour = dateAndTimeNow.getHours();

        const result = await fetch(`http://localhost:5002/price/${date}/${hour}`, {
            method: 'GET'
        }).then(result => result.json());

        let { price } = result;
        return `${price}/snt`;

    } catch (error) {
        console.error('Error:', error);
    }
};
export default getHour;
