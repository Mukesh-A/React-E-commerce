function Footer() {
  return (
    <>
      <div className=" bg-gray-900">
        <div className="max-w-2xl mx-auto text-white py-5">
          <div className="flex justify-center items-center text-md text-gray-400">
            <p className="order-2 md:order-1 mt-8 md:mt-0">
              {" "}
              © Shop & Save, {new Date().getFullYear()}.{" "}
            </p>
            {/* <div className="order-1 md:order-2">
              <span className="px-2">About us</span>
              <span className="px-2 border-l">Contact us</span>
              <span className="px-2 border-l">Privacy Policy</span>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
