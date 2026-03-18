# 🌌 JS-Ray-Tracer
## P2896241 | Vadym Serzheniuk

My implementation of a recursive ray tracing engine built from scratch  using Vanilla JavaScript. This project demonstrates understanding of the core principles of the ray tracing pipeline, such ray generation, ray to sphere intersection, phong lightning model with basic specular shading and shadows as states on assesment specs. 

-----

## 🌟 Key Features

  * **Recursive Ray Tracing**: Implements a recursive `rayColor` function for multi-bounce reflections (chrome/mirror effect).
  * **Lambertian Shading**: Accurate 3D volume modeling using surface normals and dot-product light intensity.
  * **Dynamic Progressive Rendering**:
      * **Draft Mode**: Instant 60fps feedback using 1/4 resolution scaling to maintain optimal performance.
      * **Final Mode**: High-definition output with $4\times$ Super-Sample Anti-Aliasing (SSAA).
  * **Hard Shadows**: Secondary ray casting for object-to-object occlusion.
  * **Interactive UI**: Real-time directional light manipulation via a debounced slider interface.

-----

## 🚀 Quick Start

### 1\. Prerequisites

No external libraries or dependencies (Three.js, glMatrix, etc.) are required. A modern web browser (Testet with Firefox) is all you need. Also recommended to have LiveServer extetion if you using VS Code.


### 2\. Installation

```bash
git clone https://github.com/VVS-vvs/js-ray-tracer.git
cd js-ray-tracer
```

### 3\. Running the Project

Simply open `index.html` in your browser.

  * **Recommended**: Use [VS Code Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for the best experience.

-----

## 📐 The Math Behind the Engine

### Intersection Logic

The engine calculates intersections by solving the quadratic equation for a ray $\mathbf{P}(t) = \mathbf{A} + t\mathbf{B}$ and a sphere:
$$t^2 \mathbf{B} \cdot \mathbf{B} + 2t \mathbf{B} \cdot (\mathbf{A} - \mathbf{C}) + (\mathbf{A} - \mathbf{C}) \cdot (\mathbf{A} - \mathbf{C}) - r^2 = 0$$

### Reflection Physics

Reflections are calculated using the standard reflection vector formula:
$$\mathbf{R} = \mathbf{V} - 2(\mathbf{V} \cdot \mathbf{N})\mathbf{N}$$
Where $\mathbf{V}$ is the incoming ray and $\mathbf{N}$ is the surface normal.

-----

### 📂 Project Structure

| Path | Description |
| :--- | :--- |
| `index.html` | UI layout and Canvas element |
| `style.css` | Styling for centering and UI aesthetics |
| `preview.png` | PNG with project preview |
| `README.md` | Documentation and technical overview |
| **`js/`** | **Logic and Engine components** |
| `js/Vector3.js` | Math functions and classes |
| `js/Ray.js` | Ray primitives and point-at-parameter logic |
| `js/Sphere.js` | Sphere geometry and intersection algorithms |
| `js/main.js` | Scene graph, recursive loop, and UI handling |

-----

## ✉️ Original repo link

Project Link: [https://github.com/VVS-vvs/js-ray-tracer](https://www.google.com/search?q=https://github.com/VVS-vvs/js-ray-tracer)