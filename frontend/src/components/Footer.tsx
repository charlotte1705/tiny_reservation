import { TwitterOutlined, FacebookOutlined, InstagramOutlined, SendOutlined,  HeartOutlined } from '@ant-design/icons';

import "../style/footer.css";
import "../css/bootstrap.min.css";
import "../css/font-awesome.min.css";
import "../css/elegant-icons.css";
import "../css/flaticon.css";
import "../css/owl.carousel.min.css";
import "../css/nice-select.css";
import "../css/jquery-ui.min.css";
import "../css/magnific-popup.css";
import "../css/slicknav.min.css";

const AppFooter = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-text">
          <div className="row">
            <div className="col-lg-4">
              <div className="ft-about">
                <div className="logo">
                <a href="#" className="flex items-center justify-center">
                  <div className="text-white text-2xl font-bold">Tiny</div>
                </a>

                </div>
                <p>We inspire and reach millions of travelers<br /> across 90 local websites</p>
                <div className="fa-social">
                  <a href="#"><FacebookOutlined /></a>
                  <a href="#"><TwitterOutlined /></a>
                  <a href="#"><InstagramOutlined /></a>
                  {/* You can find the equivalent Ant Design icon for TripAdvisor and YouTube */}
                </div>
              </div>
            </div>
            <div className="col-lg-3 offset-lg-1">
              <div className="ft-contact">
                <h6>Contact Us</h6>
                <ul>
                  <li>(84) 925 244325</li>
                  <li>santanguyen462@gmail.com</li>
                  <li>965 Ngo Quyen. 356, Da Nang, Vietnam</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 offset-lg-1">
              <div className="ft-newslatter">
                <h6>New latest</h6>
                <p>Get the latest updates and offers.</p>
                <form action="#" className="fn-form">
                  <input type="text" placeholder="Email" />
                  <button type="submit">
                    <SendOutlined/>

                    </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <ul>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Terms of use</a></li>
                <li><a href="#">Privacy</a></li>
                <li><a href="#">Environmental Policy</a></li>
              </ul>
            </div>
            <div className="col-lg-5">
            <div className="co-text">
              <p>
                &copy;{new Date().getFullYear()} All rights reserved | Reservation Tiny <HeartOutlined />
              </p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
