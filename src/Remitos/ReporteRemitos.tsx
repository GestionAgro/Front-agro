import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import { getReporteMensualRemitos } from "./RemitoService";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const ReporteRemitos = () => {
  const [remitos, setRemitos] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getReporteMensualRemitos()
        setRemitos(data);
      } catch (error) {
        console.error("Error al obtener los datos", error);
      }
    };
    fetchData();
  }, []);

  const chartData = {
    labels: remitos.map((item: any) => `Mes ${item.mes}`),
    datasets: [
      {
        label: "Total de Remitos por mes",
        data: remitos.map((item: any) => item.totalRemitos),
        backgroundColor: "rgba(33, 202, 27, 0.34)",
        borderColor: "rgba(25, 116, 15, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
     responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Total del Remitos por Mes",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
            stepSize: 1,
        },
      },
    },
  };
  return (
  <div
    style={{maxWidth: "800px",margin: "0 auto",padding: "20px",}}>
    <h2 style={{ textAlign: "center", marginBottom: "100px" }}></h2>
    <div style={{ height: "400px" }}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  </div>
);
};

export default ReporteRemitos;
