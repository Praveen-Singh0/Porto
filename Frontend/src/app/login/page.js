import React from 'react';
import Image from 'next/image';

const LoginPage = () => {
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: 'url(/assets/img/backLogin.avif)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="w-full max-w-[950px] bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="hidden md:block w-full md:w-[1000px]">
            <Image 
              src="/assets/img/loginIllustration.jpg" 
              alt="Login illustration" 
              className="w-full h-full object-cover"
              width={200}
              height={200}
            />
          </div>
          
          <div className="w-full p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              </div>
              <span className="text-xl font-semibold">Flowbite</span>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input type="email" placeholder="name@company.com"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input type="password"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input type="checkbox" id="remember"
                    className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500" />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-600">Remember me</label>
                </div>
                <a href="#" className="text-sm text-blue-500 hover:underline">Forgot password?</a>
              </div>

              <button type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                Sign in to your account
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

              <div className='flex'>
                <button className="w-1/2 mr-2 border rounded-lg py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                  <img src="/assets/img/googleIcon.png" alt="Google logo" className="w-5 h-5" />
                  Google
                </button>
                <button className="w-1/2 border rounded-lg py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                  <img src="/assets/img/appleIcon.png" alt="Apple logo" className="w-5 h-5" />
                  Apple
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;