import Navbar from "../componentes/Navbar";
import "./css/Home.css"

export default function Home() {
  return (
    <div className="main-content">
      <Navbar />
      <div style={{ marginTop: "150px" }}>
        <div className="home-container">
          <h1></h1>
        </div>
      </div>
    </div>
  );
}
