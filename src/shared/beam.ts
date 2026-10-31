export interface BeamLoadInput {
  spanM: number;
  loadKN: number;
  distanceM: number;
}
export interface BeamReactionResult {
  leftReactionKN: number;
  rightReactionKN: number;
  maxMomentKNm: number;
}
/** Educational simply supported beam with one vertical point load. */
export function calculatePointLoadReactions(input: BeamLoadInput): BeamReactionResult {
  const { spanM, loadKN, distanceM } = input;
  if (![spanM, loadKN, distanceM].every(Number.isFinite)) throw new Error("All inputs must be finite numbers.");
  if (spanM <= 0) throw new Error("Span must be greater than zero.");
  if (loadKN < 0) throw new Error("Load must be zero or greater.");
  if (distanceM < 0 || distanceM > spanM) throw new Error("Load position must be between the supports.");
  const rightReactionKN = loadKN * distanceM / spanM;
  const leftReactionKN = loadKN - rightReactionKN;
  return { leftReactionKN: round(leftReactionKN), rightReactionKN: round(rightReactionKN), maxMomentKNm: round(leftReactionKN * distanceM) };
}
function round(value: number): number { return Math.round((value + Number.EPSILON) * 1e6) / 1e6; }
