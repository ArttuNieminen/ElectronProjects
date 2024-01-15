import Get48HourPrice from "../48hPrices";

const rand = () => Math.round(Math.random() * 100);
//labeleihin laitetaan sitten 10 ladatuinta niiden nimet ja määrätlaitetaan data osioon
const chartdatalikes = {
    labels: ['1', '2', '3', '4', '5', '6', '7','8','9','10'],
    datasets: [
      {
        label: 'Hinta',
        backgroundColor: '#60c1b6',
        borderColor: '#305e58',
        borderWidth: 1,
        hoverBackgroundColor: '#60c1b6',
        hoverBorderColor: '#305e58',
        data: [2]
      }
    ]
};

export default chartdatalikes;
