import SearchContainer from "../SearchContainer";
import NavBar from "../NavBar";

const SideBarHeader = () => {
  return (
    <div className="w-full flex flex-col justify-between items-center">
      <NavBar />
      <SearchContainer />
    </div>
  );
};

export default SideBarHeader;
