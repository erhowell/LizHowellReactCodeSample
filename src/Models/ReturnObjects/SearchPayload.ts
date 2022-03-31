import Suggestion from "./Sugesstion";

export default interface SearchPayload {
  results: Suggestion[];
  total: number;
}
