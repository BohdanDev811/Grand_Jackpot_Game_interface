import React from "react";
import { EE } from "../App";
import "../css/bonusrank.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PAGE_SIZE_DEFAULT } from "../common/Config";

// Particle Effect Code for Fireworks
class Particle {
  constructor(pool, particles, canvas, context) {
    this.context = context;
    this.canvas = canvas;
    this.particles = particles;
    this.pool = pool;

    this.alpha = 1.0; // Start fully visible
    this.brightness = Math.random() * (80 - 70) + 70;
    this.friction = 0.98; // Slows down particles over time
    this.gravity = 0.03; // Slight downward pull
    this.hue = 0;
    this.size = Math.random() * 3 + 1; // Random size for variation
    this.time = 0; // Tracks the lifespan of the particle
    this.vx = Math.random() * 6 - 3; // Velocity in X direction (explosion effect)
    this.vy = Math.random() * 6 - 3; // Velocity in Y direction (explosion effect)
    this.x = 0;
    this.y = 0;
  }

  spawn(x, y, hue) {
    this.x = x;
    this.y = y;
    this.hue = hue;
    this.alpha = 1.0; // Reset alpha for visibility
    this.vx = Math.random() * 6 - 3; // Random velocity in X
    this.vy = Math.random() * 6 - 3; // Random velocity in Y
  }

  update() {
    // Apply friction and gravity
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.vy += this.gravity; // Gravity pulls downward

    // Update position
    this.x += this.vx;
    this.y += this.vy;

    // Gradually fade out
    this.alpha -= 0.02;
    if (this.alpha <= 0) {
      this.alpha = 0;
    }
  }

  draw() {
    this.context.fillStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.context.fill();
  }
}

export class BonusRank extends React.Component {
  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
    this.state = {
      rankList: [
        { id: 1, rank: 1, name: "BigDog23", score: 92, pic: null },
        { id: 2, rank: 2, name: "BlackBear", score: 90, pic: null },
        { id: 3, rank: 3, name: "Tiger", score: 80, pic: null },
        { id: 4, rank: 4, name: "Jeus K", score: 70, pic: null },
        { id: 5, rank: 5, name: "Elsa B", score: 60, pic: null },
        { id: 6, rank: 6, name: "Tiger", score: 54, pic: null },
        { id: 7, rank: 7, name: "Jeus K", score: 52, pic: null },
        { id: 8, rank: 8, name: "Elsa B", score: 50, pic: null },
        { id: 9, rank: 9, name: "Tiger", score: 48, pic: null },
        { id: 10, rank: 10, name: "Jeus K", score: 45, pic: null },
        { id: 11, rank: 11, name: "Elsa B", score: 43, pic: null },
        { id: 12, rank: 12, name: "Tiger", score: 41, pic: null },
        { id: 13, rank: 13, name: "Jeus K", score: 39, pic: null },
        { id: 14, rank: 14, name: "Elsa B", score: 32, pic: null },
        { id: 15, rank: 15, name: "Tiger", score: 30, pic: null },
        { id: 16, rank: 16, name: "Jeus K", score: 29, pic: null },
        { id: 17, rank: 17, name: "Elsa B", score: 28, pic: null },
        { id: 18, rank: 18, name: "Tiger", score: 27, pic: null },
        { id: 19, rank: 19, name: "Jeus K", score: 26, pic: null },
        { id: 20, rank: 20, name: "Elsa B", score: 21, pic: null },
      ],
    };
  }

  componentDidMount() {
    EE.addListener("RESIZE", this.onResize);

    this.initParticles();
    window.addEventListener("resize", this.resizeCanvas);

    const allImages = document.querySelectorAll(".carousel__image img");
    Promise.all([...allImages].map(img => new Promise(resolve => {
      img.onload = resolve;
    }))).then(() => {
      const cont = document.getElementsByClassName("modal-window-bonus-rank")[0];
      if (cont) {
        setTimeout(() => {
          cont.style.transform = `scale(0.8)`;
          EE.emit("FORCE_RESIZE");
        }, 100);
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeCanvas);
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  onResize = (data) => {
    const cont = document.getElementsByClassName("modal-window-bonus-rank")[0];
    const sc = Math.min(
      data.h / PAGE_SIZE_DEFAULT.height,
      data.w / PAGE_SIZE_DEFAULT.width
    );
    if (cont) {
      cont.style.transform = `scale(${sc * 0.8})`;
    }
  };

  resizeCanvas = () => {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  };

  initParticles = () => {
    this.canvas = document.getElementById("particleCanvas");
    this.context = this.canvas.getContext("2d");

    this.particles = [];
    this.pool = [];
    this.spawnWave = 100; // Create more particles per explosion for firework effect
    this.spawnFreq = 0.08; // Frequency of explosions
    this.hue = 0;
    this.lastTime = performance.now();
    this.spawnTimer = 0;

    this.resizeCanvas();
    this.updateParticles();
  };

  updateParticles = () => {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    let currentTime = performance.now();
    let deltaTime = (currentTime - this.lastTime) / 1000;
    this.spawnTimer -= deltaTime;

    // Firework explosion effect
    if (this.spawnTimer <= 0) {
      this.spawnTimer += this.spawnFreq;
      this.hue += 50; // Change hue for colorful explosions
      let x = Math.random() * this.canvas.width;
      let y = Math.random() * this.canvas.height;
      for (let i = 0; i < this.spawnWave; i++) {
        let particle = new Particle(this.pool, this.particles, this.canvas, this.context);
        particle.spawn(x, y, this.hue);
        this.particles.push(particle);
      }
    }

    this.particles.forEach((particle, index) => {
      particle.update(); // Update particle movement and state
      particle.draw(); // Draw the particle on canvas

      // Remove faded particles from the array
      if (particle.alpha <= 0) {
        this.particles.splice(index, 1);
      }
    });

    this.lastTime = currentTime;
    this.animationFrameId = requestAnimationFrame(this.updateParticles);
  };

  onClose() {
    const cont = document.getElementsByClassName("modal-window-bonus-rank")[0];
    if (cont) {
      cont.style.transform = `scale(0)`;
    }
    setTimeout(() => {
      this.props.onClose();
    }, 300);
  }

  render() {
    return (
      <div className="modal-window-bonus">
        <canvas id="particleCanvas" style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}></canvas>
        <div className="modal-window-bonus-rank" style={{ position: 'relative', zIndex: 1 }}>
          <img
            className="modal-window-bonus-rank-close"
            onClick={this.onClose}
            src="images/frenzy/bonus_close_2.png"
            alt="Close"
          />
          <div className="carousel__image">
            <img className="rank-bg" draggable={false} src="images/frenzy/bonus/rank_bg.png" alt="Rank Background" />
            <div className="rank-wrapper">
              {this.state.rankList.map(user => (
                <div className="rank-control" key={user.id}>
                  <img className="rank-bg" src={`images/frenzy/bonus/${user.rank > 3 ? "rank_4_20_bg" : ("rank_" + user.rank + "_bg")}.png`} alt="" />
                  <div className="rank-content">
                    <div className="rank-num">
                      {user.rank > 3
                        ? <><img src="images/frenzy/bonus/rank_frame_4_20.png" alt="" /><span>{user.rank}</span></>
                        : <img src={`images/frenzy/bonus/rank${user.rank}.png`} alt="" />}
                    </div>
                    <div className="user-info">
                      <img src={user.pic ? user.pic : "images/frenzy/bonus/default_avatar.png"} alt="" />
                      <span>{user.name}</span>
                    </div>
                    <div className="cashback-info">
                      <span>{user.score}%</span>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
