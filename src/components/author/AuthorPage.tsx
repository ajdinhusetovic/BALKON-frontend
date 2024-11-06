import AuthorTable from "./AuthorTable";

const AuthorPage = () => {
  return (
    <div className="flex w-11/12 m-auto mt-28 mb-16 pb-16">
      <div className="w-[40%] justify-self-end">
        <AuthorTable />
      </div>
      <div className="w-[60%] flex justify-center items-center"></div>
    </div>
  );
};

export default AuthorPage;
