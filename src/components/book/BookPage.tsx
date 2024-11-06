import BookTable from "./BookTable";

const BookPage = () => {
  return (
    <div className="flex mt-16 mb-16 w-11/12 m-auto">
      <div className="w-[60%] flex justify-center items-center">
        <h1 className="text-4xl bg-[#ffbf69] p-12 rounded-2xl text-white font-semibold w-8/12 text-center">
          Check out our rich list of <span>amazing</span> books right here.
        </h1>
      </div>
      <div className="w-[40%] justify-self-end">
        <BookTable />
      </div>
    </div>
  );
};

export default BookPage;
