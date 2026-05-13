import { NavLink } from "react-router";

const Header = () => {
  return (
    <header className="sticky z-50 top-0 flex items-center w-full shadow-[3px_5px_5px_hsla(0,0%,84%,0.58)] bg-white">
      {/* LOGO */}
      <section className="w-1/5">
        <NavLink to="/review">
          <img src="/logo.png" alt="logo" className="hover:cursor-pointer" />
        </NavLink>
      </section>
      {/* MENU */}
      <section className="w-4/5">
        <nav>
          <ul className="flex items-center justify-center">
            <NavLink
              to="/review"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-300 w-[16%] text-center"
                  : "w-[16%] text-center hover:bg-gray-300 hover:cursor-pointer transition-all"
              }
            >
              <div className="hover:bg-gray-300 hover:cursor-pointer transition-all">
                <img
                  src="/OnTap.png"
                  alt="Ôn Tập"
                  loading="lazy"
                  className="hover:cursor-pointer w-14 h-14 mx-auto -mb-2 object-cover"
                />
                <span className="font-semibold text-sm">Ôn tập</span>
              </div>
            </NavLink>
            <NavLink
              to="/dictionary"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-300 w-[16%] text-center"
                  : "w-[16%] text-center hover:bg-gray-300 hover:cursor-pointer transition-all"
              }
            >
              <div className="hover:bg-gray-300 hover:cursor-pointer transition-all">
                <img
                  src="/TuDien.png"
                  alt="Từ điển"
                  loading="lazy"
                  className="hover:cursor-pointer w-13 h-13 mx-auto -mb-[4px] object-cover"
                />
                <span className="font-semibold text-sm">Từ điển</span>
              </div>
            </NavLink>
            <NavLink
              to={"/learn"}
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-300 w-[16%] text-center"
                  : "w-[16%] text-center hover:bg-gray-300 hover:cursor-pointer transition-all"
              }
            >
              <div className="hover:bg-gray-300 hover:cursor-pointer transition-all">
                <img
                  src="/hat.png"
                  alt="Học Từ Mới"
                  loading="lazy"
                  className="hover:cursor-pointer w-14 h-14 mx-auto -mb-2 object-cover"
                />
                <span className="font-semibold text-sm">Học Từ Mới</span>
              </div>
            </NavLink>
            <NavLink
              to="/notebook"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-300 w-[16%] text-center"
                  : "w-[16%] text-center hover:bg-gray-300 hover:cursor-pointer transition-all"
              }
            >
              <div className="hover:bg-gray-300 hover:cursor-pointer transition-all">
                <img
                  src="/notebook.png"
                  alt="Sổ tay"
                  loading="lazy"
                  className="hover:cursor-pointer w-14 h-14 mx-auto -mb-2 object-cover"
                />
                <span className="font-semibold text-sm">Sổ tay</span>
              </div>
            </NavLink>
            <NavLink
              to="/rank"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-300 w-[16%] text-center"
                  : "w-[16%] text-center hover:bg-gray-300 hover:cursor-pointer transition-all"
              }
            >
              <div className="hover:bg-gray-300 hover:cursor-pointer transition-all">
                <img
                  src="/rank.png"
                  alt="Rank"
                  loading="lazy"
                  className="hover:cursor-pointer w-14 h-14 mx-auto -mb-2 object-cover"
                />
                <span className="font-semibold text-sm">Rank</span>
              </div>
            </NavLink>
            <NavLink
              to="thchi-hub"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-300 w-[16%] text-center"
                  : "w-[16%] text-center hover:bg-gray-300 hover:cursor-pointer transition-all"
              }
            >
              <div className="hover:bg-gray-300 hover:cursor-pointer transition-all">
                <img
                  src="/thchiHub.png"
                  alt="ThchiHub"
                  loading="lazy"
                  className="hover:cursor-pointer w-14 h-14 mx-auto -mb-2 object-cover"
                />
                <span className="font-semibold text-sm">ThchiHub</span>
              </div>
            </NavLink>
          </ul>
        </nav>
      </section>
      {/* ACCOUNT USER */}
      <section className="w-1/5 flex items-center justify-center gap-x-3 hover:opacity-80 hover:cursor-pointer transition-opacity">
        <span className="text-xl text-[#ffcb08] font-semibold">Nhat Thanh</span>
        <div className="w-12 h-12 ">
          <img
            src="/useravatar.png"
            alt="user avatar"
            className="w-full rounded-full"
          />
        </div>
      </section>
    </header>
  );
};

export default Header;
