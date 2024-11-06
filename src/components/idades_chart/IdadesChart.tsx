import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, scales} from 'chart.js';
import { IdadeProps } from '../../types';

interface IdadeChartProps {
    dadosIdade: IdadeProps;
}

const IdadesChart = ({dadosIdade}:IdadeChartProps) => {
    ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement);

    const data = {
        labels: ['0-5', '6-10', '11-15', '16-18', '19-25', '+25'],
        datasets: [{
            label: 'idades',
            data: Object.values(dadosIdade),
            fill: false,
            borderColor: '#053BA6',
            tension: 0.1
        }]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 26,
                    },
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        size: 26
                    },
                },
            },
            y: {
                ticks: {
                    font: {
                        size: 18
                    }
                }
            }
        }
    }

    return (
        <>
            <h3 className='titulo-idade'>Quantidade de Pacientes por idade:</h3>
            <Line className='chart-idade' data={data} options={options}/>
        </>
    );
} 

export default IdadesChart;