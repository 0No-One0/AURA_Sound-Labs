/* ==========================================================================
   AURA Sound Labs — Canvas DSP Equalizer Visualizer
   ========================================================================== */

   document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('equalizer-canvas');
    if (!canvas) return;
  
    const ctx = canvas.getContext('2d');
    let preset = 'balanced';
    let time = 0;
  
    function resize() {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * (window.devicePixelRatio || 1);
      canvas.height = 200 * (window.devicePixelRatio || 1);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    }
    resize();
    window.addEventListener('resize', resize);
  
    document.querySelectorAll('.eq-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.eq-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        preset = btn.getAttribute('data-preset');
      });
    });
  
    function getBarHeight(i, numBars) {
      const t = time;
      switch (preset) {
        case 'bass':
          // Bias toward low frequencies (left side)
          return (Math.sin(t * 1.5 + i * 0.3) * 0.4 + 0.55) * (1 - i / numBars * 0.5);
        case 'spatial':
          // Full spectrum with dual harmonics
          return (
            Math.abs(Math.sin(t * 2 + i * 0.2)) * 0.5 +
            Math.abs(Math.cos(t * 1.3 + i * 0.15)) * 0.4 + 0.1
          );
        default: // balanced
          return Math.abs(Math.sin(t * 1.8 + i * 0.25)) * 0.6 + 0.15;
      }
    }
  
    function draw() {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = 200;
      const cx = w / 2;
  
      ctx.clearRect(0, 0, w, h);
  
      // Background grid
      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += 40) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }
  
      const numBars = 48;
      const gap = 3;
      const barW = (w - gap * (numBars - 1)) / numBars;
  
      for (let i = 0; i < numBars; i++) {
        const bh = getBarHeight(i, numBars) * (h * 0.75);
        const x = i * (barW + gap);
        const y = h / 2 - bh / 2;
  
        const grad = ctx.createLinearGradient(0, y, 0, y + bh);
        if (preset === 'spatial') {
          grad.addColorStop(0, '#06b6d4');
          grad.addColorStop(0.5, '#8b5cf6');
          grad.addColorStop(1, '#d946ef');
        } else if (preset === 'bass') {
          grad.addColorStop(0, '#f59e0b');
          grad.addColorStop(1, '#ef4444');
        } else {
          grad.addColorStop(0, '#38bdf8');
          grad.addColorStop(1, '#0284c7');
        }
  
        ctx.fillStyle = grad;
        ctx.beginPath();
        const r = Math.min(barW / 2, 2);
        ctx.roundRect(x, y, barW, bh, r);
        ctx.fill();
      }
  
      time += 0.03;
      requestAnimationFrame(draw);
    }
  
    // Fallback for older browsers
    if (!CanvasRenderingContext2D.prototype.roundRect) {
      CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
        if (w < 2 * r) r = w / 2;
        if (h < 2 * r) r = h / 2;
        this.beginPath();
        this.moveTo(x + r, y);
        this.arcTo(x + w, y, x + w, y + h, r);
        this.arcTo(x + w, y + h, x, y + h, r);
        this.arcTo(x, y + h, x, y, r);
        this.arcTo(x, y, x + w, y, r);
        this.closePath();
        return this;
      };
    }
  
    draw();
  });