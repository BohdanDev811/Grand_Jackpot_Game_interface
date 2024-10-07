import * as PIXI from "pixi.js";
import {ButtonItem} from "../../gui/ButtonItem";
import {EE} from "../../../App";
//import {EE} from "../../../App";

export class Settings extends PIXI.Sprite {
    cont: PIXI.Sprite;

    constructor() {
        super();
        //
        this.cont = this.addChild(new PIXI.Sprite());
        this.cont.addChild(
            new PIXI.Sprite(PIXI.Texture.from("images/frenzy/settings2.png"))
        );

        this.cont.scale.set(0.7);
        this.cont.x = 120;

        const btnExit = this.cont.addChild(
            new ButtonItem("images/frenzy/right_menu4.png", () => {
                console.log("exit");
            })
        );
        btnExit.x = 350;
        btnExit.y = 28;
        btnExit.scale.set(0.9);

        const buttonSnd = this.cont.addChild(
            new ButtonItem("images/frenzy/right_menu2.png", () => {
                buttonSnd.visible = false;
                buttonSndOff.visible = true;
            })
        );
        buttonSnd.x = 74;
        buttonSnd.y = 30;
        buttonSnd.scale.set(0.9);

        const buttonSndOff = this.cont.addChild(
            new ButtonItem("images/frenzy/right_menu3.png", () => {
                buttonSnd.visible = true;
                buttonSndOff.visible = false;
            })
        );
        buttonSndOff.visible = false;
        buttonSndOff.x = 74;
        buttonSndOff.y = 30;
        buttonSndOff.scale.set(0.9);

        /*const buttonLetter = this.cont.addChild(new ButtonItem("images/frenzy/right_menu1.png", ()=>{
			EE.emit('SHOW_MAIL');
		}));
		buttonLetter.x = 250;
		buttonLetter.y = 23;
		buttonLetter.scale.set(0.9);*/

        const btnNews = this.cont.addChild(
            new ButtonItem("images/frenzy/right_menu5.png", () => {
                EE.emit("SHOW_NEWS");
            })
        );
        btnNews.x = 220;
        btnNews.y = 30;
        btnNews.scale.set(0.9);
    }
}
