import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { getTotalesPorMes } from "./FacturaService";
import Modal from "../componentes/Modal";
import type { TotalPorMes } from "../entidades/Factura";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

 const TotalesFacturasPorMes = () => {
  const [totalesPorMes, setTotalesPorMes] = useState<TotalPorMes[]>([]);
  const [modalError, setModalError] = useState(false);
  const [mensaje, setMensaje] = useState("");


  useEffect(() => {
    const obtenerTotalesPorMes = async () => {
      try {
        const data = await getTotalesPorMes();
        setTotalesPorMes(data);
      } catch {
        setMensaje("Error al obtener los totales por mes");
        setModalError(true);
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
    <>
    <div
       style={{maxWidth: "800px",margin: "0 auto",padding: "20px",}}>
       <div style={{ height: "60px" }}></div>
       <div style={{ height: "400px" }}>
         <Line data={chartData} options={chartOptions} />
       </div>
     </div>

       <Modal isOpen={modalError} onClose={() => setModalError(false)}>
        <p>{mensaje}</p>
      </Modal>
      </>
  );
}

export default TotalesFacturasPorMes