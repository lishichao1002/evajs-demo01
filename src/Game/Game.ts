import { GameObject, Scene } from "@eva/eva.js";
import { Img } from "@eva/plugin-renderer-img";
import { Event } from "@eva/plugin-renderer-event";
import { Transition } from "@eva/plugin-transition";

/**
 * 学习DEMO链接 https://store.eqxiu.com/gc/detail/1156034
 */
export class GameController {
  // 屏幕的宽高
  public static Full_Width = 750;
  public static Full_Height = 1484;
  // ⛰的宽高
  public static Mount_Width = 192;
  public static Mount_Height = 99;
  // ⛰的间距
  public static Mount_Gap = 10;
  // ⛰的移动速度
  public static Mount_Speed = 5;

  // 人的宽高
  public static Person_Width = 123;
  public static Person_Height = 143;
  // 跳跃的高度
  public static Person_Jump_Height = 200;

  // 所有的⛰
  //   private mounts: GameObject[] = [];
  //   // 当前活动的⛰
  //   private activeMount: GameObject;
  // 人
  private person: GameObject;
  private isJump = false;

  constructor(public scene: Scene) {}

  init() {
    this.initBg();
    this.initMount();
    this.initPerson();
    this.initTapEvent();
  }

  private initBg() {
    const imgGO = new GameObject("image", {
      size: {
        width: GameController.Full_Width,
        height: GameController.Full_Height,
      },
      origin: { x: 0, y: 0 },
    });
    imgGO.addComponent(
      new Img({
        resource: "bg1",
      })
    );
    this.scene.addChild(imgGO);
  }

  private initMount() {
    const imgGO = new GameObject("mount", {
      size: {
        width: GameController.Mount_Width,
        height: GameController.Mount_Height,
      },
      position: {
        x: (GameController.Full_Width - GameController.Mount_Width) / 2,
        y: GameController.Full_Height - GameController.Mount_Height,
      },
    });
    imgGO.addComponent(
      new Img({
        resource: "mount1",
      })
    );
    this.scene.addChild(imgGO);
  }

  private initPerson() {
    const {
      Full_Width,
      Full_Height,
      Person_Width,
      Person_Height,
      Mount_Height,
    } = GameController;
    const personGO = new GameObject("person", {
      size: {
        width: Person_Width,
        height: Person_Height,
      },
      position: {
        x: (Full_Width - Person_Width) / 2,
        y: Full_Height - Person_Height - Mount_Height,
      },
    });
    personGO.addComponent(
      new Img({
        resource: "person",
      })
    );
    this.person = personGO;
    this.scene.addChild(personGO);
  }

  private initTapEvent() {
    if (this.isJump) {
      return;
    }

    this.isJump = true;
    const event = this.scene.addComponent(new Event());
    event.on("tap", () => {
      const originY = this.person.transform.position.y;
      const animation = this.person.addComponent(new Transition());
      console.log(animation.name);
      animation.group = {
        jump: [
          {
            name: "position.y",
            component: this.person.transform,
            values: [
              {
                time: 0,
                value: originY,
                tween: "ease-out",
              },
              {
                time: 300,
                value: originY - GameController.Person_Jump_Height,
                tween: "ease-out",
              },
              {
                time: 600,
                value: originY,
                tween: "ease-out",
              },
            ],
          },
        ],
      };
      animation.play("jump", 1);
      animation.on("finish", (name) => {
        this.person.removeComponent(animation);
        this.isJump = false;
        console.log(name, "done");
      });
    });
  }
}
