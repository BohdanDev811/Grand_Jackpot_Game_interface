import * as PIXI from "pixi.js";
import { ButtonItem } from "../gui/ButtonItem";
import { EE } from "../../App";
import { PAGE_SIZE_DEFAULT } from "../../common/Config";

export class BonusWheel extends PIXI.Sprite {
	title : PIXI.Sprite = new PIXI.Sprite();
	close: PIXI.Sprite = new PIXI.Sprite();
	black: PIXI.Graphics = new PIXI.Graphics();
	cont: PIXI.Sprite = new PIXI.Sprite();
	conttitle: PIXI.Sprite = new PIXI.Sprite();
	line: any = new PIXI.Sprite();
	button: PIXI.Sprite = new PIXI.Sprite();
	back: PIXI.Sprite = new PIXI.Sprite();
	data: any = new PIXI.Sprite();
	text2: PIXI.Sprite = new PIXI.Sprite();
	trunc: PIXI.Sprite = new PIXI.Sprite();

	HIDE_BONUS: any = null;

	constructor(hideBonus: any) {
		super();
		//
		this.HIDE_BONUS = hideBonus;
		this.onResize = this.onResize.bind(this);
		this.removed = this.removed.bind(this);
		this.build = this.build.bind(this);
		this.build();
	}

	async build() {

		this.title = this.addChild(new PIXI.Sprite(PIXI.Texture.from("images/frenzy/bonus/popup_title_daily.png")));
		this.title.x = -200;
		//
		this.addChild(this.black);
		this.cont = this.addChild(new PIXI.Sprite());
		this.conttitle = this.addChild(new PIXI.Sprite());

		this.line = this.conttitle.addChild(new BonusLine());
		this.line.x = -500;

		this.back = this.cont.addChild(new PIXI.Sprite(PIXI.Texture.from("images/frenzy/bonus/bonus_bg.png")));
		this.back.x = -([PAGE_SIZE_DEFAULT.width / 2 - 100]);
		this.back.width = PAGE_SIZE_DEFAULT.width - 200;
		this.back.height = PAGE_SIZE_DEFAULT.height - 200;

		// this.button = this.conttitle.addChild(new ButtonItem("images/frenzy/bonus_btn.png", () => {
		// 	alert('collect')
		// }));
		// this.button.x = -155;

		// this.trunc = this.conttitle.addChild(new Trunc());
		// this.trunc.x = -430;
		this.data = this.conttitle.addChild(new BonusData());
		this.data.x = -160;

		//detailed task for weeekly bonus
		this.text2 = this.conttitle.addChild(new PIXI.Sprite(PIXI.Texture.from("images/frenzy/bonus_text.png")));
		this.text2.x = -307;

		this.close = this.conttitle.addChild(new ButtonItem("images/frenzy/bonus_close.png", () => {
			if (this.HIDE_BONUS) this.HIDE_BONUS();
		}));
		this.close.x = (PAGE_SIZE_DEFAULT.width / 2) + 30;
		this.close.y = PAGE_SIZE_DEFAULT.height / 2 + 500

		//TODO:
		const curday = 3;
		this.line.setStep(curday);
		this.data.setDay(curday);

		EE.addListener("RESIZE", this.onResize);
		this.on('removed ', this.removed);
		//
		EE.emit('FORCE_RESIZE');
	}

	removed() {
		EE.removeListener("RESIZE", this.onResize);
		this.cont.removeChildren();
	}

	onResize(data: any) {
		this.black.clear();
		this.black.beginFill(0x000000, 0.8).drawRect(0, 0, (data.w / data.scale), (data.h / data.scale)).endFill();
		this.conttitle.x = (data.w / data.scale) / 2;
		this.conttitle.y = 50;
		this.cont.x = (data.w / data.scale) / 2;
		this.cont.y = (data.h / data.scale) - 550;
		this.back.y = -(data.h / data.scale) / 2 + 100;
		this.close.y = (data.h / data.scale) / 2 - 350;
		this.trunc.y = (data.h / data.scale) / 2 - 360;
		this.line.y = (data.h / data.scale) / 2 - 80;
		this.data.y = (data.h / data.scale) / 2 + 75;
		this.button.y = (data.h / data.scale) / 2 + 130;
		this.text2.y = (data.h / data.scale) / 2 + 260;
	}

}

/**
 * bonus box of jwelery
 */
// class Trunc extends PIXI.Sprite {
// 	cont: PIXI.Sprite;

// 	/**
// 	 * New tag icon
// 	 */
// 	constructor() {
// 		super();
// 		//
// 		this.cont = this.addChild(new PIXI.Sprite());
// 		const json0 = PIXI.Loader.shared.resources["images/frenzy/anim/trunc.json"].spritesheet;
// 		const array0: any = [];
// 		if (json0) {
// 			Object.keys(json0.textures).sort().forEach((key) => {
// 				array0.push(json0.textures[key]);
// 			});
// 		}

// 		const animate0 = new PIXI.AnimatedSprite(array0);
// 		animate0.animationSpeed = 0.2;
// 		animate0.loop = true;
// 		//animate0.y = -3;
// 		this.cont.addChild(animate0);
// 		animate0.play();

// 	}

// }

/**
 * Background of bonus stars
 */
class BonusLine extends PIXI.Sprite {
	cont: PIXI.Sprite;
	addItems: any = {};
	constructor() {
		super();
		this.removed = this.removed.bind(this);
		this.setStep = this.setStep.bind(this);
		//
		this.cont = this.addChild(new PIXI.Sprite());
		// this.cont.addChild(new PIXI.Sprite(PIXI.Texture.from("images/frenzy/bonus_back.png")));

		let xx = 50;
		for (let i = 0; i < 6; i++) {
			const itm = this.cont.addChild(new BonusItem());
			itm.y = 115;
			itm.x = xx;
			itm.width = 0.8;
			itm.height = 0.8;
			xx += 125;
			this.addItems[i + 1] = itm;
		}

		this.on('removed ', this.removed);
	}

	setStep(num: number) {
		for (let i = 1; i <= num; i++) {
			this.addItems[i].active();
		}
	}

	removed() {
		this.cont.removeChildren();
	}

}

/**
 * Bonus star class
 */
class BonusItem extends PIXI.Sprite {
	cont: PIXI.Sprite;
	state1: PIXI.Sprite;
	state2: PIXI.Sprite;

	constructor() {
		super();
		this.removed = this.removed.bind(this);
		this.active = this.active.bind(this);
		//

		this.cont = this.addChild(new PIXI.Sprite());
		//emptry bronze
		this.state1 = this.cont.addChild(new PIXI.Sprite(PIXI.Texture.from("images/frenzy/bonus/empty_bonus_star.png")));
		//filled bronze
		this.state2 = this.cont.addChild(new PIXI.Sprite(PIXI.Texture.from("images/frenzy/bonus/filled_bonus_star.png")));
		this.state2.visible = false;

		this.on('removed ', this.removed);
	}

	active() {
		this.state1.visible = false;
		this.state2.visible = true;
	}

	removed() {
		this.cont.removeChildren();
	}

}

/**
 * task for bonus with rounded background
 */
class BonusData extends PIXI.Sprite {
	cont: PIXI.Sprite;
	task: PIXI.Text;

	constructor() {
		super();
		this.removed = this.removed.bind(this);
		this.setDay = this.setDay.bind(this);

		const style = new PIXI.TextStyle({
			fontFamily: "Bronzier",
			fontSize: "33px",
			fill: [
				"#FFDDFD",
				"#FF64F6",
			],
			dropShadow: true,
			dropShadowBlur: 1,
			dropShadowColor: "#000000",
			dropShadowDistance: 3,
			align: "center",
		});
		//

		this.cont = this.addChild(new PIXI.Sprite());

		//background image for weekly task 👇
		const back = this.cont.addChild(new PIXI.Sprite(PIXI.Texture.from("images/frenzy/bonus_back_info.png")));
		back.x = 0;
		back.y = 0;

		this.task = this.cont.addChild(new PIXI.Text("", style));
		this.task.y = 10;

		this.setDay(1);

		this.on('removed ', this.removed);
	}

	setDay(num: number) {
		this.task.text = `Login For 7 Days (${num}/7)`;
		this.task.x = 165 - (this.task.width / 2);
	}

	removed() {
		//EE.removeListener("TICKER", this.onSelectWheelAnimate);
		this.cont.removeChildren();
	}

}