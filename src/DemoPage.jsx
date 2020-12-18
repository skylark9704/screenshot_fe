import React from "react";

function DemoPage() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
              <a className="nav-link" href="#">
                Features
              </a>
              <a className="nav-link" href="#">
                Pricing
              </a>
              <a
                className="nav-link disabled"
                href="#"
                tabIndex="-1"
                aria-disabled="true"
              >
                Disabled
              </a>
            </div>
          </div>
        </div>
      </nav>
      <br />
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="card" style={{height:"400px", overflowY:"scroll"}}>
              <ul className="list-group list-group-flush">
                {Array(50).fill(0).map((_, index) => <li style={{textAlign:"center"}} className="list-group-item">{index + 1}</li>)}
              </ul>
              <div className="card-footer">Card footer</div>
            </div>
          </div>
          <div className="col">
            <img
              src={
                "https://cdn.mos.cms.futurecdn.net/rLh7Dh7EKo8F6zmDtXYp8W-970-80.jpg.webp"
              }
            />
          </div>
          <div className="col">
            <img width="100%" src={"bc-logo.svg"} />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/tgbNymZ7vqY"
            ></iframe>
          </div>
          <div className="col">
            <img src={"cyberpunk.webp"} />
          </div>
        </div>
      </div>
    </>
  );
}

export default DemoPage;
