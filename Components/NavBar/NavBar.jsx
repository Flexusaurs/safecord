import React, {useEffect, useState, useContext}from 'react';
import Style from './NavBar.module.css'; 
import Image from 'next/image';
import Link from 'next/link';
import images from '../../assets/index';
import {ChatAppContext} from '../../Context/ChatAppContext';
import {Model, Error} from '../index';

const NavBar = () => {

  const menuItems = [
    {
      menu: "All Users",
      link: "alluser",
    },
    {
      menu: "Chat",
      link: "/",
    },
    {
      menu: "Settings",
      link: "/",
    },
    {
      menu: "FAQ",
      link: "/",
    },
    {
      menu: "Terms Of Use",
      link: "/",
    },
  ]

  //useState

  const [active, setActive] = useState(2);
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  const {account, userName, connectWallet, createAccount, error} = useContext(ChatAppContext);


  return  (
    <div className={Style.NavBar}>
      <div className={Style.NavBar_box}>
          <div className={Style.NavBar_box_left}>
          <Image src = {images.logo} alt="a logo" width={50} height={50} />
          </div>
          <div className={Style.NavBar_box_right}>
           {/*  DESKTOP VER */}
            <div className={Style.NavBar_box_right_menu}>
              {menuItems.map((el,i) => (
                <div
                onClick={() => setActive(i+1)}
                key={i+1}
                className={`${Style.NavBar_box_right_menu_items} ${
                  active == i+1 ? Style.active_btn : ""
                }`}
                >
                  <Link className={Style.NavBar_box_right_menu_items_link} href={el.link}>{el.menu}</Link>
                </div>
              ))}
              
            </div>
            {/* //MOBILE VER */}
            {open && (
              <div className={Style.mobile_menu}>
              {menuItems.map((el,i) => (
                <div
                onClick={() => setActive(i+1)}
                key={1+1}
                className={`${Style.mobile_menu_items} ${
                  active == i+1 ? Style.active_btn : ""
                }}`}
                >
                  <Link className={Style.mobile_menu_items_link} href={el.link}>{el.menu}</Link>
                </div>
              ))}
              <p className={Style.mobile_menu_btn}>
                <Image src={images.close} alt="close" width={50} height={50} onClick={() => setOpen(false)}/>
              </p>
            </div>
            )}

            {/* //connect wallet  */}
            <div className={Style.NavBar_box_right_connect}>
                {account == "" ? (
                  <button onClick={()=> connectWallet()}>
                    {""}
                    <span>Connect Wallet</span>
                  </button>
                ) : (
                  <button onClick={()=> setOpenModel(true)}>
                    {""}
                    <Image src={userName? images.accountName : images.create2}
                    alt="Account Image"
                    width={20}
                    height={20}
                    
                    />
                  {''}         
                  <small>{userName || "Create Account"}</small>       
                  </button>
                )}
            </div>

            <div className={Style.NavBar_box_right_open}
            onClick={()=> setOpen(true)}>
            <Image src={images.open} alt="open" width={30} height={30} />  
            </div>
          </div>
      </div>

      {/* MODEL COMPONENT */}
      {openModel && (
        <div className={Style.modelBox}>
          <Model openModel={setOpenModel}
          title="Welcome to"
          head="Safecord"
          info ="Lorem ipsum dolor sit amet,
           consectetur adipiscing elit. Donec non tellus maximus, scelerisque nisl ac, rutrum nunc. Donec faucibus accumsan mi non dignissim. 
           Curabitur vehicula est leo, sagittis tincidunt est fringilla vel. Nam in risus ac mi tristique posuere. 
           Praesent placerat pharetra gravida. Vestibulum sagittis accumsan erat tristique vulputate. Pellentesque a odio sit amet velit aliquam molestie.
            Interdum et malesuada fames ac ante ipsum primis in faucibus. In vel magna orci. Proin a facilisis dolor. Ut tincidunt sapien eu tellus volutpat viverra." 
            smallInfo="Please, select your name"
            images={images.hero}
            functionName={createAccount}
          />
        </div>
      )}
      {error == "" ? "" : <Error error={error}/>}
    </div>
  );
};
 
export default NavBar