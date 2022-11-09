export function Register() {
  return (
    <div className="h-screen flex justify-center items-center">
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
        <div className="flex justify-between gap-2 mt-2">
          <div className="bg-gray-800 rounded-md p-2 w-full">
            <label
              htmlFor="password"
              className="block text-xs bg-inherit text-gray-400 w-full"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-800 border-none focus:ring-0 focus:outline-none w-full text-xl"
            />
          </div>
          <div className="bg-gray-800 rounded-md p-2 w-full">
            <label
              htmlFor="confirmPassword"
              className="block text-xs bg-inherit text-gray-400 w-full"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="bg-gray-800 border-none focus:ring-0 focus:outline-none w-full text-xl "
            />
          </div>
        </div>
      </form>
    </div>
  );
}
