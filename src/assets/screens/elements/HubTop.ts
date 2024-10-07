import * as PIXI from "pixi.js";
import {EE} from "../../../App";
import {Settings} from "./HubRight";

export class HubTop extends PIXI.Sprite {
    cont: PIXI.Sprite;
    back: PIXI.Sprite = new PIXI.Sprite();

    constructor() {
        super();
        //
        this.cont = this.addChild(new PIXI.Sprite());
        this.back = this.cont.addChild(new TopBack());

        this.onResize = this.onResize.bind(this);

        EE.addListener("RESIZE", this.onResize);
        EE.emit("FORCE_RESIZE");
    }

    onResize(_data: any) {
        //const spaceX = (data.w/data.scale) - PAGE_SIZE_DEFAULT.width;
        //this.back.width = (data.w/data.scale);
        //this.frame_ex1.width = this.frame_ex2.width = spaceX/2;
        //this.frame_ex2.x = (data.w/data.scale) - spaceX/2;
    }
}

class TopBack extends PIXI.Sprite {
    contL: PIXI.Sprite = new PIXI.Sprite();
    contR: PIXI.Sprite = new PIXI.Sprite();
    contC: PIXI.Sprite = new PIXI.Sprite();
    user: PIXI.Sprite = new PIXI.Sprite();
    settings: PIXI.Sprite = new PIXI.Sprite();

    constructor() {
        super();
        const styletext = new PIXI.TextStyle({
            fontFamily: "Bronzier",
            fontSize: "52px",
            fill: ["#FFF997", "#CB9F00", "#FFF997"],
            dropShadow: true,
            dropShadowBlur: 2,
            dropShadowColor: "#000000",
            dropShadowDistance: 4,
            align: "center",
        });

        this.contL = this.addChild(
            new PIXI.Sprite(PIXI.Texture.from("images/frenzy/top_l.png"))
        );
        this.contR = this.addChild(
            new PIXI.Sprite(PIXI.Texture.from("images/frenzy/top_r.png"))
        );
        this.contC = this.addChild(
            new PIXI.Sprite(PIXI.Texture.from("images/frenzy/top_c.png"))
        );

        const jackpot = this.contC.addChild(
            new PIXI.Text("$88779900", styletext)
        );
        jackpot.x = 315 - jackpot.width / 2;
        jackpot.y = 53;

        this.user = this.contC.addChild(new UserBlock());
        this.user.y = 45;
        this.user.x = -450;

        this.settings = this.contC.addChild(new Settings());
        this.settings.y = 0;
        this.settings.x = 750;

        this.onResize = this.onResize.bind(this);
        //
        EE.addListener("RESIZE", this.onResize);
        EE.emit("FORCE_RESIZE");
    }

    onResize(_data: any) {
        this.contC.x = _data.w / _data.scale / 2 - 292;
        this.contL.x = 0;
        this.contR.x = _data.w / _data.scale / 2 + 292;
        this.contL.width = this.contR.width = (_data.w / _data.scale - 584) / 2;
    }
}
export class Frame extends PIXI.Sprite {
    cont: PIXI.Sprite;
    animate: PIXI.AnimatedSprite;
    constructor() {
        super();
        //
        this.cont = this.addChild(new PIXI.Sprite());
        //
        this.play = this.play.bind(this);
        //
        const json0 =
            PIXI.Loader.shared.resources["images/anim/frame_up.json"]
                .spritesheet;
        const array0: any = [];
        if (json0) {
            Object.keys(json0.textures)
                .sort()
                .forEach((key) => {
                    array0.push(json0.textures[key]);
                });
        }

        this.animate = new PIXI.AnimatedSprite(array0);
        this.animate.animationSpeed = 0.5;
        this.animate.loop = true;
        this.cont.addChild(this.animate);
        this.animate.gotoAndPlay(1);
    }

    play() {
        this.animate.gotoAndPlay(1);
    }
}

class UserBlock extends PIXI.Sprite {
    cont: PIXI.Sprite;
    constructor() {
        super();
        const styletext = new PIXI.TextStyle({
            fontFamily: "Bronzier",
            fontSize: "27px",
            fill: ["#ffffff", "#FCD13D"],
            dropShadow: true,
            dropShadowBlur: 1,
            dropShadowColor: "#000000",
            dropShadowDistance: 3,
            align: "center",
        });

        const styletext2 = new PIXI.TextStyle({
            fontFamily: "Bronzier",
            fontSize: "28px",
            fill: ["#EED9FF", "#DFB7FF"],
            dropShadow: true,
            dropShadowBlur: 2,
            dropShadowColor: "#000000",
            dropShadowDistance: 2,
            align: "center",
        });
        //
        this.cont = this.addChild(new PIXI.Sprite());
        //
        const json0 =
            PIXI.Loader.shared.resources["images/frenzy/anim/user.json"]
                .spritesheet;
        const array0: any = [];
        if (json0) {
            Object.keys(json0.textures)
                .sort()
                .forEach((key) => {
                    array0.push(json0.textures[key]);
                });
        }

        const animate = new PIXI.AnimatedSprite(array0);
        animate.animationSpeed = 0.3;
        animate.loop = true;
        animate.y = -55;
        animate.x = -47;
        animate.scale.set(0.95);
        this.cont.addChild(animate);
        animate.gotoAndPlay(1);
        //
        const nameuser = this.cont.addChild(
            new PIXI.Text("USER NAME", styletext)
        );
        nameuser.x = 190 - nameuser.width / 2;
        nameuser.y = -15;

        const moneyuser = this.cont.addChild(
            new PIXI.Text("99999.55", styletext2)
        );
        moneyuser.x = 195 - moneyuser.width / 2;
        moneyuser.y = 20;
        //
        this.cont.interactive = true;
        this.cont.buttonMode = true;
        this.cont.on("pointerdown", () => {
            EE.emit("SHOW_INFO");
        });
    }
}
