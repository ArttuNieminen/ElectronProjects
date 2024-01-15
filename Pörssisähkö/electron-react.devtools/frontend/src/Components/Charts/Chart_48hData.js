import getHours from "../48hPrices";

// Function to fetch data and update chartdata
const fetchDataAndUpdateChart = async () => {
  try {
    // Call the getHours function
    const result = await getHours();
  // Extract unique labels using year, month, day, start hour, and end hour from startDate and endDate strings in the result array
  const uniqueLabels = [...new Set(result.map(item => {
    const startDate = new Date(item.startDate);
    const endDate = new Date(item.endDate);

    const startYear = startDate.getFullYear();
    const startMonth = (startDate.getMonth() + 1).toString().padStart(2, '0');
    const startDay = startDate.getDate().toString().padStart(2, '0');
    const startHour = startDate.getUTCHours().toString().padStart(2, '0');

    const endHour = endDate.getUTCHours().toString().padStart(2, '0');

    return `${startYear}/${startMonth}/${startDay} ${startHour}-${endHour}`;
  }))];

  // Sort the labels to maintain a consistent order
  const sortedLabels = uniqueLabels.sort();

  const chartdata = {
    labels: sortedLabels,
      datasets: [
        {
          label: 'Hinta',
          backgroundColor: '#60c1b6',
          borderColor: '#305e58',
          borderWidth: 1,
          hoverBackgroundColor: '#60c1b6',
          hoverBorderColor: '#305e58',
          data: result.map(item => item.price), // Assuming result has a 'value' property
        }
      ]
    };
    // Log or use the updated chartdata object
    console.log(result);

    // You can export the chartdata object or use it as needed
    return chartdata;
  } catch (error) {
    console.error('Error:', error);
  }
};

// Call the fetchDataAndUpdateChart function
const chartdata = await fetchDataAndUpdateChart();

export default chartdata;
