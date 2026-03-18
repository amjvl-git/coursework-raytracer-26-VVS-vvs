class Sphere {
    constructor(center, radius, color) {
        this.center = center;
        this.radius = radius;
        this.color = color;
    }

    hit(ray) {
        const oc = ray.origin.sub(this.center);
        const a = ray.direction.dot(ray.direction);
        const b = 2.0 * oc.dot(ray.direction);
        const c = oc.dot(oc) - (this.radius * this.radius);
        const discriminant = b * b - 4 * a * c;

        if (discriminant > 0) {
            const t = (-b - Math.sqrt(discriminant)) / (2.0 * a);
            if (t > 0) {
                const hitPoint = ray.at(t);
                const normal = hitPoint.sub(this.center).div(this.radius);


                return {t, normal};
            }
        }
        return null;
    }
}