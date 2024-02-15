const asin = Math.asin
const asinh = Math.asinh
const atan = Math.atan
const atan2 = Math.atan2
const atanh = Math.atanh
const cbrt = Math.cbrt
const cos = Math.cos
const exp = Math.exp
const hypot = Math.hypot
const log = Math.log
const power = Math.pow
const sign = Math.sign
const sin = Math.sin
const sqrt = Math.sqrt
const tan = Math.tan
const pi = Math.PI

function degrees (radians) {
  return radians * 180 / Math.PI
}

function radians (degrees) {
  return degrees * Math.PI / 180
}

function isclose (x, y, rel_tol = 1e-9, abs_tol = 0) {
  return Math.abs(x - y) <= Math.max(rel_tol * Math.max(Math.abs(x), Math.abs(y)), abs_tol)
}

export {
  asin,
  asinh,
  atan,
  atan2,
  atanh,
  cbrt,
  cos,
  exp,
  hypot,
  log,
  power,
  sign,
  sin,
  sqrt,
  tan,
  pi,
  degrees,
  radians,
  isclose
}
