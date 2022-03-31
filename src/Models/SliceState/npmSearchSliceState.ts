import SearchPayload from "../ReturnObjects/SearchPayload";
import Suggestion from "../ReturnObjects/Sugesstion";

export default interface NpmSearchSliceState {
  isSuggestionsLoading: boolean;
  isSearchLoading: boolean;
  suggestions: Suggestion[];
  searchResults: SearchPayload;
  sortBy: string;
}
