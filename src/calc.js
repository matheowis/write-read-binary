export const lerp = (a, b, alpha) => a + (b - a) * alpha
export const clamp = (val, min, max) => val > max ? max : val < min ? min : val