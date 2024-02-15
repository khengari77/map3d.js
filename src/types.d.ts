export type Ellipsoid = {
  model: string
  name: string
  semimajor_axis: number
  semiminor_axis: number
  flattening: number
  third_flattening: number
  eccentricity: number
}

export type Model = {
  name: string
  a: number
  b: number
}
