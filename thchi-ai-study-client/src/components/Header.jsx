import { NavLink } from "react-router";

const Header = () => {
  return (
    <header className="sticky z-50 top-0 flex items-center w-full shadow-[3px_5px_5px_hsla(0,0%,84%,0.58)] bg-white">
      {/* LOGO */}
      <section className="w-1/5">
        <NavLink to="/">
          <img src="/logo.png" alt="logo" className="hover:cursor-pointer" />
        </NavLink>
      </section>
      <section className="w-4/5">
        <nav>
          <ul className="flex items-center justify-evenly">
            <li className="w-[16%] text-center">
              <div className="hover:bg-gray-300 hover:cursor-pointer transition-all">
                <img
                  src="/OnTap.png"
                  alt="Ôn Tập"
                  loading="lazy"
                  className="hover:cursor-pointer w-14 h-14 mx-auto -mb-2 object-cover"
                />
                <span className="font-semibold text-sm">Ôn tập</span>
              </div>
            </li>
            <li className="w-[16%] text-center">
              <div className="hover:bg-gray-300 hover:cursor-pointer transition-all">
                <img
                  src="/HocTuMoi.png"
                  alt="Học Từ Mới"
                  loading="lazy"
                  className="hover:cursor-pointer w-14 h-14 mx-auto -mb-2 object-cover"
                />
                <span className="font-semibold text-sm">Học Từ Mới</span>
              </div>
            </li>
            <li className="w-[16%] text-center">
              <div className="hover:bg-gray-300 hover:cursor-pointer transition-all">
                <img
                  src="/notebook.png"
                  alt="Sổ tay"
                  loading="lazy"
                  className="hover:cursor-pointer w-14 h-14 mx-auto -mb-2 object-cover"
                />
                <span className="font-semibold text-sm">Sổ tay</span>
              </div>
            </li>
            <li className="w-[16%] text-center">
              <div className="hover:bg-gray-300 hover:cursor-pointer transition-all">
                <img
                  src="/thchiHub.png"
                  alt="ThchiHub"
                  loading="lazy"
                  className="hover:cursor-pointer w-14 h-14 mx-auto -mb-2 object-cover"
                />
                <span className="font-semibold text-sm">ThchiHub</span>
              </div>
            </li>
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
