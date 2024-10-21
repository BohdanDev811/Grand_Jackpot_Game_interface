import React from "react";
import { EE } from "../App";
import "../css/bonuswin.css";
import { PAGE_SIZE_DEFAULT } from "../common/Config";

export class BonusWin extends React.Component {
  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.int);
  }

  componentDidMount() {
    EE.addListener("RESIZE", this.onResize);
    EE.emit("FORCE_RESIZE");
  }

  onResize(data) {
    const cont = document.getElementsByClassName(
      "modal-window-bonus-win-cont"
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
    this.props.onClose();
  }

  render() {
    return (
      <div className="modal-window-bonuswin">
        <div className="modal-window-bonus-win-cont">
          <img
            draggable={false}
            src={`images/frenzy/bonus/${this.props.isDaily ? "daily_bonus_win" : "weekly_bonus_win"}.png`}
            alt=""
            className="carousel__item"
          />
          <img
            className="modal-window-bonus-win-close"
            onClick={this.onClose}
            src="images/frenzy/bonus_close_2.png"
            alt=""
          />
        </div>
      </div>
    );
  }
}
