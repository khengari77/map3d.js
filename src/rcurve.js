import { cos, sin, sqrt, radians } from './math.js'
import { getEllipsoid } from './ellipsoid.js'

/**
  * @typedef { import("./types.d.ts").Ellipsoid } Ellipsoid
  */

const ELL = getEllipsoid('wgs84')

/**
  * compute geocentric radius at geodetic latitude
  * https://en.wikipedia.org/wiki/Earth_radius#Geocentric_radius
  *
  * @param {number} geodetic_lat
  * @param {Ellipsoid} [ell=ELL]
  * @param {boolean} [deg=true]
  * @returns {number}
  */
export function geocentric_radius (geodetic_lat, ell = ELL, deg = true) {
  if (deg) {
    geodetic_lat = radians(geodetic_lat)
  }
  return sqrt(
    (
      (ell.semimajor_axis ^ 2 * cos(geodetic_lat)) ^ 2 +
      (ell.semiminor_axis ^ 2 * sin(geodetic_lat)) ^ 2
    ) /
    (
      (ell.semimajor_axis * cos(geodetic_lat)) ^ 2 +
      (ell.semiminor_axis * sin(geodetic_lat)) ^ 2
    )
  )
}

/**
  * computes the radius of the curve formed by a plane
  * intersecting the ellipsoid at the latitude which is
  * normal to the surface of the ellipsoid
  * like Matlab rcurve('transverse', ...)
  *
  * @param {number} lat
  * @param {Ellipsoid} [ell=ELL]
  * @param {boolean} [deg=true]
  * @returns {number}
  */
export function transverse (lat, ell = ELL, deg = true) {
  if (deg) {
    lat = radians(lat)
  }
  return ell.semimajor_axis / sqrt(1 - (ell.eccentricity * sin(lat)) ^ 2)
}

/**
  * computes the radius of the small circle encompassing the globe at the specified latitude
  * like Matlab rcurve('parallel', ...)
  *
  * @param {number} lat
  * @param {Ellipsoid} [ell=ELL]
  * @param {boolean} [deg=true]
  * @returns {number}
  */
export function parallel (lat, ell = ELL, deg = true) {
  if (deg) {
    lat = radians(lat)
  }
  return cos(lat) * transverse(lat, ell, false)
}

/**
  * computes the meridional radius of curvature for the ellipsoid
  * like Matlab rcurve('meridian', ...)
  *
  * @param {number} lat
  * @param {Ellipsoid} [ell=ELL]
  * @param {boolean} [deg=true]
  * @returns {number}
  */
export function merdian (lat, ell = ELL, deg = true) {
  if (deg) {
    lat = radians(lat)
  }
  const f1 = ell.semimajor_axis * (1 - ell.eccentricity ^ 2)
  const f2 = 1 - (ell.eccentricity * sin(lat)) ^ 2
  return f1 / sqrt(f2 ** 3)
}
