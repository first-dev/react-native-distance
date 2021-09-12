const { tan } = Math
export const calculateDistance = (
  altitude: number,
  initialAngle: number,
  finalAngle: number
) => {
  return altitude * (tan(finalAngle) - tan(initialAngle))
}
