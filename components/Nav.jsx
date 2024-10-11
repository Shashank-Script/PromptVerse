'use client'
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

function Nav() {
    const { data: session } = useSession();

    const [provider, setProvider] = useState(null);
    const [toogleDropdown, setToogleDropdown] = useState(false);
    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();
            setProvider(response);
        }

        setUpProviders();
    },[])

    return (
        <nav className='flex-between w-full mb-16 pt-3'>
            <Link href='/' className='flex gap-2 flex-center'>
                <Image
                    src="/assets/images/logo.svg"
                    alt="promptverse logo"
                    width={30}
                    height={30}
                    className='object-contain'
                />
                <p className='logo_text'>PromptVerse</p>
            </Link>

       {/* desktop Nav */} 
        <div className='sm:flex hidden'>
            {session?.user ? (
                <div className='flex gap-3 md:gap-5'>
                    <Link href='/create-prompt' className='black_btn'>
                        Create Post
                    </Link>
                    <button type='button' className='outline_btn' 
                        onClick={() => signOut()}>
                        Sign Out
                    </button>
                    <Link href='/profile'>
                    <Image src={session?.user.image} 
                    className='rounded-full' 
                    alt="profile" 
                    width={30} 
                    height={30} >
                    </Image>
                    </Link>
                    </div>
            ) : (
                <>
                {provider && Object.values(provider).map((provider) => (
                    <button
                        type='button'
                        key={provider.name}
                        onClick={() => signIn(provider.id)}
                        className='black_btn'
                    >
                        Sign In
                    </button>
                ))}
                </>
            )}
        </div>

        {/* mobile nav */}
        <div className='sm:hidden flex relative'>
            {session?.user ? (
                <div className='flex'>
                    <Image src={session?.user.image}
                    className='rounded-full' 
                    alt="profile" 
                    width={30} 
                    height={30}
                    onClick={() => setToogleDropdown((prev) => !prev)}
                     >
                    </Image>

                    {toogleDropdown && (
                        <div className='dropdown'>
                            <Link href='/profile' 
                            className='dropdown_link' 
                            onClick={() => setToogleDropdown(false)}>
                                My Profile
                            </Link>
                            <Link href='/create-prompt' 
                            className='dropdown_link' 
                            onClick={() => setToogleDropdown(false)}>
                                Create Prompt
                            </Link>
                            <button
                                type='button'
                                onClick={() => {
                                    setToogleDropdown(false);
                                    signOut();
                                }}
                                className='mt-5 w-full black_btn'
                            >
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <>
                {provider && Object.values(provider).map((provider) => (
                    <button
                        type='button'
                        key={provider.name}
                        onClick={() => signIn(provider.id)}
                        className='black_btn'
                    >
                        Sign In
                    </button>
                ))}
                </>
            )}

        </div>

        </nav>
    )
}

export default Nav
