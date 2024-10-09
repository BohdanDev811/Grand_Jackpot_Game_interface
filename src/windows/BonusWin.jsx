import React from "react";
import { EE } from "../App";
import "../css/bonuswin.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Stage, Container, Sprite, Text } from '@pixi/react';

import Slider from "react-slick";
import { PAGE_SIZE_DEFAULT } from "../common/Config";

export class BonusWin extends React.Component {
  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
    this.state = { DailyTab: true };
  }

  componentDidMount() {
    EE.addListener("RESIZE", this.onResize);

    (async () => {
      const allImages = document.querySelectorAll(".modal-window-bonus-tab img");

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
        "bonus-mask"
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
    // console.log(data, "this is props??")
    const cont = document.getElementsByClassName(
      "bonus-mask"
    )[0];
    const container = document.querySelector(".modal-window-bonus")

    const sc = Math.min(
      data.h / PAGE_SIZE_DEFAULT.height,
      data.w / PAGE_SIZE_DEFAULT.width
    );

    if (cont) {
      cont.style.transform = `scale(${sc})`;
      cont.width = data.w
      cont.height = data.h
      cont.setAttribute("style", `width:${data.w}px; height:${data.h}px, transform:scale(${sc})`)
    }

  }

  onClose() {
    const cont = document.getElementsByClassName(
      "bonus-mask"
    )[0];

    if (cont) {
      cont.style.transform = `scale(0)`;
    }

    setTimeout(() => {
      this.props.onClose();
    }, 300);
  }

  render() {
    return (<div>
      {/* // <div className="modal-window-bonus" > */}
        {/*//   <div className="modal-window-bonus-tab">
      //     <img src="images/frenzy/bonus/daily_tab_active.png" alt="" />
      //     <img className="tab-transition" src="images/frenzy/bonus/to_weekly_tab.png" alt="" />
      //   </div>
      //   <div className="modal-window-bonus__scale-cont"> */}
        {/* <img className="modal-window-bonus__close" onClick={this.onClose} src="images/frenzy/bonus_close_2.png" alt="" /> */}
        {/* 
      //               <div className="carousel__image">
      //                   <img
      //                       src="images/frenzy/bonus_img_1.png"
      //                       alt=""
      //                       className="carousel__item"
      //                   />
      //               </div> */}
        {/* //   </div> */}
        {/* <Stage className="bonus-mask"
          options={{ backgroundColor: 0x000000, backgroundAlpha: 0.5 }} style={{ position: "fixed", left: 0, width: "auto", transform: "scale(0)" }}>
          <Sprite image={"images/frenzy/bonus/daily_tab_active.png"} x={200}
            y={270}
            anchor={{ x: 0, y: 0.5 }} />
        </Stage> */}
      {/* // </div> */}
      </div>
    );
  }
}
