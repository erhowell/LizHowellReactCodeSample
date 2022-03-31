import Author from "./Author";
import Links from "./Links";
import User from "./User";

export default interface Package {
  name: string;
  scope: string;
  version: string;
  description: string;
  date: string;
  keywords: string[];
  keywordsTruncaded: boolean;
  links: Links;
  publisher: User;
  author: Author;
  maintainers: User[];
}
