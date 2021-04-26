import resources from "./resources";

import { Game, resource } from "@eva/eva.js";
import { RendererSystem } from "@eva/plugin-renderer";
import { ImgSystem } from "@eva/plugin-renderer-img";
import { EventSystem } from "@eva/plugin-renderer-event";
import { SpriteAnimationSystem } from "@eva/plugin-renderer-sprite-animation";
import { RenderSystem } from "@eva/plugin-renderer-render";
import { TransitionSystem } from "@eva/plugin-transition";
import { GraphicsSystem } from "@eva/plugin-renderer-graphics";
import { TextSystem } from "@eva/plugin-renderer-text";
import { GameController } from "./Game/Game";

resource.addResource(resources);

const game = new Game({
  systems: [
    new RendererSystem({
      canvas: document.querySelector("#canvas"),
      width: 750,
      height: 1484,
      antialias: true,
    }),
    new ImgSystem(),
    new TransitionSystem(),
    new SpriteAnimationSystem(),
    new RenderSystem(),
    new EventSystem(),
    new GraphicsSystem(),
    new TextSystem(),
  ],
});

game.scene.transform.size.width = 750;
game.scene.transform.size.height = 1484;

new GameController(game.scene).init();

window.game = game;
