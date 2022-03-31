import Package from "./Package";
import Score from "./Score";

export default interface Suggestion {
  package: Package;
  score: Score;
  searchScore: number;
  highlight: string;
}
