import { Link } from "react-router-dom";
function Home() {
    return (
        <>
            <div className="banner">
                <div className="bannercontent">
                    <h1>PrimeTech</h1>
                    <h3>Computer builds and tech repairs</h3>
                </div>

            </div>


            <h1>Computer Build and Tech Repair Services in Winnipeg</h1>
            <div className="services-sec">
                <div className="service-item">
                    SHOP
                    <Link to="prebuilts">
                        <h2>PC Builds</h2>
                    </Link>


                </div>
                <div className="service-item">
                    DISCOVER
                    <Link to="services">
                        <h2>Repair Services</h2>
                    </Link>
                   
                </div>

            </div>

        </>
    );
}

export default Home;