import BookTable from "./book/BookTable";
import AuthorTable from "./author/AuthorTable";

const MainPage = () => {
  return (
    <div>
      <div className="flex gap-16 mt-32 justify-center h-full">
        <div className="pt-8 w-[40%]">
          <h1 className="p-2 bg-light-brown-color w-fit mb-2 rounded-2xl font-semibold text-white">books.</h1>
          <BookTable />
        </div>
        <div className="pt-8 w-[40%]">
          <h1 className="p-2 bg-light-brown-color w-fit mb-2 rounded-2xl font-semibold text-white">authors.</h1>
          <AuthorTable />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
