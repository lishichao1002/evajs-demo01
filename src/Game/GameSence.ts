import { GameObject, Scene } from "@eva/eva.js";
import { Img } from "@eva/plugin-renderer-img";
import { Full_Height, Full_Width } from "./const";
import { GameComponent } from "./GameComponent";

export function initScene(scene: Scene) {
  const bg = new GameObject("image", {
    size: {
      width: Full_Width,
      height: Full_Height,
    },
    origin: { x: 0, y: 0 },
  });
  bg.addComponent(
    new Img({
      resource: "bg1",
    })
  );
  bg.addComponent(new GameComponent());

  scene.addChild(bg);
}
