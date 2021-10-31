import P5 from "p5";
import { Environment } from "./environment";

export interface IEntity{
  alive: boolean;
  age: number;
  lifetime: number;
  pos: P5.Vector;
  vel: P5.Vector;
  acc: P5.Vector;
  r: number;
  environment: Environment;
  gravity: boolean;
  physics: boolean;

  update(): void;
  show(): void;
}
  
export class Entity implements IEntity {
  _p5: P5;
  alive: boolean;
  age: number;
  lifetime: number;
  pos: P5.Vector;
  vel: P5.Vector;
  acc: P5.Vector;
  r: number;
  environment: Environment;
  gravity: boolean;
  physics: boolean;

  constructor(P5: P5, x: number, y: number, radius: number, env: Environment) {
      this._p5 = P5;
      this.alive = true;
      this.age = 0;
      this.lifetime = Infinity;
      this.pos = P5.createVector(x, y);
      this.vel = P5.createVector(); //p5.Vector.random2D();
      this.acc = P5.createVector();
  
      this.r = radius < 1 ? 1 : radius;
  
      if (env) {
        this.environment = env;
      } else {
        this.environment = new Environment();
      }
  
      this.gravity = true;
      this.physics = true;
  }
  
    update(): void {
      if (!this.alive || !this.physics) {
        return;
      }
  
      this.acc.limit(this.environment.maxForce);
  
      if (this.gravity) {
        this.applyForce(this._p5.createVector(0, this.environment.gravity));
      }
  
      this.vel.add(this.acc);
      this.vel.limit(this.environment.maxSpeed);
      this.pos.add(this.vel);
      this.acc.mult(0);
  
      if (++this.age >= this.lifetime) {
        this.alive = false;
      }
    }
    
    seek(location: P5.Vector, mult: number): void{
      var loc = this._p5.createVector(location.x, location.y);
      let heading = loc.sub(this.pos);
      this.steer(heading, mult);
    }
  
    steer(vector: P5.Vector, mult: number): void {
      vector.setMag(this.environment.maxSpeed);
  
      let steering = vector.sub(this.vel);
      steering.limit(this.environment.maxForce);
      if (mult) {
        steering.mult(mult);
      }
  
      this.applyForce(steering);
    }
  
    applyForce(force: P5.Vector): void {
      this.acc.add(force);
    }
  
    boundary(): void {
      if (this.pos.y < this.r) {
        this.acc.y = 0;
        this.vel.y = 0;
        this.pos.y = this.r;
      } else if (this.pos.y > this._p5.height - this.r) {
        this.acc.y = 0;
        this.vel.y = 0;
        this.pos.y = this._p5.height - this.r;
      }
      if (this.pos.x < this.r) {
        this.acc.x = 0;
        this.vel.x = 0;
        this.pos.x = this.r
      } else if (this.pos.x > this._p5.width - this.r) {
        this.acc.x = 0;
        this.vel.x = 0;
        this.pos.x = this._p5.width - this.r;
      }
    }
  
    wrapEdges(): void {
      if (this.pos.y < -this.r) {
        this.pos.y = this._p5.height - this.r;
      } else if (this.pos.y - this.r > this._p5.height) {
        this.pos.y = -this.r;
      }
      if (this.pos.x < -this.r) {
        this.pos.x = this._p5.width - this.r;
      } else if (this.pos.x - this.r > this._p5.width) {
        this.pos.x = -this.r;
      }
    }
  
    bounceEdges(): void {
      if (this.pos.y < this.r) {
        this.vel.y *= -1;
        this.acc.y *= -1;
      } else if (this.pos.y + this.r > this._p5.height) {
        this.vel.y *= -1;
        this.acc.y *= -1;
      }
      if (this.pos.x < this.r) {
        this.vel.x *= -1;
        this.acc.x *= -1;
      } else if (this.pos.x + this.r > this._p5.width) {
        this.vel.x *= -1;
        this.acc.x *= -1;
      }
    }
  
    show(): void {
      const p5 = this._p5;
      if (!this.alive) {
        return;
      }
      p5.push();
      p5.translate(this.pos.x, this.pos.y);
      p5.rotate(this.vel.heading());
      p5.stroke(255);
      p5.fill(100);
      //p5.rectMode(P5.RECT_MODE.CENTER);
      p5.ellipse(0, 0, this.r * 2, this.r * 2);
      p5.stroke(255);
      p5.line(0, 0, this.r, 0);
  
      p5.pop();
    }
  }
}