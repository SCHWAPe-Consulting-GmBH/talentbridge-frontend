'use client'

import Image from "next/image"
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import lightTheme from '@/assets/icons/light_theme.svg';
import darkTheme from '@/assets/icons/darkTheme.svg';

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return (
    <div className="rounded-full w-[38px] h-[38px] flex justify-center items-center bg-dark mr-4"/>
  )

  if (resolvedTheme === 'dark') {
    return (
      (
        <button
          onClick={() => setTheme('light')}
          className='rounded-full w-[38px] h-[38px] flex justify-center items-center bg-dark mr-4 dashboard_menu_header'
        >
          <Image
            src={lightTheme}
            alt=''
            width={20}
          />
        </button>
    )
  )
  }

  if (resolvedTheme === 'light') {
    return (
      <button
        onClick={() => setTheme('dark')}
        className='rounded-full w-[38px] h-[38px] flex justify-center items-center bg-dark mr-4 dashboard_menu_header'
      >
        <Image
          src={darkTheme}
          alt=''
          width={20}
        />
      </button>
  )
  }

}