import { useRevealLine } from "./useLineReveal";
import { useRevealStaggered } from "./useRevealStaggered";

export function useReconGsap() {
  useRevealStaggered();
  useRevealLine();
}
