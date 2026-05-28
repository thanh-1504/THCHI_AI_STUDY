import { useState } from "react";
import SearchInput from "./components/SearchInput";
import Word from "./components/Word";
const Dictionary = () => {
  const [searchWord, setSearchWord] = useState(false);
  return (
    <div className="pt-6">
      {/* Begin Input Search */}
      <div className="bg-blue-900 rounded-sm">
        <SearchInput></SearchInput>
      </div>
      {/* End Input Search */}
      <Word></Word>
    </div>
  );
};

export default Dictionary;
