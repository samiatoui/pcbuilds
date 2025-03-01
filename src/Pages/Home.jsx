import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="home-services">
      <div className="services-container">
        <div
          style={{
            maxWidth: "500px",
            textAlign: "left",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <h1>Computer Build and Tech Repair Services in Winnipeg</h1>
          <div className="services-sec">
            <Link to="prebuilts">
              <div className="service-item-inv">
                <strong>PC Builds</strong>
              </div>
            </Link>

            <Link to="services">
              <div className="service-item">
                <strong>Repair Services</strong>
              </div>
            </Link>
          </div>
        </div>

        <div className="home-div2"></div>
      </div>
    </div>
  );
}

export default Home;
