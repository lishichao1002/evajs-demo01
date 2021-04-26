import { Component, GameObject } from "@eva/eva.js";
import { Img } from "@eva/plugin-renderer-img";
import { Event } from "@eva/plugin-renderer-event";
import { Transition } from "@eva/plugin-transition";
import {
  Full_Height,
  Full_Width,
  Mount_Gap,
  Mount_Height,
  Mount_Width,
  Person_Height,
  Person_Jump_Height,
  Person_Width,
} from "./const";

export class GameComponent extends Component {
  // 人
  private person: GameObject;
  private isJump = false;

  // ⛰
  private activeMount: GameObject;
  private mounts: GameObject[] = [];

  init() {
    this.initMount();
    this.initPerson();
    this.initTapEvent();
  }

  private initMount() {
    const mount = new GameObject("mount", {
      size: {
        width: Mount_Width,
        height: Mount_Height,
      },
      position: {
        x: (Full_Width - Mount_Width) / 2,
        y: Full_Height - Mount_Height,
      },
    });
    mount.addComponent(
      new Img({
        resource: "mount1",
      })
    );
    this.addChild(mount);
    this.mounts.push(mount);
  }

  private initPerson() {
    const person = new GameObject("person", {
      size: {
        width: Person_Width,
        height: Person_Height,
      },
      position: {
        x: (Full_Width - Person_Width) / 2,
        y: Full_Height - Person_Height - Mount_Height,
      },
    });
    person.addComponent(
      new Img({
        resource: "person",
      })
    );
    this.addChild(person);
    this.person = person;
  }

  private initTapEvent() {
    const event = this.gameObject.addComponent(new Event());
    event.on("tap", () => {
      if (this.isJump) {
        return;
      }

      this.isJump = true;
      const originY = this.person.transform.position.y;
      const animation = this.person.addComponent(new Transition());
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
                value: originY - Person_Jump_Height,
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
      animation.on("finish", () => {
        this.person.removeComponent(animation);
        this.isJump = false;
      });
    });
  }

  private addChild(gameObject: GameObject) {
    this.gameObject.addChild(gameObject);
  }

  update() {
    if (!this.activeMount) {
      const mount = new GameObject("mount", {
        size: {
          width: Mount_Width,
          height: Mount_Height,
        },
        position: {
          x: -Mount_Width - 10,
          y:
            // 舞台高度
            Full_Height -
            // 不移动的⛰的高度
            Mount_Height * this.mounts.length -
            // 不移动的⛰的间距
            Mount_Gap * this.mounts.length -
            // 当前活动的⛰的高度
            Mount_Height,
        },
      });
      mount.addComponent(
        new Img({
          resource: Math.random() > 0.5 ? "mount1" : "mount2",
        })
      );
      const animation = mount.addComponent(new Transition());
      animation.group = {
        move: [
          {
            name: "position.x",
            component: mount.transform,
            values: [
              {
                time: 0,
                value: mount.transform.position.x,
                tween: "linear",
              },
              {
                time: 3000,
                value: Full_Width + 10,
                tween: "linear",
              },
            ],
          },
        ],
      };
      animation.play("move", 1);
      animation.on("finish", () => {
        mount.removeComponent(animation);
        console.log("move out");
      });

      this.addChild(mount);
      this.activeMount = mount;
      this.mounts.push(mount);

      console.log(this);
    }
  }
}
