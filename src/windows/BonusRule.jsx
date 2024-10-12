import React from "react";
import { EE } from "../App";
import "../css/bonusrule.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import { PAGE_SIZE_DEFAULT } from "../common/Config";
import { kill } from "process";

export class BonusRule extends React.Component {
  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
    this.onResize = this.onResize.bind(this);
    this.state = {};
  }

  componentDidMount() {
    EE.addListener("RESIZE", this.onResize);

    (async () => {
      const allImages = document.querySelectorAll(".carousel__image img");

      await Promise.all(
        [...allImages].map((img) => {
          return new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
          });
        })
      );

      const cont = document.getElementsByClassName(
        "modal-window-bonus__scale-cont"
      )[0];
      if (cont) {
        setTimeout(() => {
          cont.style.transform = `scale(0.8)`;
          EE.emit("FORCE_RESIZE");
        }, 100);
      }
    })();
  }


  onResize = (data) => {
    const cont = document.getElementsByClassName("modal-window-bonus__scale-cont")[0];
    if (!cont) return;

    const viewportWidth = data.w;
    const viewportHeight = data.h;
    const contentWidth = 1440; // Adjust this to match your actual content width
    const contentHeight = 950; // Adjust this to match your actual content height

    const scaleX = (viewportWidth * 0.8) / contentWidth;
    const scaleY = (viewportHeight * 0.8) / contentHeight;
    const scale = Math.min(scaleX, scaleY);

    cont.style.transform = `translate(-50%, -50%) scale(${scale})`;

    // Center the content
    cont.style.left = '50%';
    cont.style.top = '50%';
  }

  onClose() {
    const cont = document.getElementsByClassName(
      "modal-window-bonus__scale-cont"
    )[0];

    if (cont) {
      cont.style.transform = `scale(0)`;
    }

    setTimeout(() => {
      this.props.onClose();
    }, 300);

  }

  render() {
    return (
      <div className="modal-window-bonus-rule">
        <div className="modal-window-bonus__scale-cont">
          <img
            className="modal-window-bonus__close"
            onClick={this.onClose}
            src="images/frenzy/bonus_close_2.png"
            alt=""
          />

          <div className="carousel__image">
            <img
              draggable={false}
              src="images/frenzy/bonus/bonus_rule_bg.png"
              alt=""
              className="carousel__item"
            />
          </div>
          <div className="scrollbar-container">
            <img draggable={false} src={`images/frenzy/bonus/${this.props.isDaily ? "daily_rule" : "weekly_rule"}.png`} alt="" />
          </div>
        </div>
      </div>
    );
  }
}
