import { Link } from "react-router-dom";
function Service() {
  return (
    <>
      <div className="pagetitle">
        <h1 style={{}}>Repair Services</h1>
        <div className="services" style={{ marginBottom: '50px'}}>
          We special in PC and tech repairs. Be it a desktop, laptop, mobile
          device or gaming console. We got you covered.
            <p>Below is a list of some of our services.</p> 
          <ul>
            <li>Diagnosis</li>
            <li>Virus removal</li>
            <li>Hardware repair</li>
            <li>Mobile screens</li>
            <li>Laptop upgrades and repairs</li>
            <li>Battery replacements</li>
            <li>And more...</li>
          </ul>
          <Link to="/contact"><button>Inquire</button></Link>
        </div>
      </div>
    </>
  );
}

export default Service;
