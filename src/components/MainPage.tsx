import BookTable from "./book/BookTable";
import AuthorTable from "./author/AuthorTable";

const MainPage = () => {
  return (
    <div>
      <div className="flex flex-col items-center mt-16 mb-16 lg:mb-0 lg:flex-row gap-16 lg:mt-32 justify-center h-full">
        <div className="pt-8 lg:w-[40%] w-10/12">
          <h1 className="p-2 bg-light-brown-color w-fit mb-2 rounded-2xl font-semibold text-white">books</h1>
          <BookTable />
        </div>
        <div className="pt-8 lg:w-[40%] w-10/12">
          <h1 className="p-2 bg-light-brown-color w-fit mb-2 rounded-2xl font-semibold text-white">authors</h1>
          <AuthorTable />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
