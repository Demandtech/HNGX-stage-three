/* eslint-disable react/prop-types */
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from '@nextui-org/react'
import { Button } from '@nextui-org/react'
import { SearchIcon } from '../assets/svgs/SearchIcon'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { logoutUser } from '../redux.jsx/actions'
import { useDispatch } from 'react-redux'
import { supabase } from './Auth'

export default function Header({ onOpen }) {
  const [query, setQuery] = useState('')
  const { isAuthenticated, user } = useSelector((store) => store.features)
  const dispatch = useDispatch()

  const handleLogout = async () => {
    const { error, data } = await supabase.auth.signOut()
    console.log(error, data)
    dispatch(logoutUser())
  }

  console.log(user)

  return (
    <Navbar shouldHideOnScroll>
      <NavbarContent justify='start'>
        <NavbarBrand className='mr-4'>
          {/* <AcmeLogo /> */}
          <p className='hidden sm:block font-bold text-inherit'>IMGS</p>
        </NavbarBrand>
        <NavbarContent className='hidden sm:flex gap-3'>
          <NavbarItem>
            <Link color='foreground' href='#'>
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href='#' color='foreground'>
              Gallery
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color='foreground' href='#portfolio'>
              Portofolio
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as='div' className='items-center' justify='end'>
        <Input
          classNames={{
            base: 'max-w-full sm:max-w-[10rem] h-10',
            mainWrapper: 'h-full',
            input: 'text-small',
            inputWrapper:
              'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
          }}
          placeholder='Type to search...'
          size='sm'
          startContent={<SearchIcon size={18} />}
          type='search'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Dropdown placement='bottom-end'>
          {isAuthenticated ? (
            <>
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as='button'
                  className='transition-transform'
                  color='secondary'
                  name={user.email}
                  size='sm'
                />
              </DropdownTrigger>
            </>
          ) : (
            <>
              <Button onClick={() => onOpen()}>Login</Button>
            </>
          )}
          <DropdownMenu aria-label='Profile Actions' variant='flat'>
            <DropdownItem key='profile' className='h-14 gap-2'>
              <p className='font-semibold'>Signed in as</p>
              <p className='font-semibold'>{user?.email}</p>
            </DropdownItem>

            <DropdownItem key='logout' color='danger' onClick={handleLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  )
}
