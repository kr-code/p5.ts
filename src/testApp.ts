import P5 from "p5";
import "p5/lib/addons/p5.dom";
// import "p5/lib/addons/p5.sound";	// Include if needed
import "./styles.scss";
import { Engine } from "./phys/engine";
import { Entity } from "./phys/entity";

const sketch = (p5: P5) => {
  var eng: Engine;

  p5.setup = () => {
    eng = new Engine(p5, "app");
    eng.setup(400, 400);
    for (var i = 1; i <= 10; i++) {
      var entity = new Entity(p5, 10 * i, i * 5, i, eng.environment);
      var initVel = new P5.Vector();
      initVel.x = i * 0.5;
      entity.vel = initVel;
      eng.push(entity);
    }
  };
  p5.draw = () => {
    eng.tick();
  };
};

new P5(sketch);
