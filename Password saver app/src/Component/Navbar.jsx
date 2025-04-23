
const Navbar = () => {
    return (
            <nav className="bg-black  ">
                <div className="myconataineritems-center justify-between flex px-5 py-4 h-15">
                <div className="logo font-bold ">
                <span className="text-green-800">&lt;</span>
                   <span className="text-white">Pass</span>
                    <span className="text-green-800 ">OP/ &gt;</span>
                    
                    </div>
                <ul>
                    <li className='flex gap-6 text-amber-50'>
                        <a className='hover:font-bold' href="#">Home</a>
                        <a  className='hover:font-bold' href="#">About</a>
                        <a  className='hover:font-bold' href="#">Contact</a>
                        <a  className='hover:font-bold' href="#">Know more</a>
                    </li>
                </ul>
                <button className="text-white bg-green-600 my-5 rounded-full flex justify-between items-center">
                    <img className="invert w-10 p-1" src="/icons/github.svg" alt="githublogo" />
                    <span className="font-bold px-2" >GitHub</span>
                </button>
                </div>
            </nav>
    )
}

export default Navbar
