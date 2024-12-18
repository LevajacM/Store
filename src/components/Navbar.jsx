import { PiShoppingCartBold } from 'react-icons/pi';
import { BsFillSunFill, BsFillMoonStarsFill } from 'react-icons/bs';
import { HiMiniBars3BottomLeft } from 'react-icons/hi2';
import { NavLink } from 'react-router-dom';
import NavLinks from './NavLinks';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../features/user/userSlice';

const Navbar = () => {
  const { cartItemsNum } = useSelector((state) => state.cartState);
  const { theme } = useSelector((state) => state.userState);
  const dispatch = useDispatch();
  const emerald = theme === 'emerald';
  const handleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <nav className='bg-base-200'>
      <div className='navbar align-element'>
        <div className='navbar-start'>
          {/* TITLE */}
          <NavLink
            to='/'
            className='hidden lg:flex btn btn-primary text-3xl  items-center'
          >
            C
          </NavLink>
          {/* DROPDOWN */}
          <div className='dropdown lg:hidden'>
            <label tabIndex={0} className='btn btn-ghost lg:hidden'>
              <HiMiniBars3BottomLeft className='h-6 w-6' />
            </label>
            <ul className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52'>
              <NavLinks />
            </ul>
          </div>
        </div>
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal gap-x-6'>
            <NavLinks />
          </ul>
        </div>
        <div className='navbar-end'>
          {/* THEME SETUP */}

          <label className='swap swap-rotate'>
            {/* this hidden checkbox controls the state */}
            <input type='checkbox' checked={!emerald} onChange={handleTheme} />

            <BsFillSunFill className='swap-on h-5 w-5 ' />

            <BsFillMoonStarsFill className='swap-off h-5 w-5' />
          </label>

          {/* CART LINK */}
          <NavLink to='/cart' className='btn btn-ghost btn-circle btn-md ml-4 '>
            <div className='indicator'>
              <PiShoppingCartBold className='h-6 w-6' />
              <span className='badge badge-sm badge-primary indicator-item'>
                {cartItemsNum}
              </span>
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
