import * as PIXI from "pixi.js";
import { GameItemType } from "../../common/types";
import {MAX_COUNT_COLUMN, WIDTH_COLUMN} from "../../common/Config";
import {HotTag} from "./HotTag";
import {NewTag} from "./NewTag";

const mask:{x:number,y:number }[] = [{x:17, y:23},		{x:34, y:9},		{x:264, y:9},	{x:277, y:23},		{x:278, y:483},		{x:265, y:498},		{x:35, y:498},		{x:18, y:483},		{x:17, y:23}	];

export class Icon2 extends PIXI.Sprite{
	cont:PIXI.Sprite;
	piccont:PIXI.Sprite;
	contfav:PIXI.Sprite;
	_page:number = 0;
	_data:any = {};
	_column:number = 0;

	/**
	 * Big game icon
	 * @param data	game data object
	 */
	constructor(data:GameItemType) {
		super();
		//
		this.cont = this.addChild(new PIXI.Sprite());
		this.contfav = this.addChild(new PIXI.Sprite());
		//
		this.piccont = this.cont.addChild(new PIXI.Sprite());
		const back = this.cont.addChildAt(new PIXI.Graphics(), 0).beginFill(0x006600, 1).moveTo(mask[0].x,mask[0].y)
		for(let i=1;i<mask.length;i++) {
			back.lineTo(mask[i].x,mask[i].y);
		}
		back.lineTo(mask[0].x,mask[0].y);
		back.endFill();
		//
		this.piccont.mask =	back;
		const img = this.piccont.addChild(PIXI.Sprite.from("pic.png"));
		img.x = 17;
		img.y = 9;
		//
		/*const frame = this.cont.addChild(PIXI.Sprite.from("images/frenzy/icon1.png"));
		frame.x = 0;
		frame.y = 0;*/
		const json0 = PIXI.Loader.shared.resources["images/frenzy/anim/icon.json"].spritesheet;
		const array0:any = [];
		if(json0) {
			Object.keys(json0.textures).sort().forEach((key) => {
				array0.push(json0.textures[key]);
			});
		}

		const animate = new PIXI.AnimatedSprite(array0);
		animate.animationSpeed = 0.3;
		animate.loop = true;
		animate.x = -75;
		animate.y = -57;
		this.cont.addChild(animate);
		animate.gotoAndPlay(1);
		//
		const fav1 = this.contfav.addChild(new PIXI.Sprite(PIXI.Texture.from("images/frenzy/fav1.png")));
		fav1.x = 225;
		fav1.y = 5;
		const fav2 = this.contfav.addChild(new PIXI.Sprite(PIXI.Texture.from("images/frenzy/fav2.png")));
		fav2.interactive = true;
		fav2.buttonMode = true;
		fav2.x = 225;
		fav2.y = 5;
		fav2.alpha = 0;
		//
		function clickFav() {
			if(fav2.alpha === 0) {
				console.log('id game '+data.id+' add favorite!')
			} else {
				console.log('id game '+data.id+' remove favorite!')
			}
			fav2.alpha = (fav2.alpha===0?1:0);
		}
		fav2.on('click', clickFav);
		fav2.on('tap', clickFav);
		//
		//check hot tag
		if(data.tag==="hot") {
			const hot = this.cont.addChild(new HotTag());
			hot.x = -10;
			hot.y = -10;
		}
		//check new tag
		if(data.tag==="new") {
			const newicon = this.cont.addChild(new NewTag());
			newicon.x = -10;
			newicon.y = -10;
		}
		//
		let stX = 0;
		const mc = this;
		function tapDown(e:any) {
			stX = mc.position.x - e.data.originalEvent.pageX;
		}
		function tapUp(e:any) {
			const endX = mc.position.x - e.data.originalEvent.pageX;
			if(endX > (stX - 10) && endX < (stX + 10)) {
				console.log(data.id);
			}
		}
		this.cont.on('touchstart', tapDown);
		this.cont.on('pointerdown', tapDown);
		this.cont.on('pointerup', tapUp);
		this.cont.on('touchend', tapUp);
		//
		this.cont.interactive = true;
		this.cont.buttonMode = true;

	}

	set column(val:number) {
		this._column = val;
		this.page = Math.ceil(val/MAX_COUNT_COLUMN);
		let real_col = val%MAX_COUNT_COLUMN;
		if(real_col===0) real_col = MAX_COUNT_COLUMN;
		this.x = (real_col-1)*WIDTH_COLUMN+30;
	}

	get column() {
		return this._column;
	}

	set page(val:number) {
		this._page = val;
	}

	get page() {
		return this._page;
	}

}
