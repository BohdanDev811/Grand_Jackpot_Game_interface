import React from "react";
import { EE } from "../App";
import "../css/updatePopup.css";
import { PAGE_SIZE_DEFAULT } from "../common/Config";

export class UpdatePopupWin extends React.Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {};
    }

    componentDidMount() {
        EE.addListener("RESIZE", this.onResize);
        const backImg = document.getElementsByClassName(
            "modal-window-db_update-popup__back"
        )[0];

        backImg.onload = () => {
            EE.emit("FORCE_RESIZE");
        };
    }

    onResize(data) {
        const cont = document.getElementsByClassName(
            "modal-window-db_update-popup__scale-cont"
        )[0];
        const sc = Math.min(
            data.h / PAGE_SIZE_DEFAULT.height,
            data.w / PAGE_SIZE_DEFAULT.width
        );
        if (cont) {
            cont.style.transform = `scale(${sc})`;
            cont.style.opacity = `1`;
        }
    }

    handleClose() {
        const cont = document.getElementsByClassName(
            "modal-window-db_update-popup__scale-cont"
        )[0];

        if (cont) {
            cont.style.transform = `scale(0.7)`;
            cont.style.opacity = `0`;
        }

        setTimeout(() => {
            this.props.onClose();
            EE.emit("SHOW_LOGIN");
        }, 500);

    }

    handleClick() {
        console.log("clicked");
    }

    render() {
        return (
            <div className="modal-window-db_update-popup">
                <div className="modal-window-db_update-popup__scale-cont">
                    <img
                        className="modal-window-db_update-popup__back"
                        src="images/frenzy/updatePopup.png"
                        alt=""
                    />
                    <img
                        src="images/frenzy/bonus_close.png"
                        alt="register title"
                        className="modal-window-db_update-popup__cross_icon"
                        onClick={this.handleClose}
                    />

                    <div className="modal-window-db_update-popup__content-container">
                        <img
                            src="images/frenzy/update_btn.png"
                            alt="register title"
                            className="modal-window-db_update-popup__popup_btn"
                            onClick={this.handleClick}
                        />
                    </div>
                </div>
            </div>
        );
    }
}