const PricingBody = () => {
  return (
    <div className="grid items-center mx-3 grid-cols-1 md:grid-cols-2 gap-5 ">
      <div className="flex justify-center h-3/5 items-center rounded-md bg-blue-100 p-8 shadow-lg hover:scale-110 hover:bg-blue-300 transition-transform duration-300 ease-in-out">
        <h1 className="text-8xl mx-auto  text-center font-bold">3%</h1>
      </div>
      <div className="flex flex-col justify-center items-center p-6 text-center">
        <p className="text-2xl">Everything you need to manage payments.</p>
        <p className="text-2xl">No need to worry about finance anymore.</p>
        <p className="text-2xl">No setup fees, monthly fees, or hidden fees.</p>
        <p className="text-2xl">Deducted per Transaction.</p>
        <p className="text-2xl">Secure and reliable payment gateway.</p>
        <p className="text-2xl">Fast and seamless checkout experience.</p>
      </div>
    </div>
  );
};

export default PricingBody;
