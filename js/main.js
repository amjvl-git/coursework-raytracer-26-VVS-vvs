const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
const slider = document.getElementById("lightSlider");
let lightPosX = parseFloat(slider.value);

const scene = [
    new Sphere(new Vector3(0, 0, -5), 1, new Vector3(255, 0, 0)),
    new Sphere(new Vector3(2, 0, -6.5), 1, new Vector3(255, 255, 0)),
    new Sphere(new Vector3(-2, 0, -6.5), 1, new Vector3(0, 255, 255)),
    new Sphere(new Vector3(0, -101, -5), 100, new Vector3(200, 200, 200))
];

function setPixel(imageData, x, y, color) {
    const index = (y * width + x) * 4;
    imageData.data[index] = color.x;
    imageData.data[index + 1] = color.y;
    imageData.data[index + 2] = color.z;
    imageData.data[index + 3] = 255;
}

function getBackgroundGradient(v) {
    const t = 0.5 * (v + 1.0); 
    return new Vector3(135, 206, 235).mult(1 - t).add(new Vector3(255, 255, 255).mult(t));
}

function rayColor(ray, scene, depth, lightDir) {
    if (depth <= 0) return new Vector3(0, 0, 0);

    let closestT = Infinity;
    let hitData = null;
    let hitSphere = null;

    for (const sphere of scene) {
        const hit = sphere.hit(ray);
        if (hit && hit.t < closestT) {
            closestT = hit.t;
            hitData = hit;
            hitSphere = sphere;
        }
    }

    if (hitData) {
        const hitPoint = ray.at(closestT);
        
        const shadowOrigin = hitPoint.add(hitData.normal.mult(0.001));
        const shadowRay = new Ray(shadowOrigin, lightDir);
        let inShadow = false;
        for (const s of scene) { if (s.hit(shadowRay)) { inShadow = true; break; } }

        let intensity = inShadow ? 0.1 : Math.max(0.1, hitData.normal.dot(lightDir));
        let baseColor = hitSphere.color.mult(intensity);

        if (hitSphere.color.x === 255 && hitSphere.color.y === 0) {
            const reflectDir = ray.direction.sub(hitData.normal.mult(2 * ray.direction.dot(hitData.normal)));
            const reflectRay = new Ray(shadowOrigin, reflectDir);
            
            const reflectedColor = rayColor(reflectRay, scene, depth - 1, lightDir);
            return baseColor.mult(0.5).add(reflectedColor.mult(0.5));
        }

        return baseColor;
    }

    const t = 0.5 * (ray.direction.y + 1.0);
    return new Vector3(135, 206, 235).mult(1 - t).add(new Vector3(255, 255, 255).mult(t));
}

const SAMPLES_PER_PIXEL = 4; 

let renderTimeout;

function render(isDraft = false) {
    const imageData = ctx.createImageData(width, height);
    const lightDir = new Vector3(lightPosX, 1, 1).normalize();
    
    const step = isDraft ? 4 : 1;
    const samples = isDraft ? 1 : 4; 

    for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
            let totalColor = new Vector3(0, 0, 0);

            for (let s = 0; s < samples; s++) {
                const offsetX = isDraft ? 0 : Math.random();
                const offsetY = isDraft ? 0 : Math.random();

                const u = (x + offsetX - width / 2) / height;
                const v = (y + offsetY - height / 2) / height;

                const ray = new Ray(new Vector3(0, 0, 0), new Vector3(u, -v, -1));
                totalColor = totalColor.add(rayColor(ray, scene, 2, lightDir));
            }

            const finalColor = totalColor.div(samples);
            
            if (isDraft) {
                for (let i = 0; i < step; i++) {
                    for (let j = 0; j < step; j++) {
                        if (x + i < width && y + j < height) {
                            setPixel(imageData, x + i, y + j, finalColor);
                        }
                    }
                }
            } else {
                setPixel(imageData, x, y, finalColor);
            }
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

const statusEl = document.getElementById("status");

slider.addEventListener("input", (e) => {
    lightPosX = parseFloat(e.target.value);
    clearTimeout(renderTimeout);
    
    statusEl.textContent = "Rendering...";
    statusEl.style.color = "#ffcc00";

    render(true); 
    
    renderTimeout = setTimeout(() => {
        statusEl.textContent = "Rendering High Quality...";
        statusEl.style.color = "#16c6a3";

        requestAnimationFrame(() => {
            render(false);
            statusEl.textContent = "Done";
            statusEl.style.color = "#59fd01";
        });
    }, 250);
});

render(false);
