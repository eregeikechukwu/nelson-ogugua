import { useRevealLine } from "./useLineReveal";
import { useLineSlideIn } from "./useLineSlideIn";
import { useRevealStaggered } from "./useRevealStaggered";

export function useReconGsap() {
  useRevealStaggered();
  useRevealLine();
  useLineSlideIn();
}
