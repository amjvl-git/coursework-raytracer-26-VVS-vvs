class Vector3 {
    constructor(x=0, y=0, z=0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(v) {
        return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
    }

    sub(v) {
        return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
    }

    mult(s) {
        return new Vector3(this.x * s, this.y * s, this.z * s);
    }
    
    div(s) {
        return new Vector3(this.x / s, this.y / s, this.z / s);
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    normalize() {
        return this.div(this.magnitude());
    }

    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }
}