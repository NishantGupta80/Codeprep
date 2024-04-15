import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const callAboutPage = async () => {
    try {
      const res = await fetch('/about', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      console.log(res);
      const data = await res.json();
      console.log(data);
          if(res.status!=200)
      {
        const error=new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate('/Login');
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <>
      <div className="container emp-profile">
        <form method="GET">
          <div className="row">
            <div className="col-md-4">
              <img src="#" alt="profile-pic" />
            </div>
            <div className="col-md-6">
              <div className="profile-head">
                <h5>Nishant Raj</h5>
                <h6>Web developer</h6>
                <p className="profile-rating mt-3 mb-5">
                  Rankings:<span>1/10</span>
                </p>
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nac-items">
                    <a className="nav-link active" id="home-tab" data-toggle="tab" role="tab" href="#home">About</a>
                  </li>
                  <li>
                  <a className="nav-link active" id="home-tab" data-toggle="tab"  role="tab" href="#profile">Timeline</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2"></div>
            <input type="text" className="profile-edit-btn" name="btnAddMore" value="Edit Profiile"></input>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="profile-work">
                <p> Work</p>
                <a href="#" target="_nishant">qer</a><br/>
                <a href="#" target="_nishant">wer</a><br/>
                <a href="#" target="_nishant">rrfs</a><br/>
                <a href="#" target="_nishant">wer</a><br/>
                <a href="#" target="_nishant">werwe</a><br/>
                <a href="#" target="_nishant">wer</a><br/>
              </div>
              <div className="tab-content profile-tab" id="mytabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" arial></div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default About;
