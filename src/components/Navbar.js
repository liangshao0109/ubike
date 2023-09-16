import logo from '../logo.svg';
import './Navbar.css';
import { useState } from 'react';

function Navbar() {
  const [menuClosed, setMenuClosed] = useState(true);
  
  const goToUrl = (url) => {
    window.location.href = '/' + url;
  }

  const handleClickMenu = () => {
    if(menuClosed){
      setMenuClosed(false);
    }else{
      setMenuClosed(true);
    }
  }

  return (
    <>
      <div className="header">
          <img onClick={() => goToUrl('')} src={logo} className="logo" alt="logo"/>
          <a href='/instruction' className='navbar-link'>使用說明</a>
          <a href='/fare' className='navbar-link'>收費方式</a>
          <a href='/station-info' className='navbar-link active'>站點資訊</a>
          <a href='/news' className='navbar-link'>最新消息</a>
          <a href='/activity' className='navbar-link'>活動專區</a>
          <button onClick={() => goToUrl('login')} className='login-btn'>登入</button>
          <div className='mobile menu-icon' onClick={handleClickMenu}>
            {
              !menuClosed ? <i class="fa-solid fa-xmark fa-xl"></i> : <i class="fa-solid fa-bars fa-xl"></i>
            }
          </div>
      </div>
      {
        !menuClosed ?
        <div className='mobile menu'>
          <a href='/instruction' className='menu-link'>使用說明</a>
          <a href='/fare' className='menu-link'>收費方式</a>
          <a href='/station-info' className='menu-link active'>站點資訊</a>
          <a href='/news' className='menu-link'>最新消息</a>
          <a href='/activity' className='menu-link'>活動專區</a>
          <button onClick={() => goToUrl('login')} className='login-mobile-btn'>登入</button>
        </div> :
        <></>
      }
      
    </>
  );
}

export default Navbar;
