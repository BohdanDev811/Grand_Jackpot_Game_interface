import React from 'react';
import { EE } from '../App';
import '../css/login.css';
import $ from 'jquery';
import {PAGE_SIZE_DEFAULT} from "../common/Config";
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import {isMobile} from "../common/Utils";

const logoimages = [
	"images/frenzy/login/logo/logo0001.png",
	"images/frenzy/login/logo/logo0002.png",
	"images/frenzy/login/logo/logo0003.png",
	"images/frenzy/login/logo/logo0004.png",
	"images/frenzy/login/logo/logo0005.png",
	"images/frenzy/login/logo/logo0006.png",
	"images/frenzy/login/logo/logo0007.png",
	"images/frenzy/login/logo/logo0008.png",
	"images/frenzy/login/logo/logo0009.png",
	"images/frenzy/login/logo/logo0010.png",
	"images/frenzy/login/logo/logo0011.png",
	"images/frenzy/login/logo/logo0012.png",
	"images/frenzy/login/logo/logo0013.png",
	"images/frenzy/login/logo/logo0014.png",
	"images/frenzy/login/logo/logo0015.png",
	"images/frenzy/login/logo/logo0016.png",
	"images/frenzy/login/logo/logo0017.png",
	"images/frenzy/login/logo/logo0018.png",
	"images/frenzy/login/logo/logo0019.png",
	"images/frenzy/login/logo/logo0020.png",
	"images/frenzy/login/logo/logo0021.png",
	"images/frenzy/login/logo/logo0022.png",
	"images/frenzy/login/logo/logo0023.png",
	"images/frenzy/login/logo/logo0024.png",
	"images/frenzy/login/logo/logo0025.png",
	"images/frenzy/login/logo/logo0026.png",
	"images/frenzy/login/logo/logo0027.png",
	"images/frenzy/login/logo/logo0028.png",
	"images/frenzy/login/logo/logo0029.png",
	"images/frenzy/login/logo/logo0030.png",
	"images/frenzy/login/logo/logo0031.png",
	"images/frenzy/login/logo/logo0032.png",

];

export class LoginWin extends React.Component {
	int = 0;
	i=0;
	keyboard = null;
	constructor() {
		super();
		this.animateLogo = this.animateLogo.bind(this);
		//
		this.handleFocusId = this.handleFocusId.bind(this);
		this.handleFocusPass = this.handleFocusPass.bind(this);
		this.onChangeId = this.onChangeId.bind(this);
		this.onChangePass = this.onChangePass.bind(this);
		this.onKeyPress = this.onKeyPress.bind(this);
		this.onChange = this.onChange.bind(this);
		this.refId = React.createRef();
		this.refPass = React.createRef();
		this.state = {
			keyboardVisible: false,
			inputNode: null,
			layoutName: "default",
			inputId: "",
			inputPass: "",
		}
	}

	componentWillUnmount() {
		clearInterval(this.int);
	}

	componentDidMount() {
		EE.addListener("RESIZE", this.onResize);
		EE.emit("FORCE_RESIZE");
		this.int = setInterval(this.animateLogo, 50);
		//
		//preinput
		/*const id = $('.modal-window-login__text-id')[0];
		const pass = $('.modal-window-login__text-pass')[0];
		id.value = 'some id';
		pass.value = 'some pass';*/
	}

	animateLogo() {
		const img = document.getElementById("logo-login");
		if(img) {
			img.src = logoimages[this.i];
			this.i++;
			if (logoimages.length === this.i) {
				this.i = 0;
			}
		}
	}

	onResize(data) {
		const cont = document.getElementsByClassName("modal-window-login__scale-cont")[0];
		const sc = Math.min(data.h/PAGE_SIZE_DEFAULT.height, data.w/PAGE_SIZE_DEFAULT.width);
		if(cont) {
			cont.style.transform = `scale(${sc})`;
		}
	}

	goLogin() {
		const id = $('.modal-window-login__text-id')[0];
		const pass = $('.modal-window-login__text-pass')[0];
		const rem_obj = $('.modal-window-login__check')[0];
		const remember = (rem_obj.style.opacity==="1" || rem_obj.style.opacity==="");
		console.log(id.value, pass.value, 'remember=', remember);
		EE.emit('GO_GAME');
	}

	onInput(e) {
		if (e.target.value.length > 30) {
			e.target.value = e.target.value.slice(0,30);
		}
	}

	checkRem(e) {
		e.target.style.transition = "0.5s";
		e.target.style.opacity = (e.target.style.opacity==="0"?"1":"0");
	}

	goFreeplay() {
		EE.emit('SHOW_FREE_PLAY');
	}

	handleFocusId() {
		const kb = document.getElementsByClassName('game-keyboard')[0];
		if(kb) {
			kb.style.top = '178px';
		}
		this.setState({
			inputNode: this.refId,
			keyboardVisible: true
		});
		if(this.keyboard) this.keyboard.setInput(this.state.inputId);
	}

	handleFocusPass() {
		const kb = document.getElementsByClassName('game-keyboard')[0];
		if(kb) {
			kb.style.top = '284px';
		}
		this.setState({
			inputNode: this.refPass,
			keyboardVisible: true
		});
		if(this.keyboard) this.keyboard.setInput(this.state.inputPass);
	}

	handleShift() {
		const layoutName = this.state.layoutName;

		this.setState({
			layoutName: layoutName === "default" ? "shift" : "default"
		});
	}

	onKeyPress(button) {
		switch (button) {
			case '{shift}':
			case '{lock}':
				this.handleShift();
				break;
			case '{enter}':
				if(this.state.inputNode===this.refId) {
					this.handleFocusPass();
					return;
				}
				this.goLogin();
				break;
		}
	}

	onChange(input) {
		//this.setState({ input });
		switch (this.state.inputNode) {
			case this.refId:
				this.setState({ inputId:input });
				break;
			case this.refPass:
				this.setState({ inputPass:input });
				break;
		}
	}

	onChangeId(event) {
		const inputId = event.target.value;
		this.setState({ inputId });
		if(this.keyboard) this.keyboard.setInput(inputId);
	}

	onChangePass(event) {
		const inputPass = event.target.value;
		this.setState({ inputPass });
		if(this.keyboard) this.keyboard.setInput(inputPass);
	}

	render () {
		return (
			<div className="modal-window-login">
				<div className="modal-window-login__scale-cont">
					<div className="modal-window-login__logo">
						<img className="modal-window-login__logo1" src="" id={"logo-login"} alt=""/>
					</div>
					<div className="modal-window-login__down">
						<input className="modal-window-login__text-id modal-window-login__fields"
									 value={this.state.inputId}
									 type="text"
									 onInput={this.onInput}
									 onFocus={this.handleFocusId}
									 onChange={this.onChangeId}
									 ref={this.refId}
									 placeholder={'input id'}
						/>
						<input className="modal-window-login__text-pass modal-window-login__fields"
									 value={this.state.inputPass}
									 type="password"
									 onInput={this.onInput}
									 onFocus={this.handleFocusPass}
									 onChange={this.onChangePass}
									 ref={this.refPass}
									 placeholder={'input password'}
						/>
						<img className="modal-window-login__check" onClick={this.checkRem} src="images/frenzy/login/pip.png" alt=""/>
						<img className="modal-window-login__login modal-window-login__btn game-button" onClick={this.goLogin} src="images/frenzy/login/login_btn.png" alt=""/>
						<img className="modal-window-login__fplay modal-window-login__btn game-button" onClick={this.goFreeplay} src="images/frenzy/login/free_btn.png" alt=""/>
						<img className="modal-window-login__back" src="images/frenzy/login/back.png" id={"back-login"}  alt=""/>
						<div className={`game-keyboard ${(this.state.keyboardVisible?'game-keyboard-on':'game-keyboard-off')}`}>
							{isMobile?'':
								<Keyboard
									keyboardRef={r => (this.keyboard = r)}
									layoutName={this.state.layoutName}
									onChange={this.onChange}
									onKeyPress={this.onKeyPress}
								/>}
						</div>
					</div>
				</div>
				<div className="modal-window-fill-backevent"
						 onClick={(e)=>this.setState({keyboardVisible: false})}
				/>
			</div>
		)
	}
}