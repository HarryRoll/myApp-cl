import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import userAPI from '../../../API/userAPI'
import { toast } from 'react-toastify'
import authAPI from '../../../API/authAPI'


export default function SignUpModal(state) {

  const cancelButtonRef = useRef(null)
  const username = useRef(null)
  const password = useRef(null)
  const cpassword = useRef(null)
  const [alert, setAlert] = useState()
  
  
  const HandleSignUp = () => {

      authAPI.reqCSRF()

      const data = {
        username : username.current.value,
        roles : "user",
        password : password.current.value
      }

      if(
        !username.current.value ||
        !password.current.value ||
        !cpassword.current.value
      ){
        setAlert("please fill in the blank column")
      }else{

          setAlert()

          if(password.current.value !== cpassword.current.value){
            setAlert('Password and confirm password not match')
          }else{
            userAPI.createUser(data).then(() => {
                toast.success('Registration Success')
            })
            setAlert()
            state.setOpenSignUp(false)
          }
        }
    }
  return (
    <Transition.Root show={state.openSignUp} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={state.setOpenSignUp}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div onClick={()=>setAlert()} className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div onClick={()=>setAlert()} className="fixed top-28 left-0 right-0 z-10">
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
                    <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-xl mg-4 font-medium leading-6 text-gray-900 mb-8 text-center">
                        Register
                      </Dialog.Title>
                      <div className='flex justify-center max-w-full m-auto text-center'>
                          <p className='text-red-600 w-2/3'>{alert && alert}</p>
                      </div>
                      <div className="mt-2 w-full">
                        <div className="col-span-2 sm:col-span-4 my-2">
                            <label htmlFor="last-name" className="block text-md font-medium text-gray-700">
                                Username
                            </label>
                            <input
                                ref = {username}
                                type="text"
                                name="last-name"
                                id="last-name"
                                autoComplete="family-name"
                                className="mt-1 block w-full h-10 border-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-4 my-2">
                            <label htmlFor="email-address" className="block text-md font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                ref = {password}
                                type="password"
                                name="email-address"
                                id="email-address"
                                autoComplete="email"
                                className="mt-1 block w-full h-10 border-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-4 my-2">
                            <label htmlFor="email-address" className="block text-md font-medium text-gray-700">
                              Confirm Password
                            </label>
                            <input
                                ref={cpassword}
                                type="password"
                                name="email-address"
                                id="email-address"
                                autoComplete="email"
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
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => HandleSignUp()}
                  >
                    Register
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                        state.setOpenSignUp(false)
                        setAlert()
                      }}
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
