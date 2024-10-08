import * as PIXI from "pixi.js";
import { ButtonItem } from "../gui/ButtonItem";
import { EE } from "../../App";
import { PAGE_SIZE_DEFAULT } from "../../common/Config";

export class BonusWheel extends PIXI.Sprite {
	title: PIXI.Sprite = new PIXI.Sprite();
	close: PIXI.Sprite = new PIXI.Sprite();
	black: PIXI.Graphics = new PIXI.Graphics();
	cont: PIXI.Sprite = new PIXI.Sprite();
	conttitle: any = new PIXI.Sprite();
	line: any = new PIXI.Sprite();
	button: PIXI.Sprite = new PIXI.Sprite();
	back: PIXI.Sprite = new PIXI.Sprite();
	data: any = new PIXI.Sprite();
	text2: PIXI.Sprite = new PIXI.Sprite();
	// trunc: PIXI.Sprite = new PIXI.Sprite();
	help: PIXI.Sprite = new PIXI.Sprite();
	remainder: any = new PIXI.Sprite();
	progressPanel: PIXI.Sprite = new PIXI.Sprite()
	dailyTab: any = new PIXI.Sprite()
	weeklyTab: any = new PIXI.Sprite()

	HIDE_BONUS: any = null;
	isDaily: boolean = false

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

		this.data = this.conttitle.addChild(new BonusData());
		this.data.x = -160;

		this.remainder = this.conttitle.addChild(new RemainingTime());
		this.remainder.x = -160;
		this.remainder.y = 850;

		this.progressPanel = this.line.addChild(new ProgressPanel);
		this.progressPanel.x = 900;
		this.progressPanel.y = -500

		this.title = this.addChild(new PIXI.Sprite(PIXI.Texture.from("images/frenzy/bonus/popup_title_daily.png")));
		this.title.x = 800;
		this.title.y = 110
		this.title.width = 570
		this.title.height = 130

		this.dailyTab = this.data.addChild(
			this.isDaily
				? new PIXI.Sprite(PIXI.Texture.from("images/frenzy/bonus/daily_tab_active.png"))
				: new ButtonItem("images/frenzy/bonus/to_daily_tab.png", () => {
					EE.emit("IS_DAILY", true)
					this.isDaily = true
				})
		)
		this.dailyTab.y = -200
		this.dailyTab.x = -PAGE_SIZE_DEFAULT.width / 2

		this.weeklyTab = this.data.addChild(
			!this.isDaily
				? new PIXI.Sprite(PIXI.Texture.from("images/frenzy/bonus/weekly_tab_active.png"))
				: new ButtonItem("images/frenzy/bonus/to_weekly_tab.png", () => {
					EE.emit("IS_DAILY", false)
					this.isDaily = false
				})
		)
		this.weeklyTab.y = 200
		this.weeklyTab.x = -PAGE_SIZE_DEFAULT.width / 2

		this.help = this.data.addChild(new ButtonItem("images/frenzy/bonus/help.png", () => {

		}))
		this.help.x = (PAGE_SIZE_DEFAULT.width / 2) - 610;


		this.close = this.data.addChild(new ButtonItem("images/frenzy/bonus_close.png", () => {
			if (this.HIDE_BONUS) this.HIDE_BONUS();
		}));

		this.close.x = (PAGE_SIZE_DEFAULT.width / 2) + 180;
		this.close.y = -(PAGE_SIZE_DEFAULT.height / 2 + 700)

		//TODO:
		const curday = 3;
		this.line.setStep(curday);
		this.data.setDay(327242.54);
		this.remainder.setUserCnt(101)

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
		this.close.y = -(data.h / data.scale) / 2 - 100;
		// this.trunc.y = (data.h / data.scale) / 2 - 360;
		this.line.y = (data.h / data.scale) / 2 - 80;
		this.data.y = (data.h / data.scale) / 2 + 75;
		this.button.y = (data.h / data.scale) / 2 + 130;
		// this.text2.y = (data.h / data.scale) / 2 + 260;
		this.title.y = (data.h / data.scale) / 2 - 430
		this.title.x = (data.w / data.scale) / 2 - 350
		// this.help.x = (data.w / data.scale) / 2 + 200
		this.help.y = -(data.h / data.scale) / 2 + 10
		this.remainder.y = (data.h / data.scale) / 2 + 300;

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
			itm.width = 0.7;
			itm.height = 0.7;
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
			fontSize: "53px",
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
		const back = this.cont.addChild(new PIXI.Sprite(PIXI.Texture.from("images/frenzy/bonus/total_coin_bg.png")));
		back.x = -100;
		back.y = 120;
		back.width = 400
		back.height = 80

		this.task = this.cont.addChild(new PIXI.Text("", style));
		this.task.y = 10;

		this.setDay(1);

		this.on('removed ', this.removed);
	}

	setDay(num: number) {
		this.task.text = `${num}`;
		this.task.x = - (this.task.width / 2) + 100;
		this.task.y = 131

	}

	removed() {
		//EE.removeListener("TICKER", this.onSelectWheelAnimate);
		this.cont.removeChildren();
	}

}


/**
 * Bar for remaining time
 */
class RemainingTime extends PIXI.Sprite {
	cont: PIXI.Sprite;
	task: PIXI.Text;
	remain: PIXI.Text;

	constructor() {
		super();
		this.removed = this.removed.bind(this);
		this.setDay = this.setDay.bind(this);
		this.setUserCnt = this.setUserCnt.bind(this);

		const style = new PIXI.TextStyle({
			fontFamily: "Bronzier",
			fontSize: "53px",
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
		const back = this.cont.addChild(new PIXI.Sprite(PIXI.Texture.from("images/frenzy/bonus/remaining_time_bg.png")));
		back.x = -185;
		back.y = -30;
		back.width = 600
		back.height = 90

		this.task = this.cont.addChild(new PIXI.Text("", style));
		this.task.y = -13

		this.remain = this.cont.addChild(new PIXI.Text("", style));
		this.remain.y = -13

		this.setDay("3D, 11:31:56");
		this.setUserCnt(101)

		this.on('removed ', this.removed);
	}

	setDay(num: String) {
		this.task.text = `${num}`;
		this.task.x = - (this.task.width / 2) + 50;

	}

	setUserCnt(num: Number) {
		this.remain.text = `${num}`
		this.remain.x = this.remain.width + 210
	}

	removed() {
		//EE.removeListener("TICKER", this.onSelectWheelAnimate);
		this.cont.removeChildren();
	}

}


/**
 * Bar for remaining time
 */
class ProgressPanel extends PIXI.Sprite {
	cont: PIXI.Sprite;
	isDaily: boolean = true; // whether daily or weekly
	standard = {
		weekly: [24, 500, 300, 300, 5],
		daily: [4, 6000, 5000, 5000, 150]
	}
	input = [4, 2500, 4600, 2500, 80]
	space = [163, 155, 155, 147, 0]

	constructor() {
		super();
		this.removed = this.removed.bind(this);
		this.setIsDaily = this.setIsDaily.bind(this);
		this.setInput = this.setInput.bind(this);

		// const style = new PIXI.TextStyle({
		// 	fontFamily: "Bronzier",
		// 	fontSize: "53px",
		// 	fill: [
		// 		"#FFDDFD",
		// 		"#FF64F6",
		// 	],
		// 	dropShadow: true,
		// 	dropShadowBlur: 1,
		// 	dropShadowColor: "#000000",
		// 	dropShadowDistance: 3,
		// 	align: "center",
		// });
		//

		this.cont = this.addChild(new PIXI.Sprite());

		//background image for weekly task 👇
		const back = this.cont.addChild(new PIXI.Sprite(PIXI.Texture.from(`images/frenzy/bonus/${this.isDaily ? "daily" : "weekly"}_progress_bar.png`)));
		back.width = 600
		// back.y = - 500
		back.height = 1000

		let _y = 237
		for (let i = 0; i < 5; i++) {
			const total = this.standard[this.isDaily ? "daily" : "weekly"][i];
			const cur = this.input[i]

			const prog = Math.floor(cur / total * 10)
			const bar = this.cont.addChild(new PIXI.Sprite(PIXI.Texture.from(`images/frenzy/bonus/${prog}.png`)))

			bar.width = cur / total * 225
			bar.height = 40
			bar.x = 75
			bar.y = _y

			const status = this.cont.addChild(new PIXI.Sprite(PIXI.Texture.from(`images/frenzy/bonus/${prog === 10 ? "btn_completed" : "btn_inprogress"}.png`)))
			status.x = 350
			status.y = _y - 40
			status.width = 180
			status.height = 65
			_y += this.space[i]
		}


		this.on('removed ', this.removed);
	}

	setInput(num: number[]) {
		this.input = [...num];
	}

	setIsDaily(sort: boolean) {
		this.isDaily = sort
	}

	removed() {
		//EE.removeListener("TICKER", this.onSelectWheelAnimate);
		this.cont.removeChildren();
	}

}