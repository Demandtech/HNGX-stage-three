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

export default function Header({ onOpen }) {
  const [query, setQuery] = useState('')
  const { isAuthenticated } = useSelector((store) => store.features)

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
                  name='Jason Hughes'
                  size='sm'
                  src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
                />
              </DropdownTrigger>
              <DropdownMenu aria-label='Profile Actions' variant='flat'>
                <DropdownItem key='profile' className='h-14 gap-2'>
                  <p className='font-semibold'>Signed in as</p>
                  <p className='font-semibold'>zoey</p>
                </DropdownItem>

                <DropdownItem key='logout' color='danger'>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button onClick={() => onOpen()}>Login</Button>
            </>
          )}
        </Dropdown>
      </NavbarContent>
    </Navbar>
  )
}
