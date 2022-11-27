"use strict";
(() => {
var exports = {};
exports.id = 405;
exports.ids = [405];
exports.modules = {

/***/ 649:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ pages)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: external "next/head"
const head_namespaceObject = require("next/head");
var head_default = /*#__PURE__*/__webpack_require__.n(head_namespaceObject);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
;// CONCATENATED MODULE: external "@supabase/supabase-js"
const supabase_js_namespaceObject = require("@supabase/supabase-js");
;// CONCATENATED MODULE: ./supabaseClient.js

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = (0,supabase_js_namespaceObject.createClient)(supabaseUrl, supabaseAnonKey);

;// CONCATENATED MODULE: ./pages/index.js




function Home({ color  }) {
    const { 0: data , 1: setData  } = (0,external_react_.useState)(null);
    const { 0: title , 1: setTitle  } = (0,external_react_.useState)("");
    const { 0: image , 1: setImage  } = (0,external_react_.useState)("");
    const { 0: user , 1: setUser  } = (0,external_react_.useState)(null);
    const { 0: loading , 1: setLoading  } = (0,external_react_.useState)(false);
    (0,external_react_.useEffect)(()=>{
        const getData = async ()=>{
            let { data , error  } = await supabase.from("test").select("title, id, Image,author");
            if (error) {
                console.log(error);
            }
            setData(data);
        };
        getData();
    }, []);
    const send = async ()=>{
        if (!title && !image) return;
        else {
            setLoading(true);
            await supabase.from("test").insert({
                title,
                Image: image,
                author: user.user_metadata.full_name
            });
            setTitle("");
            setImage("");
            window.location.reload();
        }
    };
    //   useEffect(() => {
    //     console.log(data);
    //   }, [data]);
    const login = async ()=>{
        const { error  } = await supabase.auth.signInWithOAuth({
            provider: "google"
        });
    };
    (0,external_react_.useEffect)(()=>{
        const getData = async ()=>{
            const { data , error  } = await supabase.auth.getSession();
            if (error) return;
            setUser(data.session.user);
        };
        getData();
    }, []);
    const inputStyle = "animate-pulse focus:animate-none focus:outline-pink-500 shadow xl:w-4/12 p-2 my-1 border focus:border-pink-500 rounded bg-rose-300 placeholder-white text-white md:w-8/12 sm:w-10/12 ";
    const headerTextStyle = "lg:text-5xl md:text-3xl font-semibold text-rose-600/50 text-center flex-1 animate-bounce";
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "w-screen h-auto bg-gradient-to-r from-red-200/50 to-pink-400/80",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)((head_default()), {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("title", {
                        children: "Halloween Website"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("link", {
                        rel: "icon",
                        href: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk8T6tAurGi4bLaUc1RV6b0zRokkmEG4Q-pQ&usqp=CAU"
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "w-full h-auto m-auto flex flex-col items-center justify-center",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "flex items-center justify-between w-screen mb-10 px-5 my-10",
                        children: [
                            !user && /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                        onClick: login,
                                        className: `bg-rose-500 text-white px-4 py-2 outline-none rounded text-lg font-semibold transition-all duration-500 focus:outline-white/50 ${loading && "animate-bounce"}`,
                                        children: "Login"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                                        className: headerTextStyle,
                                        children: "Halloween Speical"
                                    })
                                ]
                            }),
                            user && /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                        onClick: ()=>{
                                            supabase.auth.signOut();
                                            supabase.auth.setSession(null);
                                            window.location.reload();
                                        },
                                        className: `bg-rose-500 text-white px-4 py-2 outline-none rounded text-lg font-semibold transition-all duration-500 focus:outline-white/50 ${loading && "animate-bounce"}`,
                                        children: "Log Out"
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h1", {
                                        className: headerTextStyle,
                                        children: [
                                            "Happy Halloween ",
                                            ` `,
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: "text-rose-500 border-b-2 border-white cursor-pointer",
                                                children: user.user_metadata.full_name
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                        src: user.user_metadata.avatar_url,
                                        className: "rounded-full w-10 h-10 cursor-pointer",
                                        alt: ""
                                    })
                                ]
                            })
                        ]
                    }),
                    user && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "flex flex-col w-screen items-center",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                className: inputStyle,
                                placeholder: "Enter Title...",
                                onChange: (e)=>setTitle(e.target.value),
                                value: title
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                className: inputStyle,
                                placeholder: "Enter Image Url",
                                type: "url",
                                onChange: (e)=>setImage(e.target.value),
                                value: image
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                className: `bg-pink-400 text-white p-2 m-2 rounded outline outline-none hover:bg-pink-500 transition-all duration-500 focus:outline-white/50 ${loading && "animate-bounce"}`,
                                onClick: send,
                                children: "Send"
                            })
                        ]
                    })
                ]
            }),
            data && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "flex justify-center items-center m-auto flex-wrap",
                children: data.map(({ title , Image , id , author  })=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "shadow m-3 rounded-lg group relative",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h1", {
                                className: `text-white bg-pink-500 hidden group-hover:inline w-full h-2xl absolute z-10 top-[40%] py-4 px-2 text-lg text-center group-hover:bg-opacity-50`,
                                children: [
                                    title,
                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        className: "text-green-300 font-bold text-2xl",
                                        children: "By"
                                    }),
                                    " ",
                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        className: "font-bold text-2xl",
                                        children: "@"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        className: "text-yellow-200 font-bold",
                                        children: author
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                src: Image,
                                className: "rounded-lg w-80 h-1/3 object-cover cursor-pointer",
                                alt: title
                            })
                        ]
                    }, id))
            })
        ]
    });
}
/* harmony default export */ const pages = (Home);


/***/ }),

/***/ 689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(649));
module.exports = __webpack_exports__;

})();