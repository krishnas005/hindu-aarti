import React from 'react'
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-orange-500 text-white p-4 text-center">
            <p className="text-sm">Made with ❤️ by <Link className='text-bold' href={'https://krishnas05.vercel.app'}>Krishna</Link></p>
        </footer>
    )
}

export default Footer
