export function UploadImage({ editState, fileHandler, file }: any) {
  return (
    <>
      {editState && (
        <div>
          <div className="flex items-center justify-center w-[400px]">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-black hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-[#1c1c1c]"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                {!file?.name ? (
                  <>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF
                    </p>
                  </>
                ) : (
                  <h1>{file?.name}</h1>
                )}
              </div>
              <input
                // disabled={true}
                id="dropzone-file"
                onChange={(e: any) => fileHandler(e.target.files[0])}
                type="file"
                className="hidden"
              />
            </label>
          </div>

          {false && (
            <div className="w-[400px] bg-gray-200 rounded-full h-8 dark:bg-gray-700 mt-2">
              <div
                className="bg-blue-600 grid place-items-center text-xs h-full font-medium text-blue-100 text-center leading-none rounded-full"
                style={{ width: "75%" }}
              >
                {" "}
                75%
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
