import React from "react";
import { EE } from "./App";
import { LoginWin } from "./windows/LoginWin";
import { RegWin } from "./windows/RegWin";
import { FreePlayWin } from "./windows/FreePlayWin";
import { SignPhoneWin } from "./windows/SignPhoneWin";
import { InfoWin } from "./windows/InfoWin";
import { NewPassWin } from "./windows/NewPassWin";
import { MaintenenceWin } from "./windows/MaintenenceWin";
import { AdvWin } from "./windows/AdvWin";
import { NewsWin } from "./windows/NewsWin";
import { NewWebsiteWin } from "./windows/NewWebsite";
import { BonusWin } from "./windows/BonusWin";
import { UpdatePopupWin } from "./windows/UpdatePopupWin";
import { BonusRule } from "./windows/BonusRule";
import { BonusRank } from "./windows/BonusRank";

let PAGE_LOGIN = "PAGE_LOGIN";
let PAGE_REG = "PAGE_REG";
let PAGE_ADV = "PAGE_ADV";
let PAGE_FREE_PLAY = "PAGE_FREE_PLAY";
let PAGE_SIGNPHONE = "PAGE_SIGNPHONE";
let PAGE_INFO = "PAGE_INFO";
let PAGE_NPASS = "PAGE_NPASS";
let PAGE_MAINTEN = "PAGE_MAINTEN";
let PAGE_NEWS = "PAGE_NEWS";
let PAGE_NEW_WEBSITE = "PAGE_NEW_WEBSITE";
let PAGE_BONUS = "PAGE_BONUS";
let PAGE_UPDATE_POPUP = 'PAGE_UPDATE_POPUP';
let DAILY_BONUS_RULE = "DAILY_BONUS_RULE";
let WEEKLY_BONUS_RULE = "WEEKLY_BONUS_RULE";
let DAILY_BONUS_WIN = "DAILY_BONUS_WIN";
let WEEKLY_BONUS_WIN = "WEEKLY_BONUS_WIN";
let BONUS_WIN_RANK = "BONUS_WIN_RANK";

class TopWindows extends React.Component {
    constructor(props) {
        super(props);
        this.onCloseAll = this.onCloseAll.bind(this);
        this.goAddPhone = this.goAddPhone.bind(this);
        this.goOpenChangePass = this.goOpenChangePass.bind(this);
        this.state = {
            CURRENT_PAGE: "",
            data: "",
        };
        EE.addListener("CLEAR_TOP_WINDOWS", this.onCloseAll);
    }

    onCloseAll() {
        this.setState({ CURRENT_PAGE: "" });
    }

    componentDidMount() {
        EE.addListener("SHOW_ADV", () => {
            this.setState({ CURRENT_PAGE: PAGE_ADV });
        });
        EE.addListener("SHOW_REG", () => {
            this.setState({ CURRENT_PAGE: PAGE_REG });
        });
        EE.addListener("SHOW_FREE_PLAY", () => {
            this.setState({ CURRENT_PAGE: PAGE_FREE_PLAY });
        });
        EE.addListener("SHOW_LOGIN", () => {
            this.setState({ CURRENT_PAGE: PAGE_LOGIN });
        });
        EE.addListener("SHOW_MAINTEN", () => {
            this.setState({ CURRENT_PAGE: PAGE_MAINTEN });
        });
        EE.addListener("SHOW_SIGNPHONE", () => {
            this.setState({ CURRENT_PAGE: PAGE_SIGNPHONE });
        });
        EE.addListener("SHOW_INFO", () => {
            this.setState({ CURRENT_PAGE: PAGE_INFO });
        });
        EE.addListener("SHOW_NEWS", () => {
            this.setState({ CURRENT_PAGE: PAGE_NEWS });
        });
        EE.addListener("SHOW_NEW_WEBSITE", () => {
            this.setState({ CURRENT_PAGE: PAGE_NEW_WEBSITE });
        });
        EE.addListener("SHOW_NPASS", this.goOpenChangePass);
        EE.addListener("SHOW_BONUS", () => {
            this.setState({ CURRENT_PAGE: PAGE_BONUS });
        });
        EE.addListener("SHOW_UPDATE_POPUP", () => {
            this.setState({ CURRENT_PAGE: PAGE_UPDATE_POPUP });
        });

        EE.addListener("WEEKLY_BONUS_WIN", () => {
            this.setState({ CURRENT_PAGE: WEEKLY_BONUS_WIN });
        });

        EE.addListener("DAILY_BONUS_WIN", () => {
            this.setState({ CURRENT_PAGE: DAILY_BONUS_WIN });
        });

        EE.addListener("WEEKLY_BONUS_RULE", () => {
            this.setState({ CURRENT_PAGE: WEEKLY_BONUS_RULE });
        });

        EE.addListener("DAILY_BONUS_RULE", () => {
            this.setState({ CURRENT_PAGE: DAILY_BONUS_RULE });
        });

        EE.addListener("BONUS_WIN_RANK", () => {
            this.setState({ CURRENT_PAGE: BONUS_WIN_RANK });
        });
    }

    goOpenChangePass() {
        this.setState({ CURRENT_PAGE: PAGE_NPASS });
    }

    goAddPhone() {
        //this.setState({CURRENT_PAGE: PAGE_REG});
    }

    render() {
        return (
            <div className="modal-windows-cont">
                {this.state.CURRENT_PAGE === PAGE_ADV && (
                    <AdvWin onClose={this.onCloseAll} />
                )}
                {this.state.CURRENT_PAGE === PAGE_REG && (
                    <RegWin onClose={this.onCloseAll} />
                )}
                {this.state.CURRENT_PAGE === PAGE_LOGIN && (
                    <LoginWin onClose={this.onCloseAll} />
                )}
                {this.state.CURRENT_PAGE === PAGE_MAINTEN && <MaintenenceWin />}
                {this.state.CURRENT_PAGE === PAGE_FREE_PLAY && (
                    <FreePlayWin onClose={this.onCloseAll} />
                )}
                {this.state.CURRENT_PAGE === PAGE_SIGNPHONE && (
                    <SignPhoneWin onClose={this.onCloseAll} />
                )}
                {this.state.CURRENT_PAGE === PAGE_INFO && (
                    <InfoWin
                        onClose={this.onCloseAll}
                        goChangePass={this.goOpenChangePass}
                        goAddPhone={this.goAddPhone}
                    />
                )}
                {this.state.CURRENT_PAGE === PAGE_NPASS && (
                    <NewPassWin onClose={this.onCloseAll} />
                )}
                {this.state.CURRENT_PAGE === PAGE_NEWS && (
                    <NewsWin onClose={this.onCloseAll} />
                )}
                {this.state.CURRENT_PAGE === PAGE_NEW_WEBSITE && (
                    <NewWebsiteWin onClose={this.onCloseAll} />
                )}
                {this.state.CURRENT_PAGE === PAGE_BONUS && (
                    <BonusWin onClose={this.onCloseAll} />
                )}
                {this.state.CURRENT_PAGE === PAGE_UPDATE_POPUP && (
                    <UpdatePopupWin onClose={this.onCloseAll} />
                )}
                {this.state.CURRENT_PAGE === BONUS_WIN_RANK && (
                    <BonusRank onClose={this.onCloseAll} />
                )}
                {(this.state.CURRENT_PAGE === DAILY_BONUS_RULE || this.state.CURRENT_PAGE === WEEKLY_BONUS_RULE) && (
                    <BonusRule isDaily={this.state.CURRENT_PAGE === DAILY_BONUS_RULE} onClose={this.onCloseAll} />
                )}
                {console.log(this.state.CURRENT_PAGE)}
                {(this.state.CURRENT_PAGE === DAILY_BONUS_WIN || this.state.CURRENT_PAGE === WEEKLY_BONUS_WIN) && (
                    <BonusWin isDaily={this.state.CURRENT_PAGE === DAILY_BONUS_WIN} onClose={this.onCloseAll} />
                )}
            </div>
        );
    }
}

export default TopWindows;
