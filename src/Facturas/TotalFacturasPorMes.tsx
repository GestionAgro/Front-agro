import React, { useState, useEffect } from "react";
import apiClient from "../api/apiServer";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { getTotalesPorMes } from "./FacturaService";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function TotalesFacturasPorMes() {
  const [totalesPorMes, setTotalesPorMes] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const obtenerTotalesPorMes = async () => {
      try {
        const data = await getTotalesPorMes();
        setTotalesPorMes(data);
      } catch (err: any) {
        setError("Error al obtener los totales por mes");
      }
    };

    obtenerTotalesPorMes();
  }, []);

  const chartData = {
    labels: totalesPorMes.map((item: any) => item.mes),
    datasets: [
      {
        label: "Total Importe",
        data: totalesPorMes.map((item: any) => item.totalImporte),
        fill: false,
        borderColor: "rgba(53, 205, 210, 1)",
        tension: 0.1,
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
        text: "Total del Importe de Facturas por Mes",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div
       style={{maxWidth: "800px",margin: "0 auto",padding: "20px",}}>
       <h2 style={{ textAlign: "center", marginBottom: "100px" }}></h2>
       <div style={{ height: "400px" }}>
         <Line data={chartData} options={chartOptions} />
       </div>
     </div>
  );
}