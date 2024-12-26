import React, { ReactNode } from "react";

interface TableProps {
  headings: string[];
  children: ReactNode;
}

const Table: React.FC<TableProps> = ({ headings, children }) => {
  return (
    <table className="table-auto w-full h-auto">
      <thead>
        <tr className="text-lg font-Poppins text-gray-700 font-thin">
          {headings?.map((heading, index) => (
            <th
              key={index}
              className="px-4 py-2 text-left border-b">
              {heading}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </table>
  );
};

export default Table;
