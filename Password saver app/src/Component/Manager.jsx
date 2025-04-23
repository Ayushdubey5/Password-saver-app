import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { useRef, useState, useEffect } from "react";

const Manager = () => {
    const ref = useRef()
    const passwordref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordarray, setpasswordarray] = useState([])
    //react-toatsify

    const getpasswords = async () => {
        let req = await fetch("http://localhost:3000");
        let passwords = await req.json();
        setpasswordarray(passwords);
        console.log(req);
    };

    useEffect(() => {
        getpasswords();
    }, []);

    const copytext = (Text) => {
        navigator.clipboard.writeText(Text);
        toast(Text + '   Copied to clipboard! ', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    const showpassword = () => {
        passwordref.current.type = "text";
        if (ref.current.src.includes("icons/slash.svg")) {
            ref.current.src = "icons/eye.svg";
            passwordref.current.type = "password";
        } else {
            ref.current.src = "icons/slash.svg";
            passwordref.current.type = "text";
        }
    };

    const savepassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            setpasswordarray([...passwordarray, { ...form, id: uuidv4() }]);
            let req = await fetch("http://localhost:3000", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ ...form, id: uuidv4() })
            });

            toast(form.site + '   Password Saved! ', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };

    const deletepassword = async (id) => {
        let c = confirm("Do you really want to delete this password?");
        if (c) {
            setpasswordarray(passwordarray.filter(item => item.id !== id));
            let req = await fetch(`http://localhost:3000${id}`, {
                method: "DELETE",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ ...form, id })
            });

            toast('Password Deleted! ', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };


    const editpassword = (id) => {
        console.log('edit' + id)
        setform(passwordarray.filter(i => i.id === id)[0])
        setpasswordarray(passwordarray.filter(item => item.id !== id))
    }

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }



    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <div className="absolute inset-0 -z-10 h-full w-full bg-green-800 [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>


            <div className=" px-2 md:p-0 md:myconatiner mx-auto  max-w-5xl items-center justify-center text-center">
                <h1 className="text-3xl font-bold  item-centre"><span className="text-green-800">&lt;</span>
                    <span className="text-black">Pass</span>
                    <span className="text-green-800 ">OP/ &gt;</span></h1>
                <p className="text-green-800 text-2xl text-centre">Your own password Manager</p>

                <div className="text-black  flex flex-col p-4 gap-6">
                    <input value={form.site} onChange={handlechange} placeholder="Enter Website URL" className="rounded-full border border-bg-green-500 w-full p-4  py-1" type="text" name="site" id="" />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8 ">
                        <input value={form.username} onChange={handlechange} placeholder="Enter username or E-mail" className="rounded-full border border-bg-green-500 w-full p-4  py-1" type="text" name="username" id="" />
                        <div className="relative">
                            <input ref={passwordref} value={form.password} onChange={handlechange} placeholder="    Enter Password" className="rounded-full border border-bg-green-500 w-full p-4  py-1" type="password" name="password" id="" />
                            <span className="absolute left-1 bottom-1.5 cursor-pointer justify-center items-center" onClick={showpassword}> <img ref={ref} src="icons/eye.svg" alt="show" />  </span></div>
                    </div>
                    <button onClick={savepassword} className="font-bold text-center items-center bg-green-600 hover:bg-green-800 rounded-full px-2  py-2">
                        <lord-icon className="top-2"
                            src="https://cdn.lordicon.com/tsrgicte.json"
                            trigger="hover"  >
                        </lord-icon >Add Password</button>
                </div>
                <div className="passwords font-bold b">
                    <h2>Your passwords</h2>
                    {passwordarray.length === 0 && <div className="">there are no password saved</div>}
                    {passwordarray.length != 0 &&
                        <table>
                            <thead className="bg-green-800 text-white">
                                <tr>
                                    <th className="py-2 px-4 border border-white text-left">Site</th>
                                    <th className="py-2 px-4 border border-white text-left">Username</th>
                                    <th className="py-2 px-4 border border-white text-left">Password</th>
                                    <th className="py-2 px-4 border border-white text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {passwordarray.map((item, index) => (
                                    <tr key={index}>
                                        <td className="py-2 px-4  border w-60 border-white text-left"><div className="flex"><a href="item.site" target="_blank"></a>{item.site}<div className="copy cursor-pointer justify-center items-center " onClick={() => { copytext(item.site) }}><img className="w-6" src="/icons/copy.svg" alt="" /></div> </div> </td>

                                        <td className="py-2 px-4 border w-60 border-white text-left"><div className="flex"><a href="item.username" target="_blank"></a>{item.username}<div className="copy cursor-pointer justify-center items-center" onClick={() => { copytext(item.username) }}><img className="w-6" src="/public/icons/copy.svg" alt="" /></div></div>
                                        </td>

                                        <td className="py-2 px-4 border w-60 border-white text-left"><div className="flex"><a href="item.password" target="_blank"></a>{item.password}<div className="copy flex cursor-pointer justify-center items-center text-black" onClick={() => { copytext(item.password) }}>
                                            <img className="w-6" src="/icons/copy.svg" alt="" />
                                        </div></div></td>
                                        <td className="py-2 px-4 border w-60 border-white text-left"><div className="flex">
                                            <span className="cursor-pointer mx-2" onClick={() => { deletepassword(item.id) }}>
                                                <img className="w-6" src="/icons/close.svg" alt="" />
                                            </span>
                                            <span className="cursor-pointer mx-2" onClick={() => { editpassword(item.id) }}>
                                                <img className="py-2 px-4 border border-white text-leftr" src="/icons/hamburger.svg" alt="" />
                                            </span>
                                            </div>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    }</div>
            </div>
        </>
    );
};

export default Manager;
