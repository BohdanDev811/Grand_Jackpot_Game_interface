import * as PIXI from "pixi.js";
import { ButtonItem } from "../gui/ButtonItem";
import { EE } from "../../App";
import { gsap } from 'gsap';
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
	help: PIXI.Sprite = new PIXI.Sprite();
	remainder: any = new PIXI.Sprite();
	progressPanel: any = new PIXI.Sprite()
	dailyTab: any;
	weeklyTab: any;
	tabCenter: any = new PIXI.Sprite();

	HIDE_BONUS: any = null;
	state = { isDaily: true }

	constructor(hideBonus: any) {
		super();
		//
		this.HIDE_BONUS = hideBonus;
		this.onResize = this.onResize.bind(this);
		this.removed = this.removed.bind(this);
		this.build = this.build.bind(this);
		this.build();
	}


	private build() {
		// Black background
		this.addChild(this.black);
		this.black.beginFill(0x000000, 0.8).drawRect(0, 0, PAGE_SIZE_DEFAULT.width, PAGE_SIZE_DEFAULT.height).endFill();

		// Container setup
		this.cont = this.addChild(new PIXI.Sprite());
		this.conttitle = this.addChild(new PIXI.Sprite());

		// BonusLine
		this.line = this.conttitle.addChild(new BonusLine());
		this.line.x = -500;

		// Background
		this.back = this.cont.addChild(new PIXI.Sprite(PIXI.Texture.from("images/frenzy/bonus/bonus_bg.png")));
		this.back.x = -(PAGE_SIZE_DEFAULT.width / 2 - 100);
		this.back.width = PAGE_SIZE_DEFAULT.width - 200;
		this.back.height = PAGE_SIZE_DEFAULT.height - 200;

		// BonusData
		this.data = this.conttitle.addChild(new BonusData());
		this.data.x = -160;

		// RemainingTime
		this.remainder = this.conttitle.addChild(new RemainingTime());
		this.remainder.x = -160;
		this.remainder.y = 850;
		this.remainder.interactive = true;
		this.remainder.buttonMode = true;
		this.remainder.on('pointerdown', () => {
			EE.emit("BONUS_WIN_RANK");
		});

		// ProgressPanel
		this.progressPanel = this.line.addChild(new ProgressPanel());
		this.progressPanel.x = 900;
		this.progressPanel.y = -500;

		// Title
		this.title = this.addChild(new PIXI.Sprite(PIXI.Texture.from(`images/frenzy/bonus/${this.state.isDaily
			? "popup_title_daily"
			: "popup_title_weekly"}.png`)));
		this.title.x = 800;
		this.title.y = 110;
		this.title.width = 570;
		this.title.height = 130;
		this.title.interactive = true;
		this.title.buttonMode = true;
		this.title.on("pointerdown", () => {
			EE.emit(this.state.isDaily ? "DAILY_BONUS_WIN" : "WEEKLY_BONUS_WIN");
		});

		// Tabs
		this.dailyTab = new Tab(
			"images/frenzy/bonus/daily_tab_active.png",
			"images/frenzy/bonus/to_daily_tab.png",
			() => this.toggleTab(true)
		);
		this.data.addChild(this.dailyTab);
		this.dailyTab.y = -500;
		this.dailyTab.x = -PAGE_SIZE_DEFAULT.width / 2;

		this.weeklyTab = new Tab(
			"images/frenzy/bonus/weekly_tab_active.png",
			"images/frenzy/bonus/to_weekly_tab.png",
			() => this.toggleTab(false)
		);
		this.data.addChild(this.weeklyTab);
		this.weeklyTab.y = -500 + (this.state.isDaily ? 200 : 150) + 20;
		this.weeklyTab.x = -PAGE_SIZE_DEFAULT.width / 2;

		// Set initial active tab
		this.updateTabs();

		// Help Button
		this.help = this.conttitle.addChild(new ButtonItem("images/frenzy/bonus/help.png", () => {
			EE.emit(this.state.isDaily ? "DAILY_BONUS_RULE" : "WEEKLY_BONUS_RULE");
		}));
		this.help.x = (PAGE_SIZE_DEFAULT.width / 2) - 760;

		// Close Button
		this.close = this.data.addChild(new ButtonItem("images/frenzy/bonus_close.png", () => {
			if (this.HIDE_BONUS) this.HIDE_BONUS();
		}));
		this.close.x = (PAGE_SIZE_DEFAULT.width / 2) + 180;
		this.close.y = -(PAGE_SIZE_DEFAULT.height / 2 + 700);

		// Initialize Data
		const curday = 3;
		this.line.setStep(curday);
		this.data.setTotalCoin(327242.54);
		this.remainder.setUserCnt(101);
		this.progressPanel.setIsDaily(this.state.isDaily);
		this.progressPanel.setInput([4, 6000, 5000, 5000, 150])

		// Event Listeners
		EE.addListener("RESIZE", this.onResize);
		this.on('removed', this.removed);

		// Initial Resize
		EE.emit('FORCE_RESIZE');
	}

	private toggleTab(isDaily: boolean) {
		if (this.state.isDaily !== isDaily) {
			this.state.isDaily = isDaily;

			// Scale down the current active tab smoothly
			const activeTab = isDaily ? this.weeklyTab : this.dailyTab;
			const newTab = isDaily ? this.dailyTab : this.weeklyTab;

			gsap.to(activeTab.scale, { x: 0.95, y: 0.95, duration: 0.6, ease: "sine.inOut" });
			gsap.to(activeTab, { x: activeTab.x + 10, duration: 0.6, ease: "sine.inOut" }); // subtle shift

			// Scale up the new tab simultaneously
			newTab.scale.set(0.77); // Start smaller for the scale-in animation
			gsap.to(newTab.scale, { x: 1, y: 1, duration: 0.6, ease: "sine.inOut" });
			gsap.to(newTab, { x: newTab.x - 10, duration: 0.6, ease: "sine.inOut" }); // shift back

			// Update the tabs after the animations
			this.updateTabs();

			// Update other UI elements as necessary
			this.progressPanel.setIsDaily(this.state.isDaily);
			this.title.texture = PIXI.Texture.from(`images/frenzy/bonus/popup_title_${this.state.isDaily ? "daily" : "weekly"}.png`);
		}
	}

	private updateTabs() {
		this.dailyTab.setActive(this.state.isDaily);
		this.weeklyTab.setActive(!this.state.isDaily);
		// Position the weekly tab below the daily tab with a consistent space
		this.weeklyTab.y = -500 + (this.state.isDaily ? 200 : 150) + 20;
		// this.dailyTab.x = -PAGE_SIZE_DEFAULT.width / 2; // Set the x-position of the daily tab
		// this.weeklyTab.x = -PAGE_SIZE_DEFAULT.width / 2; // Set the x-position of the weekly tab
	}

	public setState(newState: any) {
		this.state = { ...this.state, ...newState };
		this.build();
	}

	private removed() {
		EE.removeListener("RESIZE", this.onResize);
		this.cont.removeChildren();
	}

	private onResize(data: any) {
		this.black.clear();
		this.black.beginFill(0x000000, 0.8).drawRect(0, 0, (data.w / data.scale), (data.h / data.scale)).endFill();
		this.conttitle.x = (data.w / data.scale) / 2;
		this.conttitle.y = 50;
		this.cont.x = (data.w / data.scale) / 2;
		this.cont.y = (data.h / data.scale) - 550;
		this.weeklyTab.x = -(data.w / data.scale)/2 +150;
		this.dailyTab.x = -(data.w / data.scale)/2 +150;
		this.back.y = -(data.h / data.scale) / 2 + 100;
		this.close.x = (data.w / data.scale) / 2 + 80;

		this.close.y = -(data.h / data.scale) / 2 - 100;
		this.line.y = (data.h / data.scale) / 2 - 80;
		this.data.y = (data.h / data.scale) / 2 + 75;
		this.button.y = (data.h / data.scale) / 2 + 130;
		this.progressPanel.x = (data.w / data.scale) / 2 - 100
		this.title.y = (data.h / data.scale) / 2 - 430;
		this.title.x = (data.w / data.scale) / 2 - 350;
		this.help.y = (data.h / data.scale) / 2 - 460;
		this.remainder.y = (data.h / data.scale) / 2 + 300;
		this.updateTabs();
	}

}


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
		this.setTotalCoin = this.setTotalCoin.bind(this);

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

		this.cont = this.addChild(new PIXI.Sprite());

		//background image for weekly task 
		const back = this.cont.addChild(new PIXI.Sprite(PIXI.Texture.from("images/frenzy/bonus/total_coin_bg.png")));
		back.x = -100;
		back.y = 120;
		back.width = 400
		back.height = 80

		this.task = this.cont.addChild(new PIXI.Text("", style));
		this.task.y = 10;

		this.setTotalCoin(1);
		this.on('removed ', this.removed);
	}

	setTotalCoin(num: number) {
		this.task.text = "0";
		this.task.x = - (this.task.width / 2) + 20;
		this.task.y = 131

		const tween = gsap.to({}, {
			duration: 1.5,
			ease: "power2.out",
			overwrite: true,
			onStart: () => {
				this.task.text = "0";
			},
			onUpdate: () => {
				const progress = tween.progress();
				const value = progress * num;
				this.task.text = value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
			}
		});
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
	targetTime: number = 234523445;

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

		this.task = this.cont.addChild(new PIXI.Text("-D, --:--:--", style));
		this.task.y = -13

		this.remain = this.cont.addChild(new PIXI.Text("", style));
		this.remain.y = -13

		this.setUserCnt(101)

		this.on('removed ', this.removed);
		const remainTime = setInterval(() => {
			if (this.targetTime <= 1000) clearInterval(remainTime)
			const days = Math.floor(this.targetTime / 1000 / 60 / 60 / 24);
			const hours = Math.floor(this.targetTime / 1000 / 60 / 60) % 24;
			const minutes = Math.floor(this.targetTime / 1000 / 60) % 60;
			const seconds = Math.floor(this.targetTime / 1000) % 60;
			this.setDay(`${days}D, ${hours < 10 ? ("0" + hours) : hours}:${minutes < 10 ? ("0" + minutes) : minutes}:${seconds < 10 ? ("0" + seconds) : seconds}`);
			this.targetTime -= 1000
		}, 1000);
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
	isDaily: boolean = false; // whether daily or weekly
	standard = {
		weekly: [24, 500, 300, 300, 5],
		daily: [4, 6000, 5000, 5000, 150]
	}
	input = [4, 400, 200, 300, 4]
	space = [163, 155, 155, 147, 0]
	back: PIXI.Sprite; // Declare back as PIXI.Sprite

	constructor() {
		super();
		this.removed = this.removed.bind(this);
		this.setIsDaily = this.setIsDaily.bind(this);
		this.setInput = this.setInput.bind(this);

		this.cont = new PIXI.Sprite();
		this.addChild(this.cont); // Add cont to the display list of ProgressPanel

		// Initialize back as PIXI.Sprite with initial texture
		this.back = new PIXI.Sprite(PIXI.Texture.from(`images/frenzy/bonus/${this.isDaily ? "daily" : "weekly"}_progress_bar.png`));
		this.back.width = 600;
		this.back.height = 1000;
		this.cont.addChild(this.back); // Add back to cont

		this.updateProgressBar();

		this.on('removed', this.removed);
	}

	updateProgressBar() {
		this.cont.removeChildren(); // Remove previous children (not necessary if you're updating)

		// Initialize back as PIXI.Sprite with initial texture
		this.back.texture = PIXI.Texture.from(`images/frenzy/bonus/${this.isDaily ? "daily" : "weekly"}_progress_bar.png`);
		this.back.width = 600;
		this.back.height = 1000;
		this.cont.addChild(this.back); // Add back to cont

		let _y = 237;
		for (let i = 0; i < 5; i++) {
			const total = this.standard[this.isDaily ? "daily" : "weekly"][i];
			const cur = this.input[i];

			const prog = Math.floor(cur / total * 10);
			const bar = new PIXI.Sprite(PIXI.Texture.from(`images/frenzy/bonus/${prog}.png`));
			bar.width = 0; // Initialize width to 0
			bar.height = 40;
			bar.x = 75;
			bar.y = _y;
			this.cont.addChild(bar);

			// Animate the progress bar
			gsap.to(bar, {
				width: cur / total * 225,
				duration: 0.5,
				ease: 'power2.out',
			});

			const status = new PIXI.Sprite(PIXI.Texture.from(`images/frenzy/bonus/${prog === 10 ? "btn_completed" : "btn_inprogress"}.png`));
			status.x = 350;
			status.y = _y - 40;
			status.width = 180;
			status.height = 65;
			this.cont.addChild(status);

			_y += this.space[i];
		}
	}

	setIsDaily(sort: boolean) {
		this.isDaily = sort;
		this.updateProgressBar();
	}

	setInput(num: number[]) {
		this.input = [...num];
		this.updateProgressBar();
	}

	removed() {
		this.cont.removeChildren();
	}
}


class Tab extends PIXI.Sprite {
	isActive: boolean;
	activeTexture: string;
	inactiveTexture: string;
	onClick: () => void;

	constructor(activeTexture: string, inactiveTexture: string, onClick: () => void) {
		super();
		this.activeTexture = activeTexture;
		this.inactiveTexture = inactiveTexture;
		this.onClick = onClick;
		this.isActive = false;

		this.interactive = true;
		this.buttonMode = true;
		this.on("pointerdown", this.handleClick);
		this.updateTexture();
	}

	handleClick() {
		this.onClick();
	}

	setActive(active: boolean) {
		this.isActive = active;
		this.updateTexture();
	}

	updateTexture() {
		this.texture = PIXI.Texture.from(this.isActive ? this.activeTexture : this.inactiveTexture);
	}
}