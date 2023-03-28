import SideUserNav from "../user/SideUserNav";

const UserLayout = () => {
  return (
    <header>
      <div>
      {/* Sidebar */}
      <div className="border-r border-1 border-neutral-400 w-1/6 h-screen">
        <SideUserNav/>
      </div>
      {/* Main */}
      <div></div>
      {/* Missions */}
      <div></div>

      </div>
    </header>
  );
};

export default UserLayout;
