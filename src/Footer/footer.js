import React, { Component } from "react";
import "./footer.css";

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <p>
          &copy; Supreet Kaur | 2020 -{" "}
          <span>
            <span>
              Photo by{" "}
              <a href="https://unsplash.com/@hollymandarich?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
                Holly Mandarich
              </a>{" "}
              on{" "}
              <a href="https://unsplash.com/s/photos/hiking?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
                Unsplash
              </a>
            </span>
          </span>
        </p>
      </div>
    );
  }
}

export default Footer;
