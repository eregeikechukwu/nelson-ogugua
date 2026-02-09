import { useRevealLine } from "./useLineReveal";
import { useLineSlideIn } from "./useLineSlideIn";
import { useRevealStaggered } from "./useRevealStaggered";
import { useSkewIn } from "./useSkewIn";

export function useReconGsap() {
  useRevealStaggered();
  useRevealLine();
  useLineSlideIn();
  useSkewIn();
}
