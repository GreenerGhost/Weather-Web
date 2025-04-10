"use client";

import React from 'react';

export default function Footer() {
  return (
    <footer className='py-4 flex justify-center pb-10'>
      <p className='footer-text text-sm flex items-center gap-1'>
        Hecho por 
        <a 
          href="https://github.com/GreenerGhost"
          target='_blank'
          className='text-green-400 font-bold'
        >Edgar Cruz</a>
      </p>
    </footer>
  )
}
