import { EstadoProps } from "../../types";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, ChartOptions } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';


interface Props {
    dadosEstados: EstadoProps[]
}

const EstadoChart = ({dadosEstados}:Props) => {
    ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels, Title);

    const geradorDeCores = () => {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);

        return `rgba(${r}, ${g}, ${b}, 0.5)`;
    }

    const randomColors = dadosEstados.map(() => geradorDeCores());
    const randomBorders = randomColors.map((dados) => {
       return  dados.replace("0.5", "1");
    } );



    const data = {
        labels: dadosEstados.map(item => item.estado),
        datasets: [
            {
                label: 'Quantidade de Pacientes',
                data: dadosEstados.map(item => item.pacientes),
                backgroundColor: randomColors,
                borderColor: randomBorders,
                borderWidth: 1,
            },
        ],
    };

    const options: ChartOptions<'pie'> ={
        plugins: {
            legend: {
                position: "top" as const,
            },
            datalabels: {
                color: "#000",
                anchor: "center",
                align: "start",
                borderWidth: 2,
                font: {
                    size: 36,
                    weight: "bold",
                },
                formatter: (value: number) => value,
            },
        },
    }

    return (
        <>
            <h3 className="titulo-estado">Pacientes por Estado:</h3>
            <Pie className="chart-estado" data={data} options={options} />
        </>
    );
}

export default EstadoChart;
