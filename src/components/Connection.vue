<template>
  <div>
    <canvas id="canvas" ref="canvas"></canvas>
  </div>
</template>
<!--
  ALGORITHM:
  structure:
  - gen( x,y,z ):
    - create node at x,y,z // blue
    - append some children to list:
      - within a certain distance to parent
      - outside a certain distance from any node
      - within a global distance
    - if no children
      - don't append any
      - set as end node // green-ish

  - gen( 0,0,0 ) // red
  - while list has items
    - gen( position of first item )
    - remove first item


  impulse behaviour:
  - pick( node ):
    - if node is end node
      - pick( original node )
    - else
      - pick( random node from node children )

  - pick( original node)
  -->
<script>
  var canvas,
    width = window.innerWidth,
    height = window.innerHeight,
    ctx,
    options = {
      range: 180,
      baseConnections: 3,
      addedConnections: 5,
      baseSize: 5,
      minSize: 1,
      dataToConnectionSize: .4,
      sizeMultiplier: .7,
      allowedDist: 40,
      baseDist: 40,
      addedDist: 30,
      connectionAttempts: 100,

      dataToConnections: 1,
      baseSpeed: .04,
      addedSpeed: .05,
      baseGlowSpeed: .4,
      addedGlowSpeed: .4,

      rotVelX: .003,
      rotVelY: .002,

      repaintColor: '#111',
      connectionColor: 'hsla(200,60%,light%,alp)',
      rootColor: 'hsla(0,60%,light%,alp)',
      endColor: 'hsla(160,20%,light%,alp)',
      dataColor: 'hsla(40,80%,light%,alp)',

      wireframeWidth: .1,
      wireframeColor: '#88f',

      depth: 250,
      focalLength: 250,
      vanishPoint: {
        x: width / 2,
        y: height / 2,
      },
    },
    squareRange = options.range * options.range,
    squareAllowed = options.allowedDist * options.allowedDist,
    mostDistant = options.depth + options.range,
    sinX = 0,
    sinY = 0,
    cosX = 0,
    cosY = 0,

    connections = [],
    toDevelop = [],
    data = [],
    all = [],
    tick = 0,

    animating = false,

    Tau = Math.PI * 2;

  function squareDist(a, b) {
    const x = b.x - a.x,
      y = b.y - a.y,
      z = b.z - a.z;

    return x * x + y * y + z * z;
  }

  class Connection {
    constructor(x, y, z, size) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.size = size;

      this.screen = {};

      this.links = [];
      this.probabilities = [];
      this.isEnd = false;

      this.glowSpeed = options.baseGlowSpeed + options.addedGlowSpeed * Math.random();
      this.rootStep = () => {
        this.setScreen();
        this.screen.color = options.rootColor.replace('light', 30 + ((tick * this.glowSpeed) % 30)).replace('alp', (1 - this.screen.z / mostDistant) * .8);

        for (let i = 0; i < this.links.length; ++i) {
          ctx.moveTo(this.screen.x, this.screen.y);
          ctx.lineTo(this.links[i].screen.x, this.links[i].screen.y);
        }
      };
    }
    link() {
      if (this.size < options.minSize) {
        this.isEnd = true;
        return true;
      }

      const links = [],
        pos = {},
        connectionsNum = options.baseConnections + Math.random() * options.addedConnections | 0;

      let alpha,
        beta,
        len,
        cosA,
        sinA,
        cosB,
        sinB,
        passedExisting,
        passedBuffered,
        attempt = options.connectionAttempts;

      while (links.length < connectionsNum && --attempt > 0) {
        alpha = Math.random() * Math.PI;
        beta = Math.random() * Tau;
        len = options.baseDist + options.addedDist * Math.random();

        cosA = Math.cos(alpha);
        sinA = Math.sin(alpha);
        cosB = Math.cos(beta);
        sinB = Math.sin(beta);

        pos.x = this.x + len * cosA * sinB;
        pos.y = this.y + len * sinA * sinB;
        pos.z = this.z + len * cosB;

        if (pos.x * pos.x + pos.y * pos.y + pos.z * pos.z < squareRange) {
          passedExisting = true;
          passedBuffered = true;
          for (let i = 0; i < connections.length; ++i) {
            if (squareDist(pos, connections[i]) < squareAllowed) {
              passedExisting = false;
            }
          }

          if (passedExisting) {
            for (let i = 0; i < links.length; ++i) {
              if (squareDist(pos, links[i]) < squareAllowed) {
                passedBuffered = false;
              }
            }
          }

          if (passedExisting && passedBuffered) {
            links.push({ x: pos.x, y: pos.y, z: pos.z });
          }
        }
      }

      if (links.length === 0) {
        this.isEnd = true;
      } else {
        for (let i = 0; i < links.length; ++i) {
          const pos = links[i],
            connection = new Connection(pos.x, pos.y, pos.z, this.size * options.sizeMultiplier);

          this.links[i] = connection;
          all.push(connection);
          connections.push(connection);
        }
        for (let i = 0; i < this.links.length; ++i) {
          toDevelop.push(this.links[i]);
        }
      }
    }
    step() {
      this.setScreen();
      this.screen.color = (this.isEnd ? options.endColor : options.connectionColor)
        .replace('light', 30 + ((tick * this.glowSpeed) % 30))
        .replace('alp', .2 + (1 - this.screen.z / mostDistant) * .8);

      for (let i = 0; i < this.links.length; ++i) {
        ctx.moveTo(this.screen.x, this.screen.y);
        ctx.lineTo(this.links[i].screen.x, this.links[i].screen.y);
      }
    }
    draw() {
      ctx.fillStyle = this.screen.color;
      ctx.beginPath();
      ctx.arc(this.screen.x, this.screen.y, this.screen.scale * this.size, 0, Tau);
      ctx.fill();
    }
  }

  class Data {
    constructor(connection) {
      this.glowSpeed = options.baseGlowSpeed + options.addedGlowSpeed * Math.random();
      this.speed = options.baseSpeed + options.addedSpeed * Math.random();
      this.screen = {};

      this.setConnection(connection);
    }
    reset() {
      this.setConnection(connections[0]);
      this.ended = 2;
    }
    step() {
      this.proportion += this.speed;

      if (this.proportion < 1) {
        this.x = this.ox + this.dx * this.proportion;
        this.y = this.oy + this.dy * this.proportion;
        this.z = this.oz + this.dz * this.proportion;
        this.size = (this.os + this.ds * this.proportion) * options.dataToConnectionSize;
      } else {
        this.setConnection(this.nextConnection);
      }

      this.screen.lastX = this.screen.x;
      this.screen.lastY = this.screen.y;
      this.setScreen();
      this.screen.color = options.dataColor
        .replace('light', 40 + ((tick * this.glowSpeed) % 50))
        .replace('alp', .2 + (1 - this.screen.z / mostDistant) * .6);
    }
    draw() {
      if (this.ended) {
        return --this.ended; // not sre why the thing lasts 2 frames, but it does
      }

      ctx.beginPath();
      ctx.strokeStyle = this.screen.color;
      ctx.lineWidth = this.size * this.screen.scale;
      ctx.moveTo(this.screen.lastX, this.screen.lastY);
      ctx.lineTo(this.screen.x, this.screen.y);
      ctx.stroke();
    }
    setConnection(connection) {
      if (connection.isEnd) {
        this.reset();
      } else {
        this.connection = connection;
        this.nextConnection = connection.links[connection.links.length * Math.random() | 0];

        this.ox = connection.x; // original coordinates
        this.oy = connection.y;
        this.oz = connection.z;
        this.os = connection.size; // base size

        this.nx = this.nextConnection.x; // new
        this.ny = this.nextConnection.y;
        this.nz = this.nextConnection.z;
        this.ns = this.nextConnection.size;

        this.dx = this.nx - this.ox; // delta
        this.dy = this.ny - this.oy;
        this.dz = this.nz - this.oz;
        this.ds = this.ns - this.os;

        this.proportion = 0;
      }
    }
  }

  Connection.prototype.setScreen = Data.prototype.setScreen = function () {
    let x = this.x,
      y = this.y,
      z = this.z;

    // apply rotation on X axis
    const Y = y;
    y = y * cosX - z * sinX;
    z = z * cosX + Y * sinX;

    // rot on Y
    const Z = z;
    z = z * cosY - x * sinY;
    x = x * cosY + Z * sinY;

    this.screen.z = z;

    // translate on Z
    z += options.depth;

    this.screen.scale = options.focalLength / z;
    this.screen.x = options.vanishPoint.x + x * this.screen.scale;
    this.screen.y = options.vanishPoint.y + y * this.screen.scale;
  };

  function animate() {
    window.requestAnimationFrame(animate);

    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = options.repaintColor;
    ctx.fillRect(0, 0, width, height);

    ++tick;

    const rotX = tick * options.rotVelX,
      rotY = tick * options.rotVelY;

    cosX = Math.cos(rotX);
    sinX = Math.sin(rotX);
    cosY = Math.cos(rotY);
    sinY = Math.sin(rotY);

    if (data.length < connections.length * options.dataToConnections) {
      const datum = new Data(connections[0]);
      data.push(datum);
      all.push(datum);
    }

    ctx.globalCompositeOperation = 'lighter';
    ctx.beginPath();
    ctx.lineWidth = options.wireframeWidth;
    ctx.strokeStyle = options.wireframeColor;
    all.map(item => {
      item.step();
    });
    ctx.stroke();
    ctx.globalCompositeOperation = 'source-over';
    all.sort((a, b) => b.screen.z - a.screen.z);
    all.map(item => {
      item.draw();
    });

    // ctx.beginPath();
    // ctx.strokeStyle = 'red';
    // ctx.arc(
    //   options.vanishPoint.x,
    //   options.vanishPoint.y,
    //   options.range * options.focalLength / options.depth,
    //   0,
    //   Tau
    // );
    // ctx.stroke();
  }

  function init(canvas) {
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext('2d');

    ctx.fillStyle = '#222';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#ccc';
    ctx.font = '50px Verdana';
    ctx.fillText('Calculating Nodes', width / 2 - ctx.measureText('Calculating Nodes').width / 2, height / 2 - 15);

    connections.length = 0;
    data.length = 0;
    all.length = 0;
    toDevelop.length = 0;

    const connection = new Connection(0, 0, 0, options.baseSize);
    connection.step = connection.rootStep;
    connections.push(connection);
    all.push(connection);
    connection.link();

    while (toDevelop.length > 0) {
      toDevelop[0].link();
      toDevelop.shift();
    }

    if (!animating) {
      animating = true;
      animate();
    }
  }

  export default {
    mounted() {
      init(this.$refs.canvas);

      window.addEventListener('resize', () => {
        options.vanishPoint.x = (width = canvas.width = window.innerWidth) / 2;
        options.vanishPoint.y = (height = canvas.height = window.innerHeight) / 2;
        ctx.fillRect(0, 0, width, height);
      });

      window.addEventListener('click', init);
    },
  };
</script>
<style scoped>
  canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
