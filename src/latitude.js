import * as rcurve from './rcurve.js'
import { asinh,
         atan,
         atanh,
         cos,
         degrees,
         exp,
         radians,
         sign,
         sin,
         sqrt,
         tan } from './math.js'

import { getEllipsoid } from './ellipsoid.js'

/**
  * @typedef {import("./types.d.ts").Ellipsoid} Ellipsoid
  */

const ELL = getEllipsoid('wgs84')
const COS_EPS = 1e-9

/**
  * convert geocentric latitude to geodetic latitude, consider mean sea level altitude 
  * like Matlab geoc2geod()
  *
  * References:
  * Long, S.A.T. "General-Altitude Transformation between Geocentric
  * and Geodetic Coordinates. Celestial Mechanics (12), 2, p. 225-230 (1975)
  * doi: 10.1007/BF01230214"
  *
  * @param {number} geocentric_lat
  * @param {number} geocentric_distance
  * @param {Ellipsoid} [ell=ELL]
  * @param {boolean} [deg=true]
  * @returns {number}
  */
export function geoc2geod (geocentric_lat, geocentric_distance, ell = ELL, deg = true) {
  if (deg) {
    geocentric_lat = radians(geocentric_lat)
  }
 const r = geocentric_distance / ell.semimajor_axis

 const geodetic_lat = (
        geocentric_lat
        + (sin(2 * geocentric_lat) / r) * ell.flattening
        + ((1 / r^2 + 1 / (4 * r)) * sin(4 * geocentric_lat)) * ell.flattening^2
    )

  return deg ? degrees(geodetic_lat) : geodetic_lat
}

/**
  * convert geodetic latitude to geocentric latitude on spheroid surface
  * like Matlab geocentricLatitude() with alt_m = 0
  * like Matlab geod2geoc()
  *
  * References:
  * Equations from J. P. Snyder, "Map Projections - A Working Manual",
  * US Geological Survey Professional Paper 1395, US Government Printing
  * Office, Washington, DC, 1987, pp. 13-18.
  *
  * @param {number} geodetic_lat
  * @param {Ellipsoid} [ell=ELL]
  * @param {boolean} [deg=true]
  * @returns {number}
  */
export function geodetic2geocentric (geodetic_lat, alt_m, ell = ELL, deg = true) {
  if (deg) {
    geodetic_lat = radians(geodetic_lat)
  }
  const r = rcurve.transverse(geodetic_lat, ell, deg=false)
  const geocentric_lat = atan((1 - ell.eccentricity^2 * (r / (r + alt_m))) * tan(geodetic_lat))
  return deg ? degrees(geocentric_lat) : geocentric_lat
}

/**
  * convert geodetic latitude to geocentric latitude on spheroid surface
  * like Matlab geocentricLatitude() with alt_m = 0
  * like Matlab geod2geoc()
  *
  * References:
  * Equations from J. P. Snyder, "Map Projections - A Working Manual",
  * US Geological Survey Professional Paper 1395, US Government Printing
  * Office, Washington, DC, 1987, pp. 13-18.
  *
  * @param {number} geodetic_lat
  * @param {Ellipsoid} [ell=ELL]
  * @param {boolean} [deg=true]
  * @returns {number}
  */
export const geod2geoc = geodetic2geocentric

/**
  * convert geocentric latitude to geodetic latitude
  *
  * like Matlab geodeticLatitudeFromGeocentric() when alt_m = 0
  * like Matlab geod2geoc() but with sea level altitude rather than planet center distance 
  *
  * References:
  * Equations from J. P. Snyder, "Map Projections - A Working Manual",
  * US Geological Survey Professional Paper 1395, US Government Printing
  * Office, Washington, DC, 1987, pp. 13-18.
  *
  * 
  * @param {number} geocentric_lat
  * @param {number} geocentric_distance
  * @param {Ellipsoid} [ell=ELL]
  * @param {boolean} [deg=true]
  * @returns {number}
  */
export function geocentric2geodetic (geocentric_lat, alt_m, ell = ELL, deg = true) {
  if (deg) {
    geocentric_lat = radians(geocentric_lat)
  }
  const r = rcurve.transverse(geocentric_lat, ell, deg=false)
  const geodetic_lat = atan(tan(geocentric_lat) / (1 - ell.eccentricity^2 * (r / (r + alt_m))))
  return deg ? degrees(geodetic_lat) : geodetic_lat
}


