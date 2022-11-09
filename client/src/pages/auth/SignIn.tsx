export function SignIn() {
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="w-4/12">
        <div className="bg-gray-800 rounded-md p-2">
          <label
            htmlFor="email"
            className="block text-xs bg-inherit text-gray-400 w-full"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-800 border-none focus:ring-0 focus:outline-none w-full text-xl"
          />
        </div>
        <div className="bg-gray-800 rounded-md p-2 mt-2">
          <label
            htmlFor="password"
            className="block text-xs bg-inherit text-gray-400 w-full"
          >
            Passsword
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-800 border-none focus:ring-0 focus:outline-none w-full text-xl"
          />
        </div>
      </form>
    </div>
  );
}
