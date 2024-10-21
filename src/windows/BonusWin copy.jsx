import React from "react";
import { EE } from "../App";
import "../css/bonuswin.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { PAGE_SIZE_DEFAULT } from "../common/Config";

export class BonusWin extends React.Component {
  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
    this.state = {};
  }

  componentDidMount() {
    EE.addListener("RESIZE", this.onResize);

    (async () => {
      const allImages = document.querySelectorAll(".carousel__image img");

      console.log("before load");
      await Promise.all(
        [...allImages].map((img) => {
          return new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
          });
        })
      );
      console.log("after load");

      const cont = document.getElementsByClassName(
        "modal-window-bonus_win"
      )[0];
      if (cont) {
        setTimeout(() => {
          cont.style.transform = `scale(1)`;
          EE.emit("FORCE_RESIZE");
        }, 100);
      }
    })();
  }

  onResize(data) {
    const cont = document.getElementsByClassName(
      "modal-window-bonus_win"
    )[0];
    const sc = Math.min(
      data.h / PAGE_SIZE_DEFAULT.height,
      data.w / PAGE_SIZE_DEFAULT.width
    );
    if (cont) {
      cont.style.transform = `scale(${sc})`;
    }
  }

  onClose() {
    const cont = document.getElementsByClassName(
      "modal-window-bonus_win"
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
      <div className="modal-window-bonus-win">
        <div className="modal-window-bonus_win">
          <img
            className="modal-window-bonus-win_close"
            onClick={this.onClose}
            src="images/frenzy/bonus_close_2.png"
            alt=""
          />

          <div className="carousel__image">
            <img
              draggable={false}
              src={`images/frenzy/bonus/${this.props.isDaily ? "daily_bonus_win" : "weekly_bonus_win"}.png`}
              alt=""
              className="carousel__item"
            />
          </div>
        </div>
      </div>
    );
  }
}
