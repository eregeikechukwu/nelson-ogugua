import { useRevealLine } from "./useLineReveal";
import { useLineSlideIn } from "./useLineSlideIn";
import {
  useFastRevealStaggered,
  useRevealStaggered,
} from "./useRevealStaggered";
import { useSkewIn } from "./useSkewIn";

export function useReconGsap() {
  useRevealStaggered();
  useRevealLine();
  useLineSlideIn();
  useSkewIn();
  useFastRevealStaggered();
}
