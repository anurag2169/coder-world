import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";

const Navbar = ({
  logout,
  user,
  cart,
  addToCart,
  removeFromCart,
  subTotal,
  clearCart,
}) => {
  const [dropdown, setDropdown] = useState(false);
  const [sideBar, setsideBar] = useState(false);
  const router = useRouter();
  useEffect(() => {
    Object.keys(cart).length !== 0 && setsideBar(true);
    let exempted = [
      "/checkout",
      "/order",
      "/orders",
      "/myaccount",
      "/forgot",
      "/login",
      "/signup",
      "/admin",
      "/admin/add",
      "/admin/allorders",
      "/admin/imageuploader",
      "/admin/viewproducts",
    ];
    if (exempted.includes(router.pathname)) {
      setsideBar(false);
    }
  }, []);

  const toggleCart = () => {
    setsideBar(!sideBar);
  };
  const ref = useRef();

  return (
    <>
      {!sideBar && (
        <span
          onMouseOver={() => {
            setDropdown(true);
          }}
          onMouseLeave={() => {
            setDropdown(false);
          }}
          className=" fixed right-12 top-4 z-30"
        >
          {dropdown && (
            <div className="cursor-pointer absolute right-7 bg-white border shadow-lg top-5 rounded-md px-5 py-4 w-36 z-40">
              <ul>
                <Link href={"/myaccount"}>
                  <li className="py-1 text-sm hover:text-pink-500 font-semibold">
                    My Account{" "}
                  </li>
                </Link>
                <Link href={"/orders"}>
                  <li className="py-1 text-sm hover:text-pink-500  font-semibold">
                    My Order{" "}
                  </li>
                </Link>
                <li
                  onClick={logout}
                  className="py-1 text-sm hover:text-pink-500 font-semibold"
                >
                  Logout{" "}
                </li>
              </ul>
            </div>
          )}

          {user.value && (
            <MdAccountCircle className=" text-xl md:text-2xl text-pink-400 hover:text-pink-600 mx-3" />
          )}
        </span>
      )}
      <div
        className={`flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-xl sticky top-0 bg-white z-10 ${
          !sideBar && "overflow-hidden"
        }`}
      >
        <div className="logo mx-5">
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={200} height={40} />
          </Link>
        </div>
        <div className="nav">
          <ul className="flex items-center space-x-6 font-bold md:text-md">
            <Link href="/tshirts" legacyBehavior>
              <a>
                <li>Tshirts</li>
              </a>
            </Link>
            <Link href="/hoodies" legacyBehavior>
              <a>
                <li>Hoodies</li>
              </a>
            </Link>
            <Link href="/stickers" legacyBehavior>
              <a>
                <li>Stickers</li>
              </a>
            </Link>
            <Link href="/mugs" legacyBehavior>
              <a>
                <li> Mugs</li>
              </a>
            </Link>
          </ul>
        </div>
        <div className="cursor-pointer items-centerm-center cart absolute right-0 top-4 mx-5 flex">
          {!user.value && (
            <Link href={"/login"} legacyBehavior>
              <a>
                <button className="bg-pink-400 mx-3 rounded-md py-1 px-7 text-white font-semibold text-sm">
                  Login
                </button>
              </a>
            </Link>
          )}

          <AiOutlineShoppingCart
            onClick={toggleCart}
            className=" text-xl md:text-2xl text-pink-400 hover:text-pink-600"
          />
        </div>
        {/* side bar */}
        <div
          ref={ref}
          className={`w-72 h-[100vh] sidecart overflow-y-scroll absolute top-0 bg-pink-100 px-8 py-10  transition-all ${
            sideBar ? "right-0" : "-right-96"
          }`}
        >
          <h2 className="font-bold text-xl text-center"> Shopping Cart</h2>
          <span
            onClick={toggleCart}
            className="absolute top-5 right-4 text-xl text-pink-500 hover:text-pink-600 cursor-pointer"
          >
            <AiFillCloseCircle />
          </span>
          <ol className="list-decimal font-semibold">
            {Object.keys(cart).length === 0 && (
              <div className="my-4 font-semibold">Your cart is empty!</div>
            )}
            {Object.keys(cart).map((k) => {
              return (
                <li key={k}>
                  <div className="item flex my-5">
                    <div className="w-2/3 font-semibold">
                      {cart[k].name} ({cart[k].size}/{cart[k].variant})
                    </div>
                    <div className="flex items-center justify-center font-semibold w-1/3 text-lg">
                      <AiFillMinusCircle
                        onClick={() => {
                          removeFromCart(
                            k,
                            1,
                            cart[k].price,
                            cart[k].name,
                            cart[k].size,
                            cart[k].variant
                          );
                        }}
                        className="cursor-pointer text-pink-500"
                      />
                      <span className="mx-2 text-sm">{cart[k].qty}</span>
                      <AiFillPlusCircle
                        onClick={() => {
                          addToCart(
                            k,
                            1,
                            cart[k].price,
                            cart[k].name,
                            cart[k].size,
                            cart[k].variant
                          );
                        }}
                        className="cursor-pointer text-pink-500"
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <div className="font-bold my-2">Subtotal: ₹{subTotal}</div>

          <div className="flex">
            <Link href="/checkout">
              <button
                disabled={Object.keys(cart).length === 0}
                className=" disabled:bg-pink-300 flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"
              >
                <BsFillBagCheckFill className="m-1" /> Checkout
              </button>{" "}
            </Link>
            <button
              disabled={Object.keys(cart).length === 0}
              onClick={clearCart}
              className=" disabled:bg-pink-300 flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"
            >
              {" "}
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
