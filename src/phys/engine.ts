import P5 from "p5";
import { Environment } from "./environment";
import { Entity } from "./entity";

export class Engine {
  _p5: P5;
  name: string;
  pause: boolean;
  x: number;
  y: number;
  entities: Entity[];
  environment: Environment;
  //player: Player;

  constructor(p5: P5, name: string) {
    this._p5 = p5;
    this.name = name;
    this.pause = false;
    this.x = 0;
    this.y = 0;

    this.entities = [];
    this.environment = new Environment();
    //this.player = new Player();
  }

  setup(x: number, y: number) {
    this.x = x;
    this.y = y;
    const canvas = this._p5.createCanvas(this.x, this.y);
    canvas.parent(this.name);
    this.reset(new Environment());
  }

  reset(env: Environment) {
    if (this.entities.length > 0) this.entities.slice(0, this.entities.length);
    if (env) this.environment = env;
    else this.environment = new Environment();
  }

  tick() {
    if (!this.pause) {
      this._p5.background(0);
      for (let i = this.entities.length - 1; i >= 0; i--) {
        let entity = this.entities[i];
        entity.bounceEdges();
        entity.update();
        entity.show();
        if (!entity.alive) {
          this.entities.splice(i, 1);
        }
      }
    } else {
      this._p5.background(100, 100);
      for (let i in this.entities) {
        let entity = this.entities[i];
        entity.show();
      }
      return false;
    }
    return true;
  }

  stop() {
    this.pause = true;
  }

  run() {
    this.pause = false;
  }

  getEntities() {
    return this.entities;
  }

  push(entity) {
    this.entities.push(entity);
  }
}
