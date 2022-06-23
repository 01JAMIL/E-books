import React from 'react'

export const Footer = () => {
    return (
        <div className="footer h-24 w-auto bg-yellow-400">
            <div className="h-12 flex justify-center items-center">
                <div className="p-2 rounded transition duration-150 hover:bg-slate-100/50">
                    <a href="https://twitter.com/BenbrahimJamil" target="_blank">
                        <i className="fa-brands fa-twitter fa-beat fa-xl"></i>
                    </a>
                </div>

                <div className="p-2 rounded transition duration-150 hover:bg-slate-100/50">
                    <a href="https://github.com/01JAMIL" target="_blank">
                        <i className="fa-brands fa-github fa-beat fa-xl"></i>
                    </a>
                </div>

                <div className="p-2 rounded transition duration-150 hover:bg-slate-100/50">
                    <a href="https://www.linkedin.com/in/benbrahim-jamil" target="_blank">
                        <i className="fa-brands fa-linkedin fa-beat fa-xl"></i>
                    </a>
                </div>
            </div>

            <div className="flex justify-center items-center">

                <div className="text-center mt-2">
                    <div className="text-xs">Developed by jamil ben brahim</div>
                    <div className="text-xs">
                        Copyright © {new Date().getFullYear()}
                    </div>
                </div>
            </div>
        </div>
    )
}
