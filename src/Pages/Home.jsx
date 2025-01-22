import { Link } from "react-router-dom";
function Home() {
    return (
        <>
            <div className="banner">
                <div className="bannercontent">
                    <h1>Sami PC Builds</h1>
                    <h3>Computer builds and repairs</h3>
                </div>

            </div>


            <h1>Computer Build and Repair Services in Winnipeg</h1>
            <div className="services-sec">
                <div className="service-item">
                    <Link to="prebuilts">                    <h2>PC Builds</h2>
                    </Link>
                    <ul>
                        <li>Prebuilt Models</li>
                        <li>Custom Build</li>
                        <li>Bring Your Own Parts</li>
                    </ul>

                </div>
                <div className="service-item">
                    <Link to="services">
                        <h2>Repair Service</h2>
                    </Link>
                    <ul>
                        <li>Diagnostic</li>
                        <li>OS Reinstallation</li>
                        <li>Hardware replacement</li>
                    </ul>

                </div>

            </div>

        </>
    );
}

export default Home;