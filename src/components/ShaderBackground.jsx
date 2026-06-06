import React, { useRef, useEffect } from 'react';

const vertexShaderSource = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;
  uniform vec2 u_resolution;
  uniform float u_time;

  // Hash function for noise
  float hash(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
  }

  // Film grain
  float grain(vec2 uv, float t) {
    vec2 p = uv * u_resolution;
    return hash(p + fract(t * 1.7391));
  }

  // Smooth noise
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0,0)), hash(i + vec2(1,0)), f.x),
      mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x),
      f.y
    );
  }

  // Diagonal stripe pattern — dark ridges like the reference
  float stripes(vec2 uv) {
    // Rotate 45 degrees
    vec2 rotated = vec2(uv.x + uv.y, uv.y - uv.x);
    float stripe = sin(rotated.x * 18.0) * 0.5 + 0.5;
    // Make them narrow dark ridges
    stripe = pow(stripe, 6.0);
    return stripe * 0.12;
  }

  // Soft light blob / lens flare bloom
  float lightBlob(vec2 uv, vec2 center, float radius, float softness) {
    float d = length(uv - center);
    return 1.0 - smoothstep(0.0, radius, d * softness);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    // Fix aspect ratio
    vec2 st = uv;
    st.x *= u_resolution.x / u_resolution.y;
    float aspect = u_resolution.x / u_resolution.y;

    float t = u_time * 0.18;

    // --- Base background: very dark warm tone ---
    vec3 color = vec3(0.03, 0.015, 0.01);

    // --- Diagonal stripe overlay ---
    float s = stripes(st);
    // Stripes give a subtle texture
    vec3 stripeColor = vec3(0.12, 0.06, 0.02) * s * 1.5;
    color += stripeColor;

    // Subtle stripe shadow (dark grooves between lit ridges)
    float darkStripe = sin((st.x + st.y) * 18.0) * 0.5 + 0.5;
    darkStripe = 1.0 - pow(darkStripe, 0.3) * 0.18;
    color *= darkStripe;

    // --- Vignette ---
    vec2 vigUv = uv * (1.0 - uv);
    float vignette = vigUv.x * vigUv.y * 18.0;
    vignette = pow(vignette, 0.55);
    color *= vignette;

    // --- Film grain ---
    float g = grain(uv, u_time);
    color += (g - 0.5) * 0.055;

    // Clamp
    color = clamp(color, 0.0, 1.0);

    gl_FragColor = vec4(color, 1.0);
  }
`;

const ShaderBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    const compileShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Full-screen quad
    const vertices = new Float32Array([
      -1, -1, 1, -1, -1, 1,
      -1, 1, 1, -1, 1, 1,
    ]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const resLoc = gl.getUniformLocation(program, 'u_resolution');
    const timeLoc = gl.getUniformLocation(program, 'u_time');

    let rafId;
    const startTime = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const render = () => {
      resize();
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, (performance.now() - startTime) / 1000.0);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', resize);
    render();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: '-1%',
        left: '-1%',
        width: '102vw',
        height: '102vh',
        zIndex: -2,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
};

export default ShaderBackground;
