import React from "react";

const About = () => {
  return (
    <div className="aboutPage">
      <div className="aboutbox">
        <h1>About Us</h1>
        <div className="authors">
          <div className="authorBox">
            <label>Matt</label>

            <img src="/Matt.jpeg" className="author zoomable" alt="hold up" />
            <p className="aboutAuthor">
              Matt was an electrical engineer at AECOM designing power
              distribution systems.{" "}
            </p>
          </div>
          <div className="authorBox">
            <label>Greg</label>
            <img className="author zoomable" src="Greg.png" alt="hold up" />
            <p className="aboutAuthor">
              Greg is a former Mechanical Engineer who studied at SUNY New
              Paltz. Aside from making cool software projects, he enjoys live
              music and a nice dark roast on Sunday Morning.{" "}
            </p>
          </div>
          <div className="authorBox">
            <label>Nicholas</label>
            <img
              className="author zoomable"
              src="/Nicholas.jpeg"
              alt="Nicholas emoji"
            />
            <p className="aboutAuthor">
              Nicholas was a Master Field Service Technician for Eaton. Prior to
              that he spent eight years in the US Navy as a Nuclear Electricians
              Mate - Submarines.{" "}
            </p>
          </div>
          <div className="authorBox">
            <label>Jing</label>
            <img className="author zoomable" src="Nobi.png" alt="Jing emoji" />
            <p className="aboutAuthor">
              Jing was a secondary school math and computer science teacher in
              NYC.
            </p>
          </div>
        </div>
        <p className="last-p">
          {" "}
          We saw a need for a social app for the social experience of coffee.{" "}
        </p>
      </div>
    </div>
  );
};
export default About;
