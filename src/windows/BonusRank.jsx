import React from "react";
import { EE } from "../App";
import "../css/bonusrank.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// import Slider from "react-slick";
import { PAGE_SIZE_DEFAULT } from "../common/Config";

export class BonusRank extends React.Component {
  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
    this.state = {
      rankList: [
        { id: 1, rank: 1, name: "BigDog23", score: 100, pic: null },
        { id: 2, rank: 2, name: "BlackBear", score: 90, pic: null },
        { id: 3, rank: 3, name: "Tiger", score: 80, pic: null },
        { id: 4, rank: 4, name: "Jeus K", score: 70, pic: null },
        { id: 5, rank: 5, name: "Elsa B", score: 60, pic: null },
      ]
    };
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
        "modal-window-bonus-rank"
      )[0];
      if (cont) {
        setTimeout(() => {
          cont.style.transform = `scale(0.8)`;
          EE.emit("FORCE_RESIZE");
        }, 100);
      }
    })();
  }

  onResize(data) {
    const cont = document.getElementsByClassName(
      "modal-window-bonus-rank"
    )[0];
    const sc = Math.min(
      data.h / PAGE_SIZE_DEFAULT.height,
      data.w / PAGE_SIZE_DEFAULT.width
    );
    if (cont) {
      cont.style.transform = `scale(${sc * 0.8})`;
    }
  }

  onClose() {
    const cont = document.getElementsByClassName(
      "modal-window-bonus-rank"
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
      <div className="modal-window-bonus">
        <div className="modal-window-bonus-rank">
          <img
            className="modal-window-bonus-rank-close"
            onClick={this.onClose}
            src="images/frenzy/bonus_close_2.png"
            alt=""
          />

          <div className="carousel__image">
            <img className="rank-bg" src="images/frenzy/bonus/rank_bg.png" alt="" />
            <div className="rank-wrapper">

              {this.state.rankList.map((user, idx) =>
                <div className="rank-control">
                  <img className="rank-bg" draggable={false} src={`images/frenzy/bonus/rank_${user.rank}.png`} alt="" />
                  <div className="user-container">
                    <img className="user-pic" src={`images/frenzy/bonus/${user.pic ? user.pic : "default_avatar.png"}`} alt="" />
                    <span>{user.name}</span>
                  </div>
                </div>)}

            </div>
          </div>
        </div>
      </div>
    );
  }
}
