import { Fragment, useContext, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-toastify';
import authAPI from '../../../API/authAPI'
import Cookies from 'universal-cookie'
import { UserContext } from '../../../App'

export default function LoginModal(state) {

  const usernameRef = useRef(null)
  const passwordRef = useRef(null)  
  const cancelButtonRef = useRef(null)
  const {auth, setAuth} = useContext(UserContext)
  const cookie = new Cookies()
  
  const handlelogin = async() => {
    const data = {
        username : usernameRef.current.value, 
        password : passwordRef.current.value
  }

    await authAPI.reqCSRF()

    authAPI.login(data).then(async response => {
        let token = response.token
        cookie.set('Auth',token)
        authAPI.getUser(token).then((response) => {
            toast(`Wellcome ${response.user.username}`)
            setAuth(response.user)
            state.setOpenLogin(false)
        })
    })
}


  return (
    <Transition.Root show={state.openLogin} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={state.setOpenLogin}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed top-44 left-0 right-0 z-10 ">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center w-full sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-xl m-4 font-medium leading-6 text-gray-900 text-center">
                        Log in
                      </Dialog.Title>
                      <div className="mt-2 w-full">
                        <div className="col-span-2 sm:col-span-4">
                        <label htmlFor="username" className="block text-md font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            ref={usernameRef}
                            autoComplete="family-name"
                            className="mt-1 block w-full h-10 border-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        </div>

                        <div className="col-span-6 sm:col-span-4">
                        <label htmlFor="password" className="block text-md font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            ref={passwordRef}
                            autoComplete="password"
                            className="mt-1 block w-full h-10 border-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => handlelogin()}
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-100 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => state.setOpenLogin(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
